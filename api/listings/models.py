from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=255)
    image = models.URLField()
    description = models.TextField()
    location = models.CharField(max_length=255)
    price = models.FloatField()
    rating = models.FloatField()
    time = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
