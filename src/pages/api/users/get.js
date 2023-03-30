/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export default async (req, res) => {
    await dbConnect()

    try {
        const user = await User.find({})
        if (!user) return res.status(400).json({ success: false, message: "User does not exists" })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}
