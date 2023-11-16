from rest_framework import serializers
from .models import Cart, CartItem
from menu.serializers import AllFoodSerializer

class CartItemSerializer(serializers.ModelSerializer):
    # food = AllFoodSerializer()

      # Use the modified Addres
    food_item = serializers.SerializerMethodField()  # Use SerializerMethodField for custom representation

    class Meta:
        model = CartItem
        fields = ('id', 'user', 'food_item', 'quantity', 'price', 'is_active', 'name')

    def get_food_item(self, obj):
        # Customize the representation of the food_item field with additional fields like image
        food = obj.food_item
        return {
            'id': food.id,
            'name': food.name,
            'image': food.image.url if food.image else None  # Assuming 'image' is an ImageField
            # Add other fields as needed
        }

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'cart_id', 'date_added', 'cart_items')

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart_items', [])
        cart = Cart.objects.create(**validated_data)
        for cart_item_data in cart_items_data:
            CartItem.objects.create(cart=cart, **cart_item_data)
        return cart
