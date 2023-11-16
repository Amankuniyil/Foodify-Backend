from django.urls import path
from .views import AddressCreateView,UserOrderView,get_order_items,create_order,AdminOrderView,OrdersInRestaurantView,get_order_details,InitiatePaymentView,SuccessPaymentView,OrderView,orders_detail,change_order_status
from django.urls import re_path

from . import consumers


urlpatterns = [
    path('add-address/', AddressCreateView.as_view(), name='address-create'),
    path('get-addresses/', AddressCreateView.as_view(), name='address-list'),
    path('create/', create_order, name='create_order'),
    path('resorders/', OrdersInRestaurantView.as_view(), name='restaurant_orders'),
    path('order-detail/<int:order_id>/', orders_detail, name='restaurant_orders'),
    path('initiate-payment/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('success-payment/', SuccessPaymentView.as_view(), name='success-payment'),
    path('order-view/<int:order_id>/', OrderView.as_view(), name='order-view'),
    path('change-order-status/<int:order_id>/', change_order_status.as_view(), name='change_order_status'),
    path('userorders/', UserOrderView.as_view(), name='user_orders'),
    path('detail/<int:order_id>/', get_order_details, name='get_order_details'),
    path('items/<int:order_id>/', get_order_items, name='get_order_items'),
    path('all-orders/',AdminOrderView.as_view(),name='orders'),
     re_path(r'restaurant/$', consumers.OrderNotificationConsumer.as_asgi()),
   
        

]
