from django.urls import path,include
from . import views


urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('verify-otp/', views.Verify_otpView.as_view(), name='verify_otp'),
    path('signin/', views.LoginView.as_view(), name='signin'),
    path("user/<int:user_id>/", views.UserAvailabilityView.as_view(), name="user-food"),
    path('user-profile/', views.update_user_profile, name='user-profile'),
    

]

