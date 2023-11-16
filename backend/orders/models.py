from django.db import models
from accounts.models import Account
from cart.models import CartItem,Cart
from Restaurants.models import RestaurantProfile
from menu.models import Food 

# Create your models here.
class Address(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=50)
    address_line2 = models.CharField(max_length=50,null=True)
    #state = models.ForeignKey('States', null=True, blank=True)
    state =   models.CharField(max_length=50)
    city =   models.CharField(max_length=50,blank=True)
    pincode =   models.CharField(max_length=50,blank=True)

    


    def address(self):
        return f"{self.address_line1} {self.address_line2}"





class Payment(models.Model):
    user    =  models.ForeignKey(Account,on_delete=models.CASCADE)
    payment_id =   models.CharField(max_length=100)
    order_id = models.CharField(max_length=100,blank=True)
    payment_method = models.CharField(max_length=100)
    amount_paid     = models.CharField(max_length=100) #this is total amount paid
    created_at = models.DateTimeField(auto_now_add=True)
    status         = models.BooleanField(default=False)
    

from django.db import models

from django.db import models
from accounts.models import Account
from cart.models import CartItem, Cart

class Order(models.Model):
    STATUS = (
        ('Order Confirmed', 'Order Confirmed'),
        ('Cooking', 'Cooking'),
        ('Out for delivery', 'Out for delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),

    )

    user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, blank=True, null=True)
    order_number = models.CharField(max_length=30)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)  # Add this line
    order_total = models.FloatField( null=True)
    order_discount = models.FloatField(default=0)
    tax = models.FloatField(null=True)
    status = models.CharField(max_length=50, choices=STATUS, default='Order Confirmed')
    ip = models.CharField(blank=True, max_length=20)
    is_ordered = models.BooleanField(default=False)
    is_returned = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    return_reason = models.CharField(max_length=50, blank=True)
    razorpay_order_id = models.CharField(max_length=50, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    razorpay_signature = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    restaurant =  models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.order_number



class OrderItem(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    food_item = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)  # Price of the individual item

    def sub_total(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.food_item.name} in Order"
    


# models.py
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# ...

# @receiver(post_save, sender=Order)
# def order_paid(sender, instance, created, **kwargs):
#     if instance.is_paid:
#         # Import the channel layer and send a message to the consumer
#         from channels.layers import get_channel_layer
#         from asgiref.sync import async_to_sync

#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             "order_updates",
#             {
#                 "type": "order_update",
#                 "message": "Order is paid.",
#             },
#         )
