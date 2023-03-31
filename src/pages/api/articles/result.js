/* eslint-disable import/no-anonymous-default-export */
import Article from '@/models/Article'
import dbConnect from '@/lib/dbConnect'

export default async (req, res) => {
    await dbConnect()

    const {
        method,
        query: { id },
        body,
    } = req

    if (method === 'PUT') {
        const { result } = body

        const article = await Article.findByIdAndUpdate(id, 
        {
            result: result
        }, {
            new: true,
            runValidators: true,
        })

        if (!article) {
            res.status(404).json({ message: 'Article not found!' })
            return
        }

        res.status(200).json({ success: true, message: `Article's Outcome Updated!` })
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed!' })
    }
}
