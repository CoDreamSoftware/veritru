// POST method that adds a new entry in mongodb
export const createArticle = async (FormData) => {
    try {
        const res = await fetch('/api/articles', {
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