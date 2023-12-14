# from django.urls import path, include,re_path
# from . import consumers
# from . import views

# websocket_urlpatterns = [
#     # path("ws/chat/<int:send>/<int:receive>/", consumers.ChatConsumer.as_asgi(), name='chat_ws'),
#      re_path(r"ws/chat/(?P<send>\d+)/(?P<receive>\d+)/$", consumers.ChatConsumer.as_asgi(), name='chat_ws'),
#     # re_path(r"ws/chat/(?P<send>\d+)/(?P<receive>\d+)/$", consumers.ChatConsumer.as_asgi(), name='chat_ws'),

#     # re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi())
 
# ]

# urls.py
from django.urls import path, include,re_path
from . import consumers
from . import views

websocket_urlpatterns = [
    path("ws/chat/<int:send>/<int:receive>/", consumers.ChatConsumer.as_asgi(), name='chat_ws'),
    #  re_path(r"ws/chat/(?P<send>\d+)/(?P<receive>\d+)/$", consumers.ChatConsumer.as_asgi(), name='chat_ws'),
    # re_path(r"ws/chat/(?P<send>\d+)/(?P<receive>\d+)/$", consumers.ChatConsumer.as_asgi(), name='chat_ws'),

    # re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi())
 
]