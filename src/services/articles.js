// POST method that adds a new entry in mongodb
export async function createArticle(FormData) {
    try {
        const res = await fetch('http://localhost:3000/api/articles/create', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(FormData),
        })
        const data = res.json()
        return data
    } catch (error) {
        console.log('Error adding article => ' + error)
    }
}

// GET method that fetches all entries from mongodb
export async function getArticles() {
    const res = await fetch('http://localhost:3000/api/articles/get', {
        method: 'GET',
    })
    const data = res.json()
    return data
}