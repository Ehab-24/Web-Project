import { useEffect, useState } from "react"
import PropertyCard from "./cards/PropertyCard"
import { fetchProperties } from "../api"

export default function PropertyListing() {

    const [properties, setProperties] = useState<any[]>([])

    useEffect(() => {
        fetchProperties()
            .then(ps => {
                if (ps) {
                    setProperties(ps)
                }
            })
    })


    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20">
            {
                properties.map(p => (
                    <PropertyCard key={p.title} title={p.title} image={p.image} description={p.description} location={p.location} price={p.price} rating={p.rating} time={p.time} />
                ))
            }
        </div>
    )
}
