from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'restaurant/(?P<order_id>\d+)/$', consumers.OrderNotificationConsumer.as_asgi()),
]

#  re_path(r'ws/order/(?P<order_id>\d+)/restaurant/(?P<restaurant_id>\d+)/$', consumers.OrderNotificationConsumer.as_asgi()),

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
