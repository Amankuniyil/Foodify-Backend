
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Food
from accounts.models import Account
from Restaurants.models import RestaurantProfile
from .serializers import AllFoodSerializer,AccountSerializer,RestaurantProfileSerializer

from rest_framework.parsers import MultiPartParser, FormParser

#Create your views here.

class AddFoodView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        try:
            
            # Retrieve and serialize properties based on your logic
            Foods = Food.objects.filter(restaurant=request.user)
            serializer = AllFoodSerializer(Foods, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'message': 'Failed to retrieve properties', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    def post(self, request):
        try:
            # Parse the incoming form data
            
            user = request.user
            restaurant_id = user.id
            print('got in',restaurant_id)

            # Add the restaurant to the food data
            request.data['restaurant'] = restaurant_id
            print('got in',request.data)

            serializer = AllFoodSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': 'Failed to add food item', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
     
    
    



from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Food  # Import your Food model
from .serializers import AllFoodSerializer  # Import your serializer

class GetFoodView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, profile_id=0, format=None):
        try:
            if profile_id==0:
                profile=request.user
                profile_id=profile.id
                print('prof,',profile_id)
                
            food_items = Food.objects.filter(restaurant=profile_id)
            serializer = AllFoodSerializer(food_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Failed to retrieve food items', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


    def delete(self, request, food_id, format=None):
        try:
            food_item = Food.objects.get(pk=food_id)

            # Ensure that the user has permission to delete this food item
            if food_item.restaurant.id != request.user.id:
                return Response({'message': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

            food_item.delete()
            return Response({'message': 'Food item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        except Food.DoesNotExist:
            return Response({'message': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': 'Failed to delete food item', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    def put(self, request, food_id, format=None):
        try:
            food_item = Food.objects.get(pk=food_id)



            # Toggle the 'is_available' field
            food_item.is_available = not food_item.is_available
            food_item.save()
            
            return Response({'message': 'Food item availability updated successfully'}, status=status.HTTP_200_OK)

        except Food.DoesNotExist:
            return Response({'message': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': 'Failed to update food item availability', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class GetMenuView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            print('we are here')
            food_items = Food.objects.get(restaurant_id=request.user)
            user=request.user
            # restaurant_id=RestaurantProfile.objects.get(restaurant_id=user)
            # print('resid', restaurant_id)
            # Assuming that profile_id is used to filter Food objects
            # food_items = Food.objects.filter(restaurant_id=user)
            serializer = AllFoodSerializer(food_items)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Failed to retrieve food items', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


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




class UserAvailabilityView(APIView):


    def put(self, request, food_id):
  



        user_id=9
        instance = Account.objects.get(id=user_id)
        print('instance',instance)
        instance.is_active = not instance.is_active
        instance.save()
        return Response({'message': 'Food item availability updated successfully'}, status=status.HTTP_200_OK)


    def handle_exception(self, exc):
        return Response({'message': 'Failed to update food item availability', 'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)