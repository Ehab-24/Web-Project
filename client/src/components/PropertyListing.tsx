import { useEffect, useState } from "react"
import PropertyCard from "./cards/PropertyCard"
import { fetchProperties } from "../api"
import { propertyFiltersStore } from "../stores/propertyFilters"

export default function PropertyListing() {

    const [properties, setProperties] = useState<any[]>([])
    const [filteredProperties, setFilteredProperties] = useState<any[]>([])

    useEffect(() => {
        setFilteredProperties(properties)
    }, [properties])

    useEffect(() => {
        fetchProperties()
            .then(ps => {
                if (ps) {
                    setProperties(ps)
                }
            })
    }, [])

    useEffect(() => {
        const debouncedFilter = debounce(filterPropertiesBySearchTerm, 300);
        const unsuscribe = propertyFiltersStore.subscribe(
            (state, prevState) => {
                if (state.searchTerm != prevState.searchTerm) {
                    debouncedFilter(state.searchTerm)
                }
                if (state.category != prevState.category) {
                    filterPropertiesByCategory(state.category)
                }
            }
        )

        return () => unsuscribe()
    }, [])

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: any;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const filterPropertiesBySearchTerm = (query: string) => {
        const _query = query.toLowerCase().trim()
        
        if (!_query) {
            setFilteredProperties(properties)
            return
        }

        const filtered = properties.filter(p =>
            p.title.toLowerCase().includes(_query) ||
            p.description.toLowerCase().includes(_query) ||
            p.location.toLowerCase().includes(_query)
        );
        setFilteredProperties(filtered);
    };

    const filterPropertiesByCategory = (category: string) => {
        if (!category) {
            setFilteredProperties(properties)
        } else {
            const filtered = filteredProperties.filter(p => p.category == category)
            setFilteredProperties(filtered)
        }
    }


    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20">
            {
                filteredProperties.map(p => (
                    <PropertyCard key={p.title} title={p.title} image={p.image} description={p.description} location={p.location} price={p.price} rating={p.rating} time={p.time} />
                ))
            }
        </div>
    )
}
