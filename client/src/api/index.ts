export async function fetchCategories() {
    try {
        const response = await fetch('http://127.0.0.1:3000/categories');
        const data = await response.json();
        return data
    } catch (error) {
        return null
    }
}

export async function fetchProperties() {
    try {
        const response = await fetch('http://127.0.0.1:3000/properties');
        const data = await response.json();
        return data
    } catch (error) {
        return null
    }
}

