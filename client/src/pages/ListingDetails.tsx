import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api"
import Spinner from "../components/spinner.tsx"
import Carousel from "../components/carousel.tsx";

export default function ListingDetails() {

    const { id } = useParams()
    const [listingDetails, setListingDetails] = useState<any>(null)

    useEffect(() => {
        try {
            api.listing(Number(id)).then(details => {
                console.log(details)
                setListingDetails(details)
            })
        } catch (error) {
            console.log(error)
        }
    }, [id])

    if (!!listingDetails) {
        return (
            <div className="flex flex-col w-full pb-20 px-4 md:px-8 xl:px-20 pt-20">



                <div className="flex flex-row gap-12">
                    <Carousel className="w-1/2 bg-orange-200 aspect-[2/1] object-cover rounded-xl shadow-2xl shadow-black/50" images={[
                        'https://fastly.picsum.photos/id/289/200/300.jpg?hmac=TVh4H_Hra3e1VSDPJz-mhCgep32qIa7T6DGQvbrjMb4',
                        'https://fastly.picsum.photos/id/227/200/300.jpg?hmac=t3Ir7I6CJr-OrWOq4QVsRQTjpp03ce7vtDA3-NLdm-c',
                        'https://fastly.picsum.photos/id/1033/200/300.jpg?hmac=856_WOyaGXSjI4FWe3_NCHU7frPtAEJaHnAJja5TMNk'
                    ]} />

                    <div className="flex w-full flex-col">
                        <p className="leading-7">{listingDetails.description}</p>
                        <p className="leading-7 mt-8">
                            Rating&nbsp;&nbsp;
                            <b>{listingDetails.rating}</b>
                        </p>
                        <p className="leading-7 mt-8">
                            Type&nbsp;&nbsp;
                            <b>{listingDetails.listing_type}</b>
                        </p>
                    </div>

                </div>

                <p className="leading-7 mt-20">
                    <b>$ {listingDetails.price_per_night}</b>&nbsp;
                    per {listingDetails.time}
                </p>
                <p className="leading-7">
                    Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>{listingDetails.location}</b>
                </p>
                <p className="leading-7">
                    Amenities&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>{listingDetails.amenities.join(', ')}</b>
                </p>

            </div>
        )
    } else {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <Spinner />
            </div>
        )
    }
}
