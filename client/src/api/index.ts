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

export async function createBooking(
    access: string,
    listing_id: string,
    email: string,
    adults: number,
    children: number,
    special_requests: string,
    check_in: string,
    check_out: string
): Promise<any | number> {
    try {
        const response = await fetch(apiURL(`bookings/create/`), {
            method: "POST",
            body: JSON.stringify({
                listing_id,
                adults,
                children,
                email,
                special_requests,
                check_in,
                check_out
            }),
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 401) return 1
        if (response.status !== 200) return 0
        return response.json();
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function bookings(access: string): Promise<any | number> {
    try {
        const response = await fetch(apiURL('bookings/'), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        if (response.status === 401) return 1
        if (response.status !== 200) return 0
        return response.json();
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function getTokenPair(username: string, password: string): Promise<{ access: string, refresh: string } | null> {
    try {
        const response = await fetch(apiURL('token/'), {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status != 200) return null
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createUser(username: string, password: string): Promise<any | null> {
    try {
        let response = await fetch(apiURL('users/'), {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status != 200) return null
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function cancelBooking(access: string, id: string): Promise<number | null> {
    try {
        const response = await fetch(apiURL(`bookings/${id}/cancel/`), {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        if (response.status === 401) return 1;
        if (response.status !== 200) return 0;
        return -1
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

