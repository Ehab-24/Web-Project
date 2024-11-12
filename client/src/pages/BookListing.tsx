import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../api"
import Spinner from "../components/spinner";
import SubmitButton from "../components/buttons/SubmitButton";


export default function BookListing() {

    const { listingId } = useParams()
    const [listing, setListing] = useState<any | null>(null)

    useEffect(() => {
        // @ts-ignore
        if (!listingId || isNaN(listingId)) return
        api.listing(listingId!)
            .then(res => {
                if (!!res) setListing(res)
            })
    }, [listingId])

    if (!!listing) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Book Your Stay</h1>
                    <p className="text-gray-600">Property ID: {listingId}</p>
                </header>

                {/* Property Details */}
                <section className="mb-8">
                    <div className="flex items-center space-x-6">
                        <img
                            src={listing.images[0]}
                            alt="Property Thumbnail"
                            className="w-48 h-32 object-cover rounded-lg"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{listing.title}</h2>
                            <p className="text-gray-600 mt-1">Located in {listing.location}</p>
                            <p className="text-gray-800 font-semibold mt-2">${listing.price_per_night} / night</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">
                        {listing.description}
                    </p>
                </section>

                <BookingForm listing={listing} />

            </div>
        );
    } else {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <Spinner />
            </div>
        )
    }
};


function BookingForm({ listing }: { listing: any }) {

    const [formData, setFormData] = useState({
        checkInDate: "",
        checkOutDate: "",
        fullName: "",
        email: "",
        adults: 1,
        children: 0,
        specialRequests: ""
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Process formData here

        let message = "Property booked"

        api.createBooking(listing.id)
            .then(res => {
                if (!!res) {} else {
                    message = "Error creating booking"
                }
                alert(message)
            })

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
                    <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
                    <input
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Guest Information */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Number of Guests */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Adults</label>
                    <input
                        type="number"
                        name="adults"
                        min="1"
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Children</label>
                    <input
                        type="number"
                        name="children"
                        min="0"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Special Requests */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Special Requests</label>
                <textarea
                    name="specialRequests"
                    placeholder="Any specific requirements?"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
            </div>

            <SubmitButton className="w-full h-12">
                Confirm Booking
            </SubmitButton>
        </form>
    )
}
