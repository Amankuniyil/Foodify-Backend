

# Create your views here.
# import stripe
from django.db.models import Sum
from decimal import Decimal
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Account
from .models import UserProfile
from .serializers import UserProfileSerializer, UserProfileListSerializer


#stripe.api_key = settings.STRIPE_SECRET_KEY


# UserProfile
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            print(request.data)
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'user profile not found'}, status=status.HTTP_404_NOT_FOUND)





    def put(self, request, *args, **kwargs):
        if request.method != 'PUT':
            return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        try:
            profile = UserProfile.objects.get(user=request.user)
            user = Account.objects.get(email=request.user)
            user.is_profile = True
            user.save()
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







# UserProfileListing
class UserProfileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profiles = UserProfile.objects.all()
        serializer = UserProfileListSerializer(profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    




# UserProfileDetails
class AuthenticatedUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileListSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    

