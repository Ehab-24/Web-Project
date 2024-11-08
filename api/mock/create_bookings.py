#!/usr/bin/env python

import requests

if __name__ == "__main__":

    url = 'http://127.0.0.1:8000/api/bookings/'

    bookings = []
    bookings.append({
        "listing_id": 2,
        "user": "John Doe",
        "check_in": "2024-11-10T14:00:00",
        "check_out": "2024-11-15T11:00:00"
    })
    bookings.append({
        "listing_id": 7,
        "user": "John Doe",
        "check_in": "2024-11-10T14:00:00",
        "check_out": "2024-11-15T11:00:00"
    })
    bookings.append({
        "listing_id": 8,
        "user": "John Doe",
        "check_in": "2024-11-10T14:00:00",
        "check_out": "2024-11-15T11:00:00"
    })

    for b in bookings:
        x = requests.post(url, json = b)
        print(x.text)
