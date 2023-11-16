
from accounts.models import Account
from Restaurants.models import RestaurantProfile
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.views import APIView


# Create your views here.

class BlockUnBlockUserView(APIView):
    
    @csrf_exempt
    def put(self, request, user_id):
        try:
            instance = Account.objects.get(id=user_id)
            print('instance',instance)
            instance.is_active = not instance.is_active
            instance.save()

            return Response({"message": "User status changed"}, status=status.HTTP_200_OK)
        
        except Account.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        



class FoodItemAvailabilityView(APIView):
    def get_object(self, food_id):
        try:
            return Food.objects.get(pk=food_id)
        except Food.DoesNotExist:
            return None

    def put(self, request, food_id):
        food_item = self.get_object(food_id)

        if food_item is not None:
            food_item.is_available = not food_item.is_available
            food_item.save()
            return Response({'message': 'Food item availability updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)

    def handle_exception(self, exc):
        return Response({'message': 'Failed to update food item availability', 'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class RegisterRestaurantView(APIView):

    @csrf_exempt
    def post(self, request, user_id):
        try:
            instance = RestaurantProfile.objects.get(restaurant_id=user_id)
            instance.is_registered = True
            instance.save()

            return Response({"message": "Restaurant Registered"}, status=status.HTTP_200_OK)
        
        except Account.DoesNotExist:
            return Response({"message": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)
        


class GetRestaurantProfileView(APIView):

    @csrf_exempt
    def get(self, request, restaurant_id):
        try:
            instance = RestaurantProfile.objects.get(restaurant_id=restaurant_id)
            
            # You can customize the data you want to return based on your model fields
            data = {
                "restaurant_id": instance.restaurant_id,
                "name": instance.name,
                "address": instance.address,
                # Add more fields as needed
            }

            return JsonResponse(data, status=status.HTTP_200_OK)
        
        except RestaurantProfile.DoesNotExist:
            return Response({"message": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)



# views.py
from django.http import JsonResponse
from orders.models import Order
from django.db.models import Sum
from datetime import datetime, timedelta

def total_delivered_orders_amount_api(request):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)

    delivered_orders = Order.objects.filter(
        status='Delivered',
        created_at__range=(start_date, end_date)
    )

    total_amount = delivered_orders.aggregate(Sum('order_total'))['order_total__sum'] or 0

    return JsonResponse({'totalAmount': total_amount})





from django.db.models import Count
from django.db.models.functions import TruncDate
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

class OrderCountByDayAPIView(APIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = OrderSerializer
    def get(self, request, *args, **kwargs):
        data = Order.objects.annotate(day=TruncDate('created_at')).values('day').annotate(count=Count('id'))

        labels = [entry['day'].strftime('%Y-%m-%d') for entry in data]
        counts = [entry['count'] for entry in data]

        return Response({'labels': labels, 'counts': counts})
