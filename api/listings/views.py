from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Listing, Booking
import json
from .sanitizers import sanitize_listing_data, sanitize_booking_data


#########################################
### LISTINGS
#########################################

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
            return JsonResponse({"error":"Invalid data"}, status=400)

        listing = Listing.objects.create(**sanitized_data)
        return JsonResponse({"id": listing.id, **sanitized_data})

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def listing_detail(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except Listing.DoesNotExist:
        return JsonResponse({"error": "Listing with id {} does not exist".format(listing_id)}, status=404)

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
            return JsonResponse({"error":"Invalid data"}, status=400)

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



#########################################
### BOOKINGS
#########################################


@csrf_exempt
@require_http_methods(["GET", "POST"])
def create_booking(request):

    if request.method == "GET":
        bookings = list(Booking.objects.values())
        return JsonResponse(bookings, safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)
        sanitized_data = sanitize_booking_data(data)
        if not sanitized_data:
            return JsonResponse({"error":"Invalid data"}, status=400)

        listing_id = data.get("listing_id")
        try:
            Booking.objects.get(listing_id=listing_id)
            return JsonResponse({"error":"Booking for listing with id {} already exists".format(listing_id)}, status=400)
        except Booking.DoesNotExist:
            pass

        listing = None
        try:
            listing = Listing.objects.get(id=listing_id)
        except Listing.DoesNotExist:
            return JsonResponse({"error":"Listing with id {} does not exist".format(listing_id)}, status=409)

        booking = Booking.objects.create(
            listing=listing,
            **sanitized_data
        )
        return JsonResponse({"booking_id": booking.id, "status": booking.status})

@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def booking_details(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return JsonResponse({"error": "Booking with id {} does not exist".format(booking_id)}, status=404)

    if request.method == "GET":
        return JsonResponse({
            "booking_id": booking.id,
            "listing_id": booking.listing.id,
            "user": booking.user,
            "check_in": booking.check_in,
            "check_out": booking.check_out,
            "status": booking.status,
            "createdAt": booking.createdAt,
            "updatedAt": booking.updatedAt,
        })

    elif request.method == "PUT":
        data = json.loads(request.body)
        sanitized_data = sanitize_booking_data(data)
        if not sanitized_data:
            return JsonResponse({"error": "Invalid data"}, status=400)
        
        for key, value in sanitized_data.items():
            setattr(booking, key, value)
        booking.save()
        return JsonResponse({"id": booking.id, **sanitized_data})

    elif request.method == "DELETE":
        booking.delete()
        return JsonResponse({"message": "Booking deleted"})
