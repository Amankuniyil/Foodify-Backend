from django.urls import path
from .views import (AddFoodView,GetFoodView,GetMenuView,FoodItemAvailabilityView,UserAvailabilityView,)

urlpatterns = [
    path("add-food/", AddFoodView.as_view(), name="add-food"),
    path("get-food/<int:profile_id>/", GetFoodView.as_view(), name="get-food"),
    path("get-food/", GetFoodView.as_view(), name="get-food"),
    path("get-menu/", GetMenuView.as_view(), name="menu"),
    path("delete-food/<int:food_id>/", GetFoodView.as_view(), name="delete-food"),
    path("user/<int:user_id>/", UserAvailabilityView.as_view(), name="user-food"),
    # path('blockuser/<int:user_id>/', BlockUnBlockUserView.as_view(), name='block-unblock-user'),
     path('toggle-availability/<int:food_id>/', FoodItemAvailabilityView.as_view(), name='toggle-availability'),
 



]