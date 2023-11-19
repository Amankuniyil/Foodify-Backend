from rest_framework import serializers
from .models import Account, UserType,Item
from rest_framework.validators import ValidationError
from django.core.validators import validate_email
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name', 'last_name', 'email', 'username', 'phone_number', 'password')

# from rest_framework import serializers

# class SignUpSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = '__all__'


    #Checking Email Already Exist
    def validate(self, attrs):
        email_exist = Account.objects.filter(email = attrs['email']).exists()
        if email_exist:
            return ValidationError('This Email is already Taken!')
        return super().validate(attrs)
    
    #Checking Valid Email
    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError as e:
            raise serializers.ValidationError("This is not a valid email, try again !")
        else:
            print("good email")
        
        return value
    
    #Creating and Saving user
    def create(self, validated_data):
        password = validated_data.pop('password') #password hashing

        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
    

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = '__all__'


class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email', 'username', 'phone_number']



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'