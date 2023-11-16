from django.db import models
from accounts.models import Account


# # Create your models here.
from django.db import models




from django.db import models

class RestaurantProfile(models.Model):
    # Fields for the RestaurantProfile model
    # vendor = models.ForeignKey(Account, on_delete=models.CASCADE)
    restaurant_name = models.CharField(max_length=255, default='')
    type = models.CharField(max_length=20, choices=[('Veg', 'Veg'), ('Non-Veg', 'Non-Veg')], default='')
    about = models.TextField(default='restaurant')
    address = models.TextField(default='')
    city = models.CharField(max_length=100, default='')
    state = models.CharField(max_length=100, default='')
    registration_number = models.CharField(max_length=50, default='')
    year_of_experience = models.IntegerField(default=5)
    opening_time = models.CharField(max_length=50, default='')
    country = models.CharField(max_length=50, default='')
    open = models.CharField(max_length=50, default='')
    is_registered = models.BooleanField(default=False)
    restaurant = models.ForeignKey(Account, on_delete=models.CASCADE)

    # Image fields with default values
    profile_photo = models.ImageField(upload_to='profile_photos/', default='path_to_default_image.jpg')
    image = models.ImageField(upload_to='restaurant_images/', default='default_image.png')
    license = models.ImageField(upload_to='licenses/', default='default_image.png')
    fssai = models.ImageField(upload_to='fssai/', default='path_to_default_image.jpg')

    def __str__(self):
        return self.restaurant_name





# class RestaurantProfile(models.Model):
#     # Restaurant Status Choices
#     RESTAURANT_STATUS = [
#         ('veg', 'Vegetarian'),
#         ('non_veg', 'Non-Vegetarian'),
#     ]
    
#     restaurant = models.CharField(max_length=100)
#     status = models.CharField(choices=RESTAURANT_STATUS, max_length=10)
#     address = models.TextField(blank=True)
#     city = models.CharField(max_length=50)
#     state = models.CharField(max_length=50)
#     phone_number = models.CharField(max_length=15, blank=True, null=True)
#     website = models.URLField(blank=True, null=True)
#     description = models.TextField(blank=True)
#     opening_hours = models.CharField(max_length=100, blank=True, null=True)
#     restaurant_image = models.ImageField(upload_to='profile', blank=True, null=True)
#     restaurant_license = models.ImageField(upload_to='profile', blank=True, null=True)
#     restaurant_fssai = models.ImageField(upload_to='profile', blank=True, null=True)
#     # You can add more fields as needed, such as images, ratings, etc.

#     def __str__(self):
#         return self.name



    

# class MenuItem(models.Model):
#     CLASSIFICATION_CHOICES = (
#         ('neither', 'Neither'),
#         ('vegan', 'Vegan'),
#         ('vegetarian', 'Vegetarian'),
#     )

#     name = models.CharField(max_length=48, help_text='Name of the item on the menu.')
#     description = models.CharField(max_length=256, null=True, blank=True, help_text='The description is a simple text description of the menu item.')
#     category = models.ManyToManyField(MenuCategory, blank=True, verbose_name='menu category', help_text='Category is the menu category that this menu item belongs to, i.e. \'Appetizers\'.')
#     order = models.IntegerField(default=0, verbose_name='order', help_text='The order is to specify the order in which items show up on the menu.')
#     price = models.DecimalField(max_digits=6, decimal_places=2, help_text='The price is the cost of the item.')

#     classification = models.CharField(max_length=10, choices=CLASSIFICATION_CHOICES, default=0, verbose_name='classification', help_text='Select if this item classifies as Vegetarian, Vegan, or Neither.')
#     spicy = models.BooleanField(default=False, verbose_name='spicy?', help_text='Is this item spicy?')
#     contains_peanuts = models.BooleanField(default=True, verbose_name='contain peanuts?', help_text='Does this item contain peanuts?')
#     gluten_free = models.BooleanField(default=False, verbose_name='gluten free?', help_text='Is this item Gluten Free?')

#     def menu_name(self):
#         return ",".join([str(p) for p in self.category.all()])

#     class Meta:
#         verbose_name = 'menu item'
#         verbose_name_plural = 'menu items'
#         verbose_name = 'menu name'

#     def __str__(self):
#         return self.name

