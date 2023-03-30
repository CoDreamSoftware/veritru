/* eslint-disable import/no-anonymous-default-export */
import { assetPrefix } from '@/next/next.config'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
// import { sendEmail } from '@/services/mailer'

export default async (req, res) => {
    await dbConnect()

    const {
        method,
        query: { id }
    } = req

    if (method === 'PUT') {

        const user = await User.findByIdAndUpdate(id, 
        {
            isApproved: true
        }, {
            new: true,
            runValidators: true,
        })

        if (!user) {
            res.status(404).json({ message: 'User not found!' })
            return
        }

        // const url = `${assetPrefix}`

        // // Send approval email
        // await sendEmail({
        //     to: user.email,
        //     subject: 'Registration as Reviewer Approved - Veritru App',
        //     html: `<h1>Your registration has been approved!</h1><p>Click <a href="${url}">here</a> to login.</p>`,
        // })

        res.status(200).json({ success: true, message: `User's Access Granted.` })
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed!' })
    }
}
