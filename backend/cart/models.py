from django.db import models
from Restaurants.models import RestaurantProfile
# Create your models here.
from django.db import models
from accounts.models import Account
from menu.models import Food  # Assuming you have a 'Food' model in your 'main' app

class Cart(models.Model):
    cart_id = models.CharField(max_length=250, blank=True)
    date_added = models.DateField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    restaurant = models.ForeignKey(RestaurantProfile, on_delete=models.CASCADE, null=True)
    cart_items = models.ManyToManyField('CartItem', related_name='carts')

    def __str__(self):
        return self.cart_id


class CartItem(models.Model):
    name = models.CharField(max_length=255,default=" ")
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    food_item = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)  # Price of the individual item
    is_active = models.BooleanField(default=True)
    restaurant = models.ForeignKey(RestaurantProfile, on_delete=models.CASCADE, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)

    def sub_total(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.food_item.name} in Cart"
