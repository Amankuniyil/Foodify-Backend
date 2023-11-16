# signals.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
import json
from .models import Order



@receiver(post_save, sender=Order)
def order_paid_notification(sender, instance, **kwargs):
    if instance.is_paid and not kwargs.get('created', False):
        restaurant_id = instance.restaurant
        order_id = instance.id
        message = "Order has been paid. Thank you!"

        # Send WebSocket notification to the restaurant
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'order_{order_id}_restaurant_{restaurant_id}',
            {
                'type': 'notify.restaurant',
                'message': message,
            }
        )
