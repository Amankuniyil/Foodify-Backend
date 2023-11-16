from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated
from .serializers import AddressSerializer,OrderCreateSerializer,OrderSerializer
from .models import Address,OrderItem,Order
from menu.models import Food
from cart.models import Cart,CartItem
from accounts.models import Account
import datetime
from Restaurants.models import RestaurantProfile



class AddressCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Automatically set the user field to the currently authenticated user
        request.data['user'] = request.user.id

        serializer = AddressSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Log or print the serializer errors for debugging
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        try:
            user = request.user
            addresses = Address.objects.filter(user=user)
            serializer = AddressSerializer(addresses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': 'Failed to retrieve addresses', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order
from .serializers import OrderCreateSerializer
from cart.models import Cart, CartItem
from .models import Address





from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem, Address
from .serializers import OrderCreateSerializer
from django.db import transaction

# ...



@api_view(['POST'])
def create_order(request):
    try:
        # Get user and address_id from the request data
        user = request.user
        address_id = request.data.get('address')
        address_id = int(address_id)

        # Retrieve the cart instance
        cart = Cart.objects.get(user=user)
        reg = cart.restaurant_id

        # Retrieve the address instance based on the given address_id
        # address = Address.objects.get(id=address_id)
        # print('Address:', address.pincode)

        # Retrieve order details from the request data
        order_number = request.data.get('order_number', '1')
        tax = request.data.get('tax', 0.0)
        cart_items = CartItem.objects.filter(cart=cart)

        # Calculate the order total taking into account the quantity of each item
        order_total = sum(cart_item.quantity * cart_item.price for cart_item in cart_items)

        # Create data for the order
        order_data = {
            'user': user.id,
            'order_number': order_number,
            'order_total': order_total,
            'tax': tax,
            'address': address_id,
            'restaurant': reg,
            # Do not include cart_items here
            # Add other fields as needed
        }

        # Wrap the order creation in a transaction
        with transaction.atomic():
            # Create an instance of the serializer and pass the data
            serializer = OrderCreateSerializer(data=order_data)

            if serializer.is_valid():
                # If the data is valid, save the order
                order = serializer.save()

                # Create OrderItems related to this order
                for cart_item in cart_items:
                    OrderItem.objects.create(
                        order=order,
                        food_item=cart_item.food_item,
                        quantity=cart_item.quantity,
                        price=cart_item.price,
                    )

                response_data = {
                    'orderId': order.id,
                    'message': 'Order created successfully',
                }
                print('restaurants 232:', reg)

                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                # Log the serializer errors for debugging
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Debug: Print the exception to see what went wrong
        print('Error creating order:', e)
        return Response({'error': 'An error occurred while creating the order'}, status=status.HTTP_400_BAD_REQUEST)






from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import NotFound
from .models import RestaurantProfile, Order
from .serializers import OrderSerializer


class OrdersInRestaurantView(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]


    def get(self,request):
        try:
            # Get the authenticated user (modify this as needed)
            user = request.user.id
            print('user',request.user.id)

            # Get the restaurant profile associated with the user
            # restaurant = 1

            # Filter orders by restaurant, is_ordered, and is_paid
            restaurant = RestaurantProfile.objects.get(restaurant_id=user)
            print('rest',restaurant)
            resid=restaurant.id
            print('res',resid)
            orders = Order.objects.filter(restaurant=resid, is_ordered=True, is_paid=True).order_by('-id')

            # Serialize the orders using your OrderSerializer
            serializer = OrderSerializer(orders, many=True)

            # Return the serialized data and a 200 OK response
            return Response({ 'orders': serializer.data}, status=status.HTTP_200_OK)

        except RestaurantProfile.DoesNotExist:
            raise NotFound('Restaurant profile not found for the given user.')

        except Order.DoesNotExist:
            raise NotFound('No orders found for the given restaurant.')

        except Exception as e:
            # Log the exception for debugging (replace with your preferred logging mechanism)
            print('Error fetching orders:', e)
            return Response({'error': 'An error occurred while fetching orders.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from rest_framework.renderers import JSONRenderer
# from rest_framework.exceptions import NotFound
# from your_app.models import Order  # Replace with the actual model import
# from your_app.serializers import OrderSerializer  # Replace with the actual serializer import
# from your_app.models import RestaurantProfile  # Replace with the actual model import

# class OrdersInRestaurantView(APIView):
#     renderer_classes = [JSONRenderer]

#     def get(self, request):
#         try:
#             # Get the authenticated user (modify this as needed)
#             user_id = 53

#             # Get the restaurant profile associated with the user (modify this as needed)
#             restaurant_id = 3

#             # Check if the user is associated with the restaurant
#             restaurant_profile = RestaurantProfile.objects.get(id=restaurant_id, user_id=user_id)

#             # Filter orders by restaurant, is_ordered, and is_paid
#             orders = Order.objects.filter(restaurant=restaurant_profile, is_ordered=True, is_paid=True)

#             # Serialize the orders using your OrderSerializer
#             serializer = OrderSerializer(orders, many=True)

#             # Return the serialized data and a 200 OK response
#             return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

#         except RestaurantProfile.DoesNotExist:
#             raise NotFound('Restaurant profile not found for the given user.')

#         except Order.DoesNotExist:
#             raise NotFound('No orders found for the given restaurant.')

#         except Exception as e:
#             # Log the exception for debugging (replace with your preferred logging mechanism)
#             print('Error fetching orders:', e)
#             return Response({'error': 'An error occurred while fetching orders.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








@api_view(['GET'])
def orders_detail(request,orderid):
    try:
        # Get the authenticated user

        order=orderid

        # Get the restaurant profile associated with the user

        


        # Filter orders by restaurant, is_ordered, and is_paid
        orders = Order.objectsget(id=order)

        # Serialize the orders using your OrderSerializer
        serializer = OrderSerializer(orders, many=True)

        # Get the restaurant profile ID
        

        # Return the serialized data and a 200 OK response
        return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

    except RestaurantProfile.DoesNotExist:
        return Response({'error': 'Restaurant profile not found for the given restaurant number.'}, status=status.HTTP_404_NOT_FOUND)

    except Order.DoesNotExist:
        return Response({'error': 'No orders found for the given restaurant number.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log the exception for debugging
        print('Error fetching orders:', e)
        return Response({'error': 'An error occurred while fetching orders.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



from django.conf import settings  # Import Django settings module
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Order, OrderItem  # Import your app's models
import razorpay

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Account, Order
from .serializers import OrderCreateSerializer
import razorpay
from django.conf import settings

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Order
from .serializers import OrderCreateSerializer
from django.conf import settings
import razorpay

class InitiatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            order_id = request.data.get('order_number')

            current_user = request.user

            # Extract order details from the request
            order = Order.objects.get(id=order_id)
            order_number = order.order_number
            order_total = order.order_total

            # Get the user associated with the current_user
            user = get_object_or_404(Account, email=current_user.email)

            # You should add logic to validate that the user has permission to initiate payment for this order

            amount_in_paise = int(float(order_total) * 100)

            RAZORPAY_KEY_ID = settings.RAZORPAY_KEY_ID
            RAZORPAY_KEY_SECRET = settings.RAZORPAY_KEY_SECRET

            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

            # Calculate admin fee
            admin_fee = (0.15 * amount_in_paise) / 100
            deducted_amount = amount_in_paise - admin_fee

            order_response = client.order.create({
                'amount': deducted_amount,
                'currency': 'INR',
                'payment_capture': 1,
            })

            # Create a new order if it doesn't already exist
            order, created = Order.objects.get_or_create(
                id=order_id,
                defaults={
                    'user': user,
                    'order_number': order_number,
                    'order_total': order_total,
                    'status': 'Order Confirmed',
                    'created_at': timezone.now(),
                    'updated_at': timezone.now(),
                }
            )

            # Update the razorpay_order_id field
            order.razorpay_order_id = order_response.get('id')
            # order.razorpay_payment_id = request.data.get('razorpay_payment_id')
            # order.razorpay_signature = request.data.get('razorpay_signature')
            order.is_paid = True
            order.is_ordered = True
            order.save()

            # You should associate this order with your specific logic in your app

            serializer = OrderCreateSerializer(order)
            data = {
                "order_response": order_response,
                "order_id": order.id,
                "razorpay_order_id": order.razorpay_order_id,
            }

            return Response(data)
        except Account.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class SuccessPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data.get("data", {})
        print('data',data)
        received_order_id = data.get("order_id")
        print('received_order_id',received_order_id)

        ord_id = ""
        raz_pay_id = ""
        raz_signature = ""

        for key in data.keys():
            if key == "razorpay_order_id":
                ord_id = data[key]
            elif key == "razorpay_payment_id":
                raz_pay_id = data[key]
            elif key == "razorpay_signature":
                raz_signature = data[key]

        raz_pay_id = data.get("razorpay_payment_id")
        payment_id = raz_pay_id

        PUBLIC_KEY = settings.RAZORPAY_KEY_ID # Get your Razorpay settings from Django settings
        SECRET_KEY = settings.RAZORPAY_KEY_SECRET

        client = razorpay.Client(auth=(PUBLIC_KEY, SECRET_KEY))

        
        
  

        check = client.utility.verify_payment_signature(data)

        if check:
            # Payment is successful, update order status
            # try:
                # order = Order.objects.get(id=76)
                razorpay_order_id=data.get("razorpay_order_id")
                order = Order.objects.get(razorpay_order_id=razorpay_order_id)
                print( 'razor apyy',data.get("razorpay_payment_id"))
                print( 'razorsignn',data.get("razorpay_signature"))
              
                
                # order = Order.objects.get(id=73)
                # order = Order.objects.get(id=received_order_id)
                order.razorpay_payment_id = data.get("razorpay_payment_id")
                order.razorpay_signature = data.get("razorpay_signature")
                print('order id', ord_id)
                order.is_paid = True
                order.is_ordered = True
                order.save()

                # You can perform other logic specific to your app here

                res_data = {"message": "Payment successfully received!", "order_id": ord_id}
                return Response(res_data)
            # except Order.DoesNotExist:
            #     return Response(
            #         {"error": "Error processing payment or order not found."},
            #         status=status.HTTP_400_BAD_REQUEST,
            #     )
        else:
            # Payment verification failed
            return Response(
                {"error": "Payment verification failed."},
                status=status.HTTP_400_BAD_REQUEST,
            )




from rest_framework.generics import RetrieveAPIView

from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import OrderCreateSerializer  # Import your OrderCreateSerializer
from .models import Order  # Import your Order model

class OrderView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderCreateSerializer

    def get_object(self):
        # Retrieve the order by its ID and check if it belongs to the authenticated user
        order_id = self.kwargs['order_id']
        try:
            order = Order.objects.get(id=order_id, user=self.request.user)
            return order
        except Order.DoesNotExist:
            return None

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({"detail": "Order not found"}, status=404)
    
    
    


    



class change_order_status(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderCreateSerializer


    def post(self,request, order_id):
        print('working',order_id)

        order = get_object_or_404(Order, pk=order_id)
        print('status',order.status)
        if order.status=='Order Confirmed':
            order.status='Cooking'

        elif order.status=='Cooking':
            order.status='Out for delivery'


        elif order.status=='Out for delivery':
            order.status='Delivered'


        print('status',order.status)
        order.save()



        # Redirect back to the order detail page or any other appropriate URL.
        return Response( status=status.HTTP_201_CREATED)
    





from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderSerializer  # Import your OrderSerializer
from .models import Order  # Import your Order model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer

class UserOrderView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get(self, request):
        try:
            user = request.user

            if not user.is_authenticated:
                return Response({'error': 'User is not authenticated.'}, status=status.HTTP_UNAUTHORIZED)

            # Filter orders by the user ID, is_ordered, and is_paid
            orders = Order.objects.filter(user=user, is_ordered=True, is_paid=True)

            # Serialize the orders using your OrderSerializer
            serializer = OrderSerializer(orders, many=True)

            # Return the serialized data and a 200 OK response
            return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

        except Order.DoesNotExist:
            return Response({'error': 'No orders found for the given user.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            # Log the exception for debugging
            print('Error fetching orders:', e)
            return Response({'error': 'An error occurred while fetching orders.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from django.http import JsonResponse
from .models import Order  # Import your Order model
from django.shortcuts import get_object_or_404

def get_order_details(request, order_id):
    try:
        order = get_object_or_404(Order, id=order_id)
        # You may need to serialize your order object to JSON before returning it.
        # You can use Django REST framework serializers or a simple dictionary-based approach.
        # Here, we're assuming a dictionary-based approach for simplicity.

        order_details = {
            'order_id': order.id,
            'order_total': order.order_total,
            # Add other order details here
        }
        print(order_details)

        return JsonResponse(order_details)
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found'}, status=404)



from django.http import JsonResponse
from .models import Order, OrderItem
from django.shortcuts import get_object_or_404

def get_order_items(request, order_id):
    print(order_id)  # Add this line for debugging
    try:
        order = get_object_or_404(Order, id=order_id)
        order_items = OrderItem.objects.filter(order=order)
        print('items',order_items)

        # Serialize the order items as a list of dictionaries
        order_items_list = []

        for item in order_items:
            food_name = item.food_item.name
            food_image = item.food_item.image 
            print('image',food_image) # Access the related Food object directly
            order_items_list.append({
                'id': item.id,
                'food_item': food_name,
                # 'food_image':food_image,
                
                'quantity': item.quantity,
                'price': str(item.price),  # Convert DecimalField to a string
            })

        print(order_items_list)  # Add this line for debugging

        return JsonResponse(order_items_list, safe=False)
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found'}, status=404)


from .models import Order

class AdminOrderView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get(self, request):
        try:
            if not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated.'}, status=status.HTTP_UNAUTHORIZED)

            # Retrieve all orders without user-specific filtering
            orders = Order.objects.all().order_by('-id')

            # Serialize the orders using your OrderSerializer
            serializer = OrderSerializer(orders, many=True)

            # Return the serialized data and a 200 OK response
            return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            # Log the exception for debugging
            print('Error fetching orders:', e)
            return Response({'error': 'An error occurred while fetching orders.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
