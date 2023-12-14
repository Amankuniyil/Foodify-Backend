"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

# asgi.py

# import os
# from django.core.asgi import get_asgi_application
# from orders.routing import websocket_urlpatterns  # Adjust the import path as needed
# from django.urls import path,include
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             # Add your WebSocket consumers here
#             websocket_urlpatterns
#         )
#     ),
# })


# asgi.py or routing.py

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import chat.consumers  # Import your ChatConsumer

# application = ProtocolTypeRouter({
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             [
#                 path("ws/chat/<int:send>/<int:receive>/", chat.consumers.ChatConsumer.as_asgi(), name='chat_ws'),
#             ]
#         )
#     ),
#     # Add other protocol routers if needed
# })


import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from orders.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
            URLRouter(
                websocket_urlpatterns
            )
        ),
})