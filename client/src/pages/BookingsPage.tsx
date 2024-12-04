import { useEffect, useState } from "react"
import Button from "../components/buttons/Button"
import * as api from '../api'
import * as TokensManager from '../lib/TokensManager'
import { useNavigate } from "react-router-dom"
import Spinner from "../components/spinner"
import { useAuth } from "../lib/AuthContext"
import { toast } from "react-toastify"
import BreadCrum from "../components/BreadCrum"
import DestructiveButton from "../components/buttons/DestructiveButton"

export default function BookingsPage() {

    const [loading, setLoading] = useState(true)    // Assume that we will definitely load on first render to avoid jitter
    const [bookings, setBookings] = useState<any[]>([])
    const navigate = useNavigate()
    const { logout } = useAuth()

    function onCancel(id: string) {
        const bs = bookings.map(b => {
            if (b.id === id)
                b.status = 'canceled'
        })
        setBookings(bs)
    }

    useEffect(() => {
        async function fetchBookings() {
            setLoading(true)
            let [access, _] = TokensManager.getTokenPair()
            if (!!access) {
                const result = await api.bookings(access)
                if (result === 1) { // Assume that the token has expired
                    toast.warn("Session expired!")
                    logout()
                    navigate('/login')
                } else if (result !== 0) {
                    console.log("Bookings", result)
                    setBookings(result)
                }
            } else {
                alert('unable to laod bookings')
            }
            setLoading(false)
        }
        fetchBookings()
    }, [])

    if (!loading && bookings.length === 0) {
        return (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="mb-8 font-extrabold text-7xl text-gray-400">
                    No bookings yet.
                </h2>
                <Button onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </div>
        )
    }

    return loading ? (
        <div className="w-screen h-screen grid place-items-center">
            <Spinner />
        </div>
    ) : (
        <div className="w-full px-4 md:px-20 py-20">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {
                    bookings.map(b => (
                        <ListItem key={b.id} booking={b} onCancel={() => onCancel(b.id)} />
                    ))
                }
            </ol>
        </div>

    )
}

function ListItem({ booking, onCancel }: { booking: any, onCancel: () => void }) {

    const navigate = useNavigate()
    const { logout } = useAuth()

    async function cancelBooking() {
        const [access, _] = TokensManager.getTokenPair()
        if (!access)
            return
        const result = await api.cancelBooking(access, booking.id)
        if (result === 1) { // Assume that the token has expired
            toast.warn("Session expired!")
            logout()
            navigate('/login')
        } else if (result === 0) {
            toast.error('Unable to cancel booking, please try again later.')
        } else {
            toast('Booking canceled!')
            onCancel()
        }
    }

    return (
        <li className="mb-10 ms-4 max-w-3xl">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

            <div className="w-full flex gap-4 items-center">
                <time className="whitespace-nowrap mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                </time>
                <BreadCrum bgColor={getStatusColor(booking.status)}>{booking.status}</BreadCrum>
                <div className="w-full" />
                {
                    booking.status === 'pending' || booking.status === 'approved' ? (
                        <DestructiveButton onClick={cancelBooking}>
                            <span className="whitespace-nowrap">Cancel booking</span>
                        </DestructiveButton>
                    ) : <></>
                }
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <span className="capitalize">{booking.listing.listing_type}</span> in {booking.listing.location} booked for {booking.adults} adults, {booking.children} children.</p>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{booking.listing.description}</p>
            <Button onClick={() => { navigate(`/listings/${booking.listing.id}`) }} className="flex items-center">
                See&nbsp;&nbsp;<b>{booking.listing.title}</b>
                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>

            </Button>
        </li>
    )
}

function formatDate(strDate: string): string {
    const date = new Date(strDate);
    const options = { month: 'long', day: 'numeric' };
    // @ts-ignore
    return date.toLocaleDateString('en-US', options);
}

function getStatusColor(status: string): string {
    return status === 'pending' ? 'bg-yellow-200' : status === 'approved' ? 'bg-green-200'
        : status === 'rejected' ? 'bg-red-200' : status === 'canceled' ? 'bg-purple-200' : 'bg-blue-200';
}
