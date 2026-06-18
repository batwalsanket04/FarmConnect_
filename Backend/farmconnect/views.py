from itertools import product
import json
import razorpay




from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from django.db.models import Sum
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



@api_view(['POST'])
@csrf_exempt
def Create_Order(request):
    """Create one or more UserOrder records from incoming order payload.

    Expected payloads:
    - Single item:
      { "user": <id>, "product": <id>, "quantity": <n>, "unit": "kg|quintal", ... }

    - Cart (multiple items):
      { "user": <id>, "name":..., "phone":..., "address":..., "payment":..., "cart": [{id, buyQty, unit}, ...] }

    If `user` is not provided, function will try to find a User by `phone` or `email`.
    """
    data = request.data

    # resolve user
    user = None
    user_id = data.get('user')
    if user_id:
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
    else:
        phone = data.get('phone')
        email = data.get('email')
        if phone:
            try:
                user = User.objects.get(phone=phone)
            except User.DoesNotExist:
                user = None
        elif email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None

    if not user:
        return Response({"error": "User id or existing user phone/email required"}, status=400)

    created_orders = []

    # support cart (multiple items)
    cart = data.get('cart')
    if cart and isinstance(cart, list):
        for item in cart:
            product_id = item.get('id') or item.get('product')
            try:
                product = FarmerProduct.objects.get(id=product_id)
            except FarmerProduct.DoesNotExist:
                return Response({"error": f"Product not found: {product_id}"}, status=404)

            quantity = int(item.get('buyQty') or item.get('quantity') or 1)
            unit = item.get('unit') or 'kg'

            if unit == 'quintal':
                total_price = product.bulk_price * quantity * 100
            else:
                total_price = product.normal_price * quantity

            order = UserOrder.objects.create(
                user=user,
                product=product,
                name=data.get('name') or user.name,
                phone=data.get('phone') or user.phone,
                address=data.get('address') or user.location,
                quantity=quantity,
                unit=unit,
                payment=data.get('payment', 'COD'),
                total_price=total_price
            )
            created_orders.append(order)

        serializer = UserOrderSerializer(created_orders, many=True)
        return Response({"message": "Orders Created Successfully", "orders": serializer.data}, status=201)

    # fallback: single-item order
    product_id = data.get('product')
    if not product_id:
        return Response({"error": "No product or cart provided"}, status=400)

    try:
        product = FarmerProduct.objects.get(id=product_id)
    except FarmerProduct.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    quantity = int(data.get('quantity') or 1)
    unit = data.get('unit') or 'kg'

    if unit == 'quintal':
        total_price = product.bulk_price * quantity * 100
    else:
        total_price = product.normal_price * quantity

    order = UserOrder.objects.create(
        user=user,
        product=product,
        name=data.get('name') or user.name,
        phone=data.get('phone') or user.phone,
        address=data.get('address') or user.location,
        quantity=quantity,
        unit=unit,
        payment=data.get('payment', 'COD'),
        total_price=total_price
    )

    serializer = UserOrderSerializer(order)
    return Response({"message": "Order Created Successfully", "order": serializer.data}, status=201)



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
        unit=data.get('unit') or 'kg',
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

#logged in user Order
@api_view(['GET'])
@csrf_exempt

def User_order_byId(request,user_id):

    order=UserOrder.objects.filter(user_id=user_id).order_by('-created_at')
    serializer=UserOrderSerializer(order,many=True)

    return Response(serializer.data,status=200)


# farmer dashboard statistics
@api_view(['GET'])
@csrf_exempt

def Farmer_dashboard_stats(request, farmer_id):
    orders = UserOrder.objects.filter(product__farmer_id=farmer_id).order_by('-created_at')
    serializer = UserOrderSerializer(orders, many=True)

    total_earnings = orders.filter(status='delivered').aggregate(total=Sum('total_price'))['total'] or 0
    pending_count = orders.filter(status='pending').count()
    total_orders = orders.count()

    return Response({
        'orders': serializer.data,
        'total_earnings': float(total_earnings),
        'pending_count': pending_count,
        'total_orders': total_orders,
    }, status=200)


# fetch orders of logged in farmer

@api_view(['GET'])
@csrf_exempt
def Farmer_order_byId(request,farmer_id):
    # filter UserOrder by the farmer who owns the product
    orders = UserOrder.objects.filter(product__farmer_id=farmer_id).order_by('-created_at')
    serializer = UserOrderSerializer(orders, many=True)
    return Response(serializer.data, status=200) 


# view user orders by thier id 

@api_view(['GET'])
@csrf_exempt

def view_order_byId(request,item_id):
    try:
        order = UserOrder.objects.get(id=item_id)
        serializer = UserOrderSerializer(order)
        return Response(serializer.data, status=200)
    except UserOrder.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)


# update order status

@api_view(['PATCH', 'PUT'])
@csrf_exempt
def update_order_status(request, order_id):
    """Update the status of an order"""
    try:
        order = UserOrder.objects.get(id=order_id)
    except UserOrder.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    new_status = request.data.get('status')
    
    if not new_status:
        return Response({"error": "Status is required"}, status=400)
    
    valid_statuses = ['pending', 'accepted', 'shipped', 'delivered', 'rejected']
    if new_status not in valid_statuses:
        return Response({"error": f"Invalid status. Must be one of {valid_statuses}"}, status=400)
    
    order.status = new_status
    order.save()
    
    serializer = UserOrderSerializer(order)
    return Response({
        "message": "Order status updated successfully",
        "order": serializer.data
    }, status=200)


@api_view(['DELETE'])
@csrf_exempt

def delete_product(request,product_id):
    try:
        product=FarmerProduct.objects.get(id=product_id)
        product.delete()
        return Response({
            "message":"Product Deleted Successfully"
        },status=200)
    
    except FarmerProduct.DoesNotExist:
        return Response({
            "error":"Product not found"
        },status=404)