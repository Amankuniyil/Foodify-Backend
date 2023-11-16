from django.urls import path
from .views import (
    BlockUnBlockUserView,
    RegisterRestaurantView,
    GetRestaurantProfileView,
    OrderCountByDayAPIView

    

    )

urlpatterns = [
        path('blockuser/<int:user_id>/', BlockUnBlockUserView.as_view(), name='block-unblock-user'),
            path('register-restaurant/<int:user_id>/', RegisterRestaurantView.as_view(), name='register-restaurant'),
            path('restaurant-profiles/<int:restaurant_id>/', GetRestaurantProfileView.as_view(), name='get-restaurant-profile'),
             path('order_count_by_day/', OrderCountByDayAPIView.as_view(), name='order_count_by_day'),
          

]