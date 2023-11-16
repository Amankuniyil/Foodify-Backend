from django.db import models
from accounts.models import Account

# Create your models here.


class Food(models.Model):
    CATEGORY_CHOICES = (
        ('VEG', 'Vegetarian'),
        ('NON_VEG', 'Non-Vegetarian'),
    )

    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='food_items/')
    description = models.TextField()
    # restaurant = models.ForeignKey(Account, on_delete=models.CASCADE)
    category = models.CharField(max_length=8, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_spicy = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    restaurant = models.ForeignKey(Account, on_delete=models.CASCADE, default=1)  # Use the ID of the desired 'Account' instance as the default value

    def __str__(self):
        return self.name
