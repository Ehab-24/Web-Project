from django.utils.dateparse import parse_datetime
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError


def sanitize_listing_data(data):
    try:
        title = str(data.get("title", "")).strip()
        images = str(data.get("images", "")).strip()
        listing_type = str(data.get("listing_type", "")).strip()
        amenities = str(data.get("amenities", "")).strip()
        number_of_guests = int(data.get("number_of_guests", 0))
        bedrooms = int(data.get("bedrooms", 0))
        bathrooms = int(data.get("bathrooms", 0))
        price_per_night = float(data.get("price_per_night", 0))
        location = str(data.get("location", "")).strip()
        description = str(data.get("description", "")).strip()
        rating = float(data.get("rating", 0))
        time = str(data.get("time", "")).strip()
        category = str(data.get("category", "")).strip()

        return {
            "title": title,
            "images": images,
            "listing_type": listing_type,
            "amenities": amenities,
            "number_of_guests": number_of_guests,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "price_per_night": price_per_night,
            "location": location,
            "description": description,
            "rating": rating,
            "time": time,
            "category": category,
        }
    except (ValueError, TypeError) as e:
        print(e)
        return None


def sanitize_booking_data(data):
    try:
        user = str(data.get("user", "")).strip()
        check_in = parse_datetime(data.get("check_in"))
        check_out = parse_datetime(data.get("check_out"))
        
        if not user or not check_in or not check_out:
            return None
        
        return {
            "user": user,
            "check_in": check_in,
            "check_out": check_out,
        }
    except (ValueError, TypeError) as e:
        print(e)
        return None
