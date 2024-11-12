export async function listingTypes() {
    return _listingTypes
}

export async function listings() {
    try {
        const response = await fetch(apiURL('listings/'))
        if (response.status !== 200) return null
        return response.json();
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function listing(id: number | string) {
    try {
        const response = await fetch(apiURL(`listings/${id}/`))
        if (response.status !== 200) return null
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function listingsByLocation(location: string) {
    try {
        const response = await fetch(apiURL(`listings/search/?query=${location}`))
        if (response.status !== 200) return null
        return response.json();
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createBooking(listing_id: string): Promise<number | null> {
    try {
        const response = await fetch(apiURL(`bookings/`), {
            method: "POST",
            body: JSON.stringify({ listing_id })
        })
        if (response.status !== 200) return null
        return response.json();
    } catch (error) {
        console.log(error)
        return null
    }
}

function apiURL(path: string): string {
    return `http://127.0.0.1:8000/api/${path}`
}

const _listingTypes: string[] = [
    "house",
    "cottage",
    "apartment",
    "villa",
    "loft",
    "studio",
    "garage",
    "office",
    "cabin"
]

