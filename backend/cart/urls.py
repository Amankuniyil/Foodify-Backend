from django.urls import path
from .views import CartAddItemView, CartView, CartDeleteItemView,add,minus  # Import CartItemDeleteView

urlpatterns = [
    path('add/<int:food_id>/', CartAddItemView.as_view(), name='add'),  # Use CartAddItemView
    path('items/', CartView.as_view(), name='cart-items'),  # Use CartView
     path('items/<int:cart_item_id>/', CartDeleteItemView.as_view(), name='cart-delete-item'),
     path('addq/<int:cart_item_id>/', add, name='add'),
     path('minus/<int:cart_item_id>/',minus,name='minus'),


]
