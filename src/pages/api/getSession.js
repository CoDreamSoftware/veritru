/* eslint-disable import/no-anonymous-default-export */
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        // Signed in
        res.send({ email: session.user.email })
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}
