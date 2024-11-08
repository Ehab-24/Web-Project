#!/usr/bin/env python

import requests

if __name__ == "__main__":

    url = 'http://127.0.0.1:8000/api/listings/'

    listings = []
    listings.append({
      "title": "Cozy Beach House",
      "images": "http://example.com/beach1.jpg,http://example.com/beach2.jpg",
      "listing_type": "House",
      "amenities": "Wi-Fi, Pool, Parking",
      "number_of_guests": 4,
      "bedrooms": 2,
      "bathrooms": 1,
      "price_per_night": 150.0,
      "location": "California Beach",
      "description": "A cozy house with a great view of the beach.",
      "rating": 4.8,
      "time": "Flexible",
      "category": "Beach"
    })

    listings.append({
      "title": "Mountain Retreat",
      "images": "http://example.com/mountain1.jpg,http://example.com/mountain2.jpg",
      "listing_type": "Cabin",
      "amenities": "Hot Tub, Fireplace, Wi-Fi",
      "number_of_guests": 6,
      "bedrooms": 3,
      "bathrooms": 2,
      "price_per_night": 200.0,
      "location": "Rocky Mountains",
      "description": "A secluded cabin for a peaceful retreat in the mountains.",
      "rating": 4.5,
      "time": "Weekends",
      "category": "Mountain"
    })

    listings.append({
      "title": "City Center Apartment",
      "images": "http://example.com/city1.jpg,http://example.com/city2.jpg",
      "listing_type": "Apartment",
      "amenities": "Wi-Fi, Elevator, Gym",
      "number_of_guests": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "price_per_night": 100.0,
      "location": "Downtown New York",
      "description": "A modern apartment in the heart of the city.",
      "rating": 4.0,
      "time": "Anytime",
      "category": "Urban"
    })

    for b in listings:
        x = requests.post(url, json = b)
        print(x.text)
