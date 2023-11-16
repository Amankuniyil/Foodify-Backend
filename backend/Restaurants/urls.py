from django.urls import path
from .views import (
    RestaurantProfileView,
    RestaurantProfileListView,
    GetRestaurantProfileView,
    CheckRegistrationView,
    AuthenticatedRestaurantProfile,
    UpdateRegistrationStatusView,
    OrderCountByDayAPIView,
    ResOrderCountByDayAPIView,
    GetResProfileView,
    OrdersPerRestaurantView

    )

urlpatterns = [
    path('restaurant-createprofile/', RestaurantProfileView.as_view(), name='create-restaurant-profile'),
    path('restaurant-createprofile/<int:id>/', RestaurantProfileView.as_view(), name='update-restaurant-profile'),
    path('restaurant-profiles/', RestaurantProfileListView.as_view(), name='restaurant-profile-list'),
     path('get-restaurant-profile/<int:restaurant_id>/', GetRestaurantProfileView.as_view(), name='get-restaurant-profile'),
     path('get-res-profile/', GetResProfileView.as_view(), name='get-restaurant-profile'),
    path('update-registration-status/<int:profile_id>/', UpdateRegistrationStatusView.as_view(), name='update_registration_status'),
    path('check-registration/', CheckRegistrationView.as_view(), name='check-registration'),
     path('restaurant-profile/', AuthenticatedRestaurantProfile.as_view(), name='restaurant-profile'),
    path('order_count_by_day/', OrderCountByDayAPIView.as_view(), name='order_count_by_day'),
    path('res_order_count_by_day/', ResOrderCountByDayAPIView.as_view(), name='order_count_by_day'),
    path('orders-per-restaurant/<int:year>/<int:month>/<int:day>/', OrdersPerRestaurantView.as_view(), name='orders_per_restaurant'),

]
