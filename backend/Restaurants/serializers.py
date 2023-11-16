from rest_framework import serializers
from .models import RestaurantProfile
from accounts.models import Account



class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'is_verified', 'is_active']



# class RestaurantProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RestaurantProfile
#         fields = ['type', 'restaurant_name', 'about', 'address', 'city', 'state', 'registration_number', 'year_of_experience', 'open', 'profile_photo', 'image', 'license', 'fssai']


class RestaurantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProfile
        fields = '__all__'




class RestaurantProfileListSerializer(serializers.ModelSerializer):
    vendor=RestaurantSerializer()

    class Meta:
        model=RestaurantProfile 
        fields = '__all__'

