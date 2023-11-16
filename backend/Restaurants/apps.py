from django.apps import AppConfig


class RestaurantsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Restaurants'


# apps.py
from django.apps import AppConfig

class YourAppConfig(AppConfig):
    name = 'Restaurants'

    def ready(self):
        import Restaurants.signals  # Import your signals.py file here

