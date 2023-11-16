from django.db import models

from django.db import models
from accounts.models import Account


# Create your models here.


# Profile
class UserProfile(models.Model):

    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    profile_photo = models.ImageField(upload_to='profle picture', default='profile/profile.jpg')
    about = models.TextField(blank=True)
    date_of_birth = models.DateField(blank=True, null=True) 
    state = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return str(self.user)
    