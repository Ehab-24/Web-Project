from django.urls import path
from .views import UserCreate

app_name = 'users'

urlpatterns = [
    path('', UserCreate.as_view(), name='create user'),
]
