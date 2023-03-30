import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export default async function userHandler(req, res) {
    await dbConnect()

    const {
        method,
        query: { id },
        body,
    } = req

    switch (method) {
        case 'GET': /* Get a model by its ID */
            try {
                const user = await User.findById(id)
                if (!user) return res.status(400).json({ success: false, message: "User does not exists" })
                return res.status(200).json(user)
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        case 'PUT': /* Edit a model by its ID */
            try {
                const user = await User.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true,
                })
                if (!user) return res.status(400).json({ success: false, message: "User does not exists" })
                return res.status(200).json(user)
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        case 'DELETE': /* Delete a model by its ID */
            try {
                const deletedUser = await User.deleteOne({ _id: id })
                if (!deletedUser) return res.status(400).json({ success: false, message: "User does not exists" })
                return res.status(200).json({ success: true, data: {} })
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        default:
            res.status(400).json({ success: false, message: "This method is not supported" })
    }
}