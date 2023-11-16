from django.urls import path
from .views import (
    UserProfileView, 
    UserProfileListView, 
    AuthenticatedUserProfile,

    )

urlpatterns = [
    path('user-createprofile/', UserProfileView.as_view(), name='create-user-profile'),
    path('user-createprofile/<int:id>/', UserProfileView.as_view(), name='update-user-profile'),
    path('user-profiles/', UserProfileListView.as_view(), name='user-profile-list'),
    path('user-profile/', AuthenticatedUserProfile.as_view(), name='user-profile'),
]