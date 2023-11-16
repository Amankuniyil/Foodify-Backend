from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from orders.routing import websocket_urlpatterns

# Import the routing configuration from your app


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            orders.routing.websocket_urlpatterns
        )
    ),
})
