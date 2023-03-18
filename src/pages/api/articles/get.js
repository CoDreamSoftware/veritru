/* eslint-disable import/no-anonymous-default-export */
import Article from '@/models/Article'
import dbConnect from '@/lib/dbConnect'

export default async (req, res) => {
    await dbConnect()

    try {
        const article = await Article.find({})
        if (!article) return res.status(400).json({ success: false, message: "Article does not exists" })
        return res.status(200).json(article)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}
