from rest_framework import serializers
from .models import Address, Order, OrderItem  # Import both Address and Order models
from datetime import datetime
from accounts.serializers import SignUpSerializer
import uuid

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'  # Include all fields in the Address model

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'  # Include all fields in the OrderItem model

class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user', 'payment', 'order_number', 'order_total', 'order_discount', 'tax', 'status', 'ip', 'is_ordered', 'is_returned', 'return_reason', 'address', 'restaurant')  # Include 'address' field

    def create(self, validated_data):
        # Extract 'address' data from validated_data
        address_data = validated_data.pop('address')
        order_total = validated_data.pop('order_total')

        # Create the address instance or update an existing one
        user = validated_data['user']
        # address, created = Address.objects.get_or_create(user=user, defaults=address_data)

        # Assign the address instance to the 'address' field in the order data
        validated_data['address'] = address_data
        validated_data['order_total'] = order_total

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        order_number = f"{user.id}{timestamp}"
        validated_data['order_number'] = order_number

        # Create the order instance
        return Order.objects.create(**validated_data)

class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    user = SignUpSerializer()
    order_items = OrderItemSerializer(many=True, read_only=True)  # Include order items using the OrderItemSerializer

    class Meta:
        model = Order
        fields = '__all__'


from rest_framework import serializers
from .models import OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    food_item_name = serializers.CharField(source='food_item.name')
    food_item_image = serializers.ImageField(source='food_item.image')

    class Meta:
        model = OrderItem
        fields = ['id', 'food_item_name', 'food_item_image', 'quantity', 'price']
