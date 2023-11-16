
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from .models import Food
# from .serializers import AllFoodSerializer,AccountSerializer,RestaurantProfileSerializer

# from rest_framework.parsers import MultiPartParser, FormParser

# #Create your views here.

# class AddFoodView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, format=None):
#         try:
            
#             # Retrieve and serialize properties based on your logic
#             properties = Food.objects.filter(vendor=request.user)
#             serializer = AllFoodSerializer(properties, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
            
#         except Exception as e:
#             return Response({'message': 'Failed to retrieve properties', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     def post(self, request, format=None):
#         try:
           
#             property_data = request.data
#             property_data['vendor'] = request.user.id

#             serializer = AllFoodSerializer(data=property_data)
#             if serializer.is_valid():
#                 serializer.save()
#                 response_data = {"message": "Property added successfully", "data": serializer.data}
#                 return Response(response_data, status=status.HTTP_201_CREATED)
#             else:
                
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         except Exception as e:
#             return Response({'message': 'Failed to add property', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from .models import Food  # Import your Food model
# from .serializers import AllFoodSerializer  # Import your serializer

# class GetFoodView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, profile_id, format=None):
#         try:
#             # Assuming that profile_id is used to filter Food objects
#             food_items = Food.objects.filter(restaurant=profile_id)
#             serializer = AllFoodSerializer(food_items, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'message': 'Failed to retrieve food items', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
