from itertools import product
import json
import razorpay




from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Farmer, FarmerProduct,User, UserOrder
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


# User Registration

@api_view(['POST'])
@csrf_exempt
def User_Registration(request):
    data=request.data.copy();

    if User.objects.filter(email=data.get('email')).exists():
        return Response({
            'error':'Email already exists'
        },status=400)
    
    if not data.get('password') or len(data.get('password'))<6:
        return Response({
            'error':'Password must be at least 6 characters long'
        },status=400)
    
    data['password']=make_password(data.get('password'))

    serializer=UserRegistrationSerializer(data=data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {"message": "Registration Successfully..."},status=201
        )
    
    return Response(serializer.errors,status=400)
    


@api_view(['POST'])
@csrf_exempt

def User_login(request):

    email=request.data.get('email')
    password=request.data.get('password')

    if not email or not password:
        return Response({
            'error':'email and password are required'
        },status=400)
    
    try:
        user=User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({
            'error':'Invalid Email'
        },status=400)

    if check_password(password,user.password):
        refresh=RefreshToken.for_user(user)
        refresh['user_id']=user.id
        refresh['email']=user.email
        return Response({
            'message':'Login Successful',
            'access_token':str(refresh.access_token),
            'refresh_token':str(refresh),
            'role':'user',
            'user':{
                'id':user.id,
                'name':user.name,
                'email':user.email,
                'location':user.location
            }
        },status=200)


    # Create User Order
@api_view(['POST'])
@csrf_exempt
def Create_Order(request):

    data = request.data

    try:
        user = User.objects.get(id=data.get('user'))
    except User.DoesNotExist:
        return Response({
            "error": "User not found"
        }, status=404)

    try:
        product = FarmerProduct.objects.get(id=data.get('product'))
    except FarmerProduct.DoesNotExist:
        return Response({
            "error": "Product not found"
        }, status=404)
    
# create upi Order

client = razorpay.Client(
    auth=("rzp_test_Sw1AUUWTp2q8vV", "ZhEE4fWlv5kbLawEld10hdSj")
)

@api_view(['POST'])
@csrf_exempt
def Create_UPI_Order(request):

    amount = int(request.data.get('amount')) * 100

    payment = client.order.create({
        'amount': amount,
        'currency': 'INR',
        'payment_capture': '1'
    })

    return Response({
        "message": "UPI Order Created",
        "payment": payment,
        "id": payment.get('id'),
        "amount": payment.get('amount')
    }, status=201)

   

    # total price calculate
    quantity = int(data.get("quantity"))
    unit = data.get("unit")

    if unit == "quintal":
      total_price = product.bulk_price * quantity
    else:
      total_price = product.normal_price * quantity

    order = UserOrder.objects.create(
        user=user,
        product=product,
        name=data.get('name'),
        phone=data.get('phone'),
        address=data.get('address'),
        quantity=quantity,
        unit=data.get('unit'),
        payment=data.get('payment'),
        total_price=total_price
    )

    serializer = UserOrderSerializer(order)

    return Response({
        "message": "Order Created Successfully",
        "order": serializer.data
    }, status=201)



# add product from Farmer
@api_view(['POST'])
@csrf_exempt
@parser_classes([MultiPartParser, FormParser])
def add_product(request):


    data = request.data

    try:
        farmer = Farmer.objects.get(
            id=data.get('farmer')
        )

    except Farmer.DoesNotExist:

        return Response({
            "error": "Farmer not found"
        }, status=404)

    product = FarmerProduct.objects.create(

        farmer=farmer,
        product_image=request.FILES.get('product_image'),
        product_name=data.get('product_name'),
        category=data.get('category'),
        variety=data.get('variety'),
        quantity=data.get('quantity'),
        normal_price=data.get('normal_price'),
        bulk_price=data.get('bulk_price'),
        description=data.get('description'),
        call=data.get('call'),
        whatsapp=data.get('whatsapp')

    )

    serializer = FarmerProductSerializer(product)

    return Response({
        "message": "Product Added Successfully",
        "product": serializer.data
    }, status=201)

@api_view(['GET'])
@csrf_exempt
def get_products(request):

    products=FarmerProduct.objects.all().order_by('-created_at')
    serializer=FarmerProductSerializer(products,many=True)

    return Response(serializer.data,status=200)


@api_view(['GET'])
@csrf_exempt
def farmer_products_byId(request, farmer_id):

    products = FarmerProduct.objects.filter(
        farmer=farmer_id
    )

    serializer = FarmerProductSerializer(
        products,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
@csrf_exempt

def get_allFarmers(request):

    farmer=Farmer.objects.all();
    serializer=FarmerRegistrationSerializer(farmer,many=True)
    return Response(serializer.data,status=200)

