from rest_framework import serializers
from .models import Farmer,User,FarmerProduct,UserOrder


class FarmerRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farmer
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class FarmerProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerProduct
        fields = '__all__'

class UserOrderSerializer(serializers.ModelSerializer):
    product = FarmerProductSerializer(read_only=True)
    # expose some frontend-friendly aliases and a single-item `cart` array
    totalPrice = serializers.SerializerMethodField()
    orderdate = serializers.SerializerMethodField()
    cart = serializers.SerializerMethodField()

    class Meta:
        model = UserOrder
        # include model fields and the computed fields
        fields = [
            'id', 'user', 'product', 'name', 'phone', 'address', 'quantity',
            'unit', 'payment', 'total_price', 'status', 'created_at',
            'totalPrice', 'orderdate', 'cart'
        ]

    def get_totalPrice(self, obj):
        return obj.total_price

    def get_orderdate(self, obj):
        if obj.created_at:
            return obj.created_at.isoformat()
        return None

    def get_cart(self, obj):
        product = obj.product
        if not product:
            return []

        image_url = None
        try:
            image_url = product.product_image.url
        except Exception:
            image_url = None

        return [
            {
                'id': product.id,
                'image': image_url,
                'name': product.product_name,
                'normal_price': product.normal_price,
                'bulk_price': product.bulk_price,
                'unit': obj.unit,
                'buyQty': obj.quantity,
                'price': obj.total_price
            }
        ]
 





        