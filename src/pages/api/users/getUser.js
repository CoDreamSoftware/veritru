/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export default async (req, res) => {
    await dbConnect()

    const {
        method,
        query: { email }
    } = req


    if (method === 'GET') {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ success: false, message: "User does not exists" })
        return res.status(200).json(user)
    } else {
        return res.status(405).json({ success: false, message: error.message })
    }
}