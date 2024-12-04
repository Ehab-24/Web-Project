from django.db import models
from django.contrib.auth.models import User

class Listing(models.Model):
    title = models.CharField(max_length=255)
    images = models.TextField()     # comma separated list
    listing_type = models.CharField(max_length=100)  # house, cottage, apartment, villa, loft, studio, garage, office, cabin
    amenities = models.TextField()  # Comma-separated list
    number_of_guests = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    price_per_night = models.FloatField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.FloatField()
    time = models.CharField(max_length=13)  # Day, Night, Day and Night
    category = models.CharField(max_length=50)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    email = models.CharField(max_length=1024)
    adults = models.IntegerField()
    children = models.IntegerField()
    special_requests = models.CharField(max_length=2000)

    status = models.CharField(max_length=50, default="pending")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
