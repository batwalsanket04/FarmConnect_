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
    class Meta:
        model = UserOrder
        fields = '__all__'
 





        