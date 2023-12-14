from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from orders.routing import websocket_urlpatterns
from django.urls import path, re_path

# Import the routing configuration from your app


# your_project/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from django.urls import path
from orders import routing as orders_routing
from chat import routing as rout
from orders.consumers import OrderNotificationConsumer
from chat.consumers import ChatConsumer

application = ProtocolTypeRouter({
    'http': get_asgi_application(),  # Include the default Django ASGI application for HTTP
    'websocket': AuthMiddlewareStack(
        URLRouter(
            # Include the WebSocket routing for the 'orders' app
            orders_routing.websocket_urlpatterns,
            rout.websocket_urlpatterns
        )
    ),
})
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.urls import path
# from your_app import consumers

# application = ProtocolTypeRouter({
#     "websocket": URLRouter([
#         path("ws/restaurant/", OrderNotificationConsumer.as_asgi()),
#     ]),
# })
