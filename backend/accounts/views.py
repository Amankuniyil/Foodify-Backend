

# Create your views here.

from django.shortcuts import render
from .models import Account, UserType
from rest_framework import generics
from .serializers import SignUpSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.views import LoginView
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken
#from Restaurants.models import RestaurantProfile
from users.models import UserProfile
from Restaurants.models import RestaurantProfile
from django.core.exceptions import ObjectDoesNotExist
from .token import create_jwt_pair_tokens
from .otp import send_otp
import datetime

# Create your views here.

from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer



#SignUp 
class SignUpView(generics.GenericAPIView):
    serializer_class    = SignUpSerializer
    permission_classes  = [AllowAny]

    def post(self, request: Request):
        data = request.data

        serializer  = self.serializer_class(data=data)
        user_type   = request.data.get('user_type')
        email       = request.data.get('email')

        if serializer.is_valid():
            serializer.save()

            if user_type == 'Restaurant':
                user = Account.objects.get(email = email)
                user_type = UserType.objects.get(user_type_name = 'Restaurant')
                user.user_type = user_type
                user.save()
                RestaurantProfile.objects.create(restaurant = user)
                phone_number = data.get('phone_number')
                email = data.get('email')
                username = data.get('username')
                send_otp(username, email)

            elif user_type == 'User':
                user = Account.objects.get(email = email)
                user_type = UserType.objects.get(user_type_name = 'User')
                user.user_type = user_type
                user.save()
                UserProfile.objects.create(user = user)
                phone_number = data.get('phone_number')
                email = data.get('email')
                username = data.get('username')
                send_otp(username, email)

            else:
                print('neither Restaurant nor user')




            response = {
                'message' : 'User Created Successfully',
                'otp' : True
            }
            return Response(data = response, status = status.HTTP_201_CREATED)
        
        else:
            print(serializer.errors)
            errorMessage = "Error occurred Please check your inputs"
            if Account.objects.filter(email=email).exists():
                errorMessage = "Email is already taken"
            if Account.objects.filter(phone_number=request.data.get('phone_number')).exists():
                errorMessage = "Phone number already Taken"
            return Response(data=errorMessage, status=status.HTTP_400_BAD_REQUEST)
        

#OptVerification
class Verify_otpView(APIView):
    def post(self, request: Request):
        data = request.data
        check_otp = data.get('otp')
        email = data.get('email')

        try:
            user = Account.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response({"Failed": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        stored_otp = user.otp

        if stored_otp == check_otp:
            user.is_verified = True
            user.otp = ""
            user.save()

            return Response(
                data={'Success': 'User is verified', 'is_verified': True},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Failed": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST
            )
        

#Login
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request:Request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_verified == True:
                tokens = create_jwt_pair_tokens(user)
                refresh_token = RefreshToken(tokens['refresh'])

                response = {
                    "message": "Login Successful",
                    "access_token": tokens['access'],
                    "refresh_token": tokens['refresh'],
                    "token_expiry": refresh_token['exp'],
                    "is_login": True,
                    "user": {
                        "user_id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "username": user.username,
                        "phone_number": user.phone_number,
                        "email": user.email,
                        "user_type": user.user_type.user_type_name,
                        "is_active": user.is_active,
                        "is_profile": user.is_profile
                    }
                }
                return Response(data=response, status=status.HTTP_200_OK)

            
            else:
                response = {
                    "message" : "user is not verified"
                }
                return Response(data=response, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        else:
            return Response(data={"message" : "Invalid email or password !"}, status=status.HTTP_400_BAD_REQUEST)



# myapp/views.py


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account

class UserAvailabilityView(APIView):
    def put(self, request, user_id):
        try:
            instance = Account.objects.get(id=user_id)
            print('instance', instance)
            instance.is_active = not instance.is_active
            instance.save()
            return Response({'message': 'User status changed successfully'}, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as exc:
            return Response({'message': 'Failed to update user status', 'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import SignUpSerializer

# class UserProfileView(APIView):


#     permission_classes = [AllowAny]
#     # def get(self, request):
#     #     # Your existing code to retrieve the user profile data
#     #     user_profile = Account.objects.get(user=request.user)
#     #     serializer = SignUpSerializer(user_profile)
#     #     return Response(serializer.data)

    # def put(self, request):
    #     user = request.user.id
    #     print('user',user)
    #     user_profile = Account.objects.get(user=request.user)
    #     serializer = SignUpSerializer(user_profile, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Account  # Import your Account model
from .serializers import SignUpSerializer  # Import your SignUpSerializer

@api_view(['PUT'])
def update_user_profile(request):
    user = request.user.id
    print('user', user)

    try:
        user_profile = Account.objects.get(user=request.user)
    except Account.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SignUpSerializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid HTTP method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

