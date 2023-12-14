import json
from channels.generic.websocket import AsyncWebsocketConsumer

# class OrderNotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#     async def disconnect(self, close_code):
#         pass

#     async def receive(self, text_data):
#         try:
#             text_data_json = json.loads(text_data)
#             message = text_data_json['message']

#             # Echo the received message back to the client
#             await self.send(text_data=json.dumps({
#                 'message': f"Received: {message}"
#             }))
#         except KeyError:
#             pass



# import json
# from asgiref.sync import async_to_sync
# from channels.generic.websocket import AsyncWebsocketConsumer

# class NotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         # Connect to the WebSocket
#         self.group_name = 'restaurant_group'
#         self.resId = int(self.scope['url_route']['kwargs']['resId'])
#         print('res id',self.resId)

#         # Add the consumer to the group
#         await self.channel_layer.group_add(
#             self.group_name,
#             self.channel_name
#         )

#         # Accept the WebSocket connection
#         await self.accept()

#     async def disconnect(self, close_code):
#         # Disconnect from the WebSocket
#         await self.channel_layer.group_discard(
#             self.group_name,
#             self.channel_name
#         )

#     async def notify_restaurant(self, event):
#         # Send message to WebSocket
#         await self.send(text_data=json.dumps({
#             'message': event['message'],
#         }))

import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Connect to the WebSocket
        self.group_name = 'restaurant_group'
        self.resId = int(self.scope['url_route']['kwargs']['resId'])
        print('res id', self.resId)

        # Add the consumer to the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Disconnect from the WebSocket
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def notify_restaurant(self, event):
        # Get the restaurant ID from the event
        order_res_id = event.get('restaurant')

        # Check if the event is for the current restaurant
        if order_res_id == self.resId:
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'message': event['message'],
            }))

