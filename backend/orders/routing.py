from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path
from orders import consumers

# routing.py

# orders/routing.py
# from django.urls import re_path

# from .consumers import OrderNotificationConsumer

# websocket_urlpatterns = [
#     re_path(r'restaurant/$', OrderNotificationConsumer.as_asgi()),
    
# ]

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # re_path(r"ws/notify/", consumers.NotificationConsumer.as_asgi()),
     re_path(r"ws/notify/(?P<resId>\d+)/$", consumers.NotificationConsumer.as_asgi()),
     
]