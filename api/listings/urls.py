from . import views
from django.urls import path

app_name = 'listings'

urlpatterns = [
    path('', views.listings),
    path('<int:listing_id>/', views.listing_detail)
]
