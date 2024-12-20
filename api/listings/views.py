from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
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
        for listing in listings:
            listing['images'] = listing['images'].split(',')
            listing['isBooked'] = False
            bookings = Booking.objects.filter(listing=listing['id'], status__in=['pending', 'approved'])
            for booking in bookings:
                if booking.check_out > timezone.now():
                    listing['isBooked'] = True
                else:
                    booking.status = 'ended'
                    booking.save()
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
            "images": listing.images.split(","),
            "listing_type": listing.listing_type,
            "amenities": listing.amenities.split(","),
            "number_of_guests": listing.number_of_guests,
            "bedrooms": listing.bedrooms,
            "bathrooms": listing.bathrooms,
            "price_per_night": listing.price_per_night,
            "location": listing.location,
            "description": listing.description,
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
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_bookings(request):
    bookings = list(Booking.objects
                    .filter(user=request.user)
                    .order_by('-createdAt')
                    .values())
    for booking in bookings:
        listing = Listing.objects.get(id=booking['listing_id'])
        booking['listing'] = model_to_dict(listing)
    return JsonResponse(bookings, safe=False)

@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_booking(request):
    data = json.loads(request.body)
    sanitized_data = sanitize_booking_data(data)
    if not sanitized_data:
        return JsonResponse({"error":"Invalid data"}, status=400)

    listing_id = data.get("listing_id")
    try:
        bookings = Booking.objects.filter(listing_id=listing_id, status__in=['pending', 'approved'])
        for booking in bookings:
            if booking.check_out > timezone.now():
                return JsonResponse({"error":"Booking for listing with id {} already exists".format(listing_id)}, status=400)
    except Booking.DoesNotExist:
        pass

    listing = None
    try:
        listing = Listing.objects.get(id=listing_id)
    except Listing.DoesNotExist:
        return JsonResponse({"error":"Listing with id {} does not exist".format(listing_id)}, status=409)

    booking = Booking.objects.create(
        user=request.user,
        listing=listing,
        **sanitized_data
    )
    return JsonResponse({"booking_id": booking.id, "status": booking.status})

@csrf_exempt
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    if booking.user != request.user:
        return JsonResponse({"error": "Operation not permitted"}, status=403)

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

@csrf_exempt
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_booking(request, booking_id):
    data = json.loads(request.body)
    sanitized_data = sanitize_booking_data(data)
    if not sanitized_data:
        return JsonResponse({"error": "Invalid data"}, status=400)

    booking = get_object_or_404(Booking, id=booking_id)
    if booking.user != request.user:
        return JsonResponse({"error": "Operation not permitted"}, status=403)
    
    for key, value in sanitized_data.items():
        setattr(booking, key, value)
    booking.save()
    return JsonResponse({"id": booking.id, **sanitized_data})

@csrf_exempt
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    if booking.user != request.user:
        return JsonResponse({"error": "Operation not permitted"}, status=403)
    booking.status = 'canceled'
    booking.save()
    return JsonResponse({"message": "Booking canceled"}, status=200)
