# views.py
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import RestaurantProfile
from .serializers import RestaurantProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404
from accounts.models import Account

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import JsonResponse
from django.views import View
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.core.mail import send_mail
from django.conf import settings



class RestaurantProfileView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes=(MultiPartParser, FormParser)

    def get(self,request,*args,**kwargs):
        try:
            profile=RestaurantProfile.objects.get(restaurant=request.user)
            serializer=RestaurantProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RestaurantProfile.DoesNotExist:
            return Response({'message': 'Restaurant profile not found'}, status=status.HTTP_404_NOT_FOUND)
        

    def post(self, request, *args, **kwargs):
        profile, created = RestaurantProfile.objects.get_or_create(restaurant=request.user)
        user = Account.objects.get(email=request.user)
        
        user.is_profile = True
        user.save()
        print(request.data)

        serializer = RestaurantProfileSerializer(profile, data=request.data)

        if serializer.is_valid():
            # Handle file uploads (if any)
            profile.profile_photo = request.FILES.get('profile_photo', profile.profile_photo)
            profile.image = request.FILES.get('image', profile.image)
            profile.license = request.FILES.get('license', profile.license)
            profile.fssai = request.FILES.get('fssai', profile.fssai)

            # Update other fields from the form
            profile.type = request.data.get('restaurant_type', profile.type)
            profile.restaurant_name = request.data.get('restaurant_name', profile.restaurant_name)
            profile.about = request.data.get('about', profile.about)
            profile.address = request.data.get('address', profile.address)
            profile.city = request.data.get('city', profile.city)
            profile.state = request.data.get('state', profile.state)
            profile.registration_number = request.data.get('registration_number', profile.registration_number)
            profile.year_of_experience = request.data.get('year_of_experience', profile.year_of_experience)
            profile.open = request.data.get('opening_time', profile.open)

            profile.save()
            return Response({'message': 'Created/Updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
@receiver(post_save, sender=RestaurantProfile)
def send_email_on_creation(sender, instance, created, **kwargs):
    if created:
        subject = 'New Restaurant Profile Created'
        message = f'A new restaurant profile for {instance.restaurant} has been created.'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['amanahmed.kuniyil@gmail.com']  # Replace with the actual recipient email(s)

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            

class AuthenticatedRestaurantProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = RestaurantProfile.objects.get(restaurant=request.user)
            serializer = RestaurantProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RestaurantProfile.DoesNotExist:
            return Response({'message': 'Restaurant profile not found'}, status=status.HTTP_404_NOT_FOUND)
        


from rest_framework import status
from rest_framework.response import Response

class CheckRegistrationView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user_profile = RestaurantProfile.objects.get(restaurant=request.user)
            print('userp',user_profile)
            is_registered = user_profile.is_registered
            return Response({'isRegistered': is_registered})
        except RestaurantProfile.DoesNotExist:
            # Handle the case when the RestaurantProfile does not exist
            return Response({'isRegistered': False}, status=status.HTTP_404_NOT_FOUND)



class RestaurantProfileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profiles = RestaurantProfile.objects.all()
        serializer = RestaurantProfileSerializer(profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    


from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import status
from .models import RestaurantProfile  # Make sure to import your model
from .serializers import RestaurantProfileSerializer  # Import your serializer

class GetRestaurantProfileView(APIView):

    @csrf_exempt
    def get(self, request, restaurant_id):
        try:
            instance = RestaurantProfile.objects.get(id=restaurant_id)
            serializer = RestaurantProfileSerializer(instance)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        
        except RestaurantProfile.DoesNotExist:
            return Response({"message": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)
        


from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import RestaurantProfile
from .serializers import RestaurantProfileSerializer
from django.contrib.auth.models import User

class GetResProfileView(APIView):

    @csrf_exempt
    def get(self, request):
        try:
            # Assuming that the user is authenticated and represents a restaurant
            user = request.user
            restaurant_profile = get_object_or_404(RestaurantProfile, restaurant=user)

            serializer = RestaurantProfileSerializer(restaurant_profile)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        
        except RestaurantProfile.DoesNotExist:
            return Response({"message": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)



from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RestaurantProfile
from django.core.mail import send_mail
from django.conf import settings




from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import RestaurantProfile

class UpdateRegistrationStatusView(APIView):
    permission_classes = [IsAuthenticated]  # Use the appropriate permission class

    def put(self, request, profile_id):
        restaurant_profile = get_object_or_404(RestaurantProfile, id=profile_id)

        # Toggle the registration status
        restaurant_profile.is_registered = not restaurant_profile.is_registered
        restaurant_profile.save()

        return Response({"message": "Registration status updated successfully"}, status=status.HTTP_200_OK)


from django.db.models.functions import TruncDate
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from orders.models import Order  # Adjust the import path based on your project structure
from django.db.models import Count




class OrderCountByDayAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated.'}, status=status.HTTP_UNAUTHORIZED)

            data = Order.objects.annotate(day=TruncDate('created_at')).values('day').annotate(count=Count('id'))

            labels = [entry['day'].strftime('%Y-%m-%d') for entry in data]
            counts = [entry['count'] for entry in data]

            return Response({'labels': labels, 'counts': counts}, status=status.HTTP_200_OK)
        except Exception as e:
            print('Error fetching data:', e)
            return Response({'error': 'An error occurred while fetching data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from orders.models import Order  # Import your Order model

class ResOrderCountByDayAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated.'}, status=status.HTTP_UNAUTHORIZED)

            # Replace 'your_restaurant_id' with the actual ID of the restaurant you want to filter
            restaurant_id_to_filter = request.user.id  # Replace with the actual restaurant ID
            restaurant_id_to_filter = get_object_or_404(RestaurantProfile, restaurant_id=restaurant_id_to_filter)
            restaurant_id_to_filter=restaurant_id_to_filter.id
            print('res id',restaurant_id_to_filter)

            # Get orders for a specific restaurant
            filtered_orders = Order.objects.filter(restaurant=restaurant_id_to_filter)

            # Annotate the orders by day
            data = filtered_orders.annotate(day=TruncDate('created_at')).values('day').annotate(count=Count('id'))

            labels = [entry['day'].strftime('%Y-%m-%d') for entry in data]
            counts = [entry['count'] for entry in data]
            print('labels',labels)
            print('counts',counts)

            return Response({'labels': labels, 'counts': counts}, status=status.HTTP_200_OK)
        except Exception as e:
            print('Error fetching data:', e)
            return Response({'error': 'An error occurred while fetching data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from django.utils import timezone




class OrdersPerRestaurantView(View):
    def get(self, request, year, month, day):
        # Convert parameters to integers
        year = int(year)
        month = int(month)
        day = int(day)

        # Create a datetime object for the specified day
        desired_date = timezone.datetime(year, month, day)

        # Query to get the number of orders for all restaurants on the specified day
        restaurant_orders = []

        # Get all restaurants
        restaurants = RestaurantProfile.objects.all()
        print('resss',restaurants.id)

        for restaurant in restaurants:
            # Get the number of orders for the specified restaurant on the specified day
            order_count = Order.objects.filter(
                created_at__date=desired_date,
                restaurant=restaurant
            ).count()

            # Append the data for this restaurant to the list
            restaurant_data = {
                'restaurant_id': restaurant.id,
                'restaurant_name': restaurant.restaurant_name,
                'orders_on_day': order_count
            }

            restaurant_orders.append(restaurant_data)

        # Return the result as JSON
        data = {
            'orders_per_restaurant': restaurant_orders,
            'date': desired_date.strftime('%Y-%m-%d')
        }

        return JsonResponse(data)
