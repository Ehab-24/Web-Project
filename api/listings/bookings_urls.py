from . import views
from django.urls import path

app_name = 'listings'

urlpatterns = [
    path('', views.get_bookings),
    path('create/', views.create_booking),
    path('<int:booking_id>/', views.get_booking),
    path('<int:booking_id>/update/', views.update_booking),
    path('<int:booking_id>/cancel/', views.cancel_booking),
]
