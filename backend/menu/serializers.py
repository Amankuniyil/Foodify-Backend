from rest_framework import serializers
from accounts.serializers import UserViewSerializer
from .models import Food
from accounts.models import Account
# from vendor.serializers import VendorSerializer,VendorProfileListSerializer,VendorProfileSerializer
from Restaurants.models import RestaurantProfile
from users.models import UserProfile
# from buyproperty.models import Interest

class AllFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'




class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number']

class RestaurantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProfile
        fields = '__all__'



