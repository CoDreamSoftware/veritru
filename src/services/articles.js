import { assetPrefix } from '@/next/next.config'

// POST method that adds a new entry in mongodb
export async function createArticle(FormData) {
    try {
        const res = await fetch(`${assetPrefix}/api/articles/create`, {
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
    const res = await fetch(`${assetPrefix}/api/articles/get`)
    const data = await res.json()
    return data
}