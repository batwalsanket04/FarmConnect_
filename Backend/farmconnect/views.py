import json

from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Farmer
from django.contrib.auth.hashers import make_password
from .serializer import FarmerRegistrationSerializer,UserRegistrationSerializer,FarmerProductSerializer,UserOrderSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

def home(request):
    return HttpResponse("Api Working")



@api_view(['POST'])
@csrf_exempt
def Farmer_Register(request):

    data = request.data.copy()

    if Farmer.objects.filter(email=data.get('email')).exists():
        return Response(
            {'error': 'Email already exists'},
            status=400
        )

    if not data.get('password') or len(data.get('password')) < 6:
        return Response(
            {'error': 'Password must be at least 6 characters long'},
            status=400
        )

    data['password'] = make_password(data.get('password'))

    serializer = FarmerRegistrationSerializer(data=data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {"message": "Registration Successfully..."},
            status=201
        )

    return Response(serializer.errors, status=400)



@api_view(['POST'])
@csrf_exempt
def Farmer_Login(request):
    if request.method != 'POST':
        return Response({'error': 'Method not allowed'}, status=405)

    if request.content_type and 'application/json' in request.content_type:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except ValueError:
            return Response({'error': 'Invalid JSON payload'}, status=400)
    else:
        data = request.POST.dict()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=400)

    try:
        farmer = Farmer.objects.get(email=email)
    except Farmer.DoesNotExist:
        return Response({'error': 'Invalid Email'}, status=400)

    if check_password(password, farmer.password):
        refresh = RefreshToken.for_user(farmer)
        refresh['farmer_id'] = farmer.id
        refresh['email'] = farmer.email

        return Response({
            'message': 'Login Successful',
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'role': 'farmer',
            'farmer': {
                'id': farmer.id,
                'farmer_name': farmer.farmer_name,
                'email': farmer.email,
                'location': farmer.location
            }
        }, status=200)

    return Response({'error': 'Invalid Password'}, status=400)
