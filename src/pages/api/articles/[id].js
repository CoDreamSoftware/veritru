import dbConnect from '@/lib/dbConnect'
import Article from '@/models/Article'

export default async function articlesHandler(req, res) {
    const {
        method,
        query: { id },
        body,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET': /* Get a model by its ID */
            try {
                const article = await Article.findById(id)
                if (!article) return res.status(400).json({ success: false, message: "Article does not exists" })
                return res.status(200).json({ success: true, data: article })
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        case 'PUT': /* Edit a model by its ID */
            try {
                const article = await Article.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true,
                })
                if (!article) return res.status(400).json({ success: false, message: "Article does not exists" })
                return res.status(200).json({ success: true, data: article })
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        case 'DELETE': /* Delete a model by its ID */
            try {
                const deletedArticle = await Article.deleteOne({ _id: id })
                if (!deletedArticle) return res.status(400).json({ success: false, message: "Article does not exists" })
                return res.status(200).json({ success: true, data: {} })
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        default:
            res.status(400).json({ success: false, message: "This method is not supported" })
    }
}