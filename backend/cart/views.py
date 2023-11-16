from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from menu.models import Food
from Restaurants.models import RestaurantProfile
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response



class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart_items = CartItem.objects.filter(user=request.user, is_active=True).order_by('id')
            serializer = CartSerializer(cart)
            cart_data = serializer.data
            cart_data['cart_items'] = CartItemSerializer(cart_items, many=True).data
            return Response(cart_data, status=status.HTTP_200_OK)

        except Cart.DoesNotExist:
            return Response({'message': 'Cart is empty'}, status=status.HTTP_200_OK)
        
    

    def delete(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
            cart_item.delete()
            return Response({'message': 'Cart item removed'}, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)








from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from menu.models import Food  # Assuming you have a 'Food' model in your 'menu' app
from Restaurants.models import RestaurantProfile
from .models import Cart, CartItem
from accounts.models import Account


from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from menu.models import Food
from Restaurants.models import RestaurantProfile
from .models import Cart, CartItem
from accounts.models import Account

class CartAddItemView(APIView):
    def post(self, request, food_id):
        try:
            food = get_object_or_404(Food, id=food_id)
            user = request.user  # Assuming request.user is correctly set up and authenticated
            restaurant = RestaurantProfile.objects.get(restaurant=food.restaurant)

            # Check if a cart already exists for the user
            try:
                cart = Cart.objects.get(user=user)
            except Cart.DoesNotExist:
                # If it doesn't exist, create a new one
                cart = Cart(user=user, restaurant=restaurant)
                cart.save()

            if cart.restaurant != restaurant:
                print('not same', cart.restaurant, restaurant)
                return Response({'error': 'Cannot add items from a different restaurant to the cart.'}, status=status.HTTP_400_BAD_REQUEST)

            # If the cart's restaurant is the same as the food item's restaurant, proceed
            # Set the cart ID for the cart item to the user's cart
            cart_item, item_created = CartItem.objects.get_or_create(
                user=user,
                food_item=food,
                name=food.name,
                restaurant=restaurant,
                defaults={'quantity': 1, 'price': food.price}
            )
            cart_item.cart_id = cart
            cart_item.save()

            # Add the cart item to the cart
            cart.cart_items.add(cart_item)

            if not item_created:
                # If the item is already in the cart, increase its quantity
                cart_item.quantity += 1
                cart_item.save()

            # Check if the cart is empty and delete it if necessary
            if cart.cart_items.count() == 0:
                cart.delete()

            # You can customize the response based on your frontend needs
            return Response({'message': 'Item added to cart', 'cart_item_id': cart_item.id}, status=status.HTTP_201_CREATED)

        except Food.DoesNotExist:
            return Response({'error': 'Food item not found'}, status=status.HTTP_400_BAD_REQUEST)

        

    
class CartDeleteItemView(APIView):
    def delete(self, request, cart_item_id):
        try:
            # Get the cart item to delete
            cart_item = get_object_or_404(CartItem, id=cart_item_id)
            user = request.user  # Assuming request.user is correctly set up and authenticated

            # Ensure the cart item belongs to the user
            if cart_item.user != user:
                return Response({'error': 'You do not have permission to delete this item from the cart.'}, status=status.HTTP_403_FORBIDDEN)

            # Remove the cart item from the user's cart
            cart_item.delete()

            # Check if the cart is empty and delete it if necessary
            cart = Cart.objects.filter(user=user).first()
            if cart and cart.cart_items.count() == 0:
                cart.delete()

            return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)
            
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def add(request, cart_item_id):
    cart_item=get_object_or_404(CartItem, id=cart_item_id)
    cart_item.quantity += 1
    cart_item.save()
    return Response({'message': 'Item added to the cart successfully'})



@api_view(['POST'])
def minus(request, cart_item_id):
    cart_item=get_object_or_404(CartItem, id=cart_item_id)
    cart_item.quantity -= 1
    if cart_item.quantity == 0:
        cart_item.delete()
        return Response({'message': 'Item deleted from the cart successfully'})
    cart_item.save()
    return Response({'message': 'Item added to the cart successfully'})


