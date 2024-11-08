from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Listing
import json
from django.core.exceptions import ObjectDoesNotExist
from django.utils.dateparse import parse_datetime
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

def sanitize_listing_data(data):
    try:
        title = str(data.get("title", "")).strip()
        image = str(data.get("image", "")).strip()
        description = str(data.get("description", "")).strip()
        location = str(data.get("location", "")).strip()
        price = float(data.get("price", 0))
        rating = float(data.get("rating", 0))
        time = str(data.get("time", "")).strip()
        category = str(data.get("category", "")).strip()

        # Validate URL for image
        URLValidator()(image)

        return {
            "title": title,
            "image": image,
            "description": description,
            "location": location,
            "price": price,
            "rating": rating,
            "time": time,
            "category": category,
        }
    except (ValueError, TypeError, ValidationError):
        return None

@csrf_exempt
@require_http_methods(["GET", "POST"])
def listings(request):
    if request.method == "GET":
        listings = list(Listing.objects.values())
        return JsonResponse(listings, safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)
        sanitized_data = sanitize_listing_data(data)
        if not sanitized_data:
            return HttpResponseBadRequest("Invalid data")

        listing = Listing.objects.create(**sanitized_data)
        return JsonResponse({"id": listing.id, **sanitized_data})

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def listing_detail(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Listing not found"}, status=404)

    if request.method == "GET":
        return JsonResponse({
            "id": listing.id,
            "title": listing.title,
            "image": listing.image,
            "description": listing.description,
            "location": listing.location,
            "price": listing.price,
            "rating": listing.rating,
            "time": listing.time,
            "category": listing.category,
            "createdAt": listing.createdAt,
            "updatedAt": listing.updatedAt,
        })

    elif request.method == "PUT":
        data = json.loads(request.body)
        sanitized_data = sanitize_listing_data(data)
        if not sanitized_data:
            return HttpResponseBadRequest("Invalid data")

        for key, value in sanitized_data.items():
            setattr(listing, key, value)
        listing.save()
        return JsonResponse({"id": listing.id, **sanitized_data})

    elif request.method == "DELETE":
        listing.delete()
        return JsonResponse({"message": "Listing deleted"})


@csrf_exempt
@require_http_methods(["GET"])
def search_listings(request):
    query = request.GET.get("query", "")
    listings = Listing.objects.filter(location__icontains=query).values()
    return JsonResponse(list(listings), safe=False)
