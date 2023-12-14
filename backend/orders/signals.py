# # signals.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order

# @receiver(post_save, sender=Order)
# def order_paid_notification(sender, instance, **kwargs):
#     if instance.is_paid and not kwargs.get('created', False):
#         restaurant_id = instance.restaurant_id
#         order_id = instance.id
#         message = "Order has been paid. Thank you!"

#         # Send WebSocket notification to the restaurant
#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             f'restaurant_{restaurant_id}',
#             {
#                 'type': 'notify.restaurant',
#                 'message': message,
#                 'order_id': order_id,
#             }
#         )



def order_paid_notification(sender, instance, **kwargs):
    print('signal working')
    if instance.is_paid and not kwargs.get('created', False):
        # Order has been paid, send a generic notification
        message = "Order has been paid. Thank you!"

        # Send WebSocket notification to the restaurant
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'restaurant_group',
            {
                'type': 'notify.restaurant',
                'message': message,
            }
        )






# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
# from .models import Notification

# @receiver(post_save, sender=Notification)
# def notification_created(sender, instance, created, **kwargs):
#     if created:
#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             'public_room',
#             {
#                 "type": "send_notification",
#                 "message": instance.message
#             }
#         )