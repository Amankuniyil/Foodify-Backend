from rest_framework import serializers
from accounts.models import Account
from accounts.serializers import UserViewSerializer
from .models import UserProfile


# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'is_verified', 'is_active']


# UserProfile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        # exclude = ('user',)


# UserProfileListing
class UserProfileListSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = '__all__'

