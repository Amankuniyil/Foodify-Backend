# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class OrderNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.order_id = self.scope['url_route']['kwargs'].get('order_id', 'default_order_id')
        self.restaurant_id = self.scope['url_route']['kwargs'].get('restaurant_id', 'default_restaurant_id')
        self.room_group_name = f'order_{self.order_id}_restaurant_{self.restaurant_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'notify.restaurant',
                'message': message
            }
        )

    # Receive message from room group
    async def notify_restaurant(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
