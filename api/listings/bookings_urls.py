from . import views
from django.urls import path

app_name = 'listings'

urlpatterns = [
    path('', views.create_booking),
    path('<int:booking_id>/', views.booking_details),
]
