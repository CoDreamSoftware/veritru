import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import { compare } from 'bcryptjs'

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                await dbConnect()
                const { email, password } = credentials
                // Add logic here to look up the user from the credentials supplied
                const user = await User.findOne({ email })
                console.log(user)
                
                if (!user) {
                    throw new Error('Invalid email address.')
                }

                if (!user.isApproved) {
                    throw new Error('Invalid email address.')
                }

                const checkPassword = await compare(password, user.password)
                console.log(checkPassword)
                if (!checkPassword) {
                    throw new Error('Password doesnt match.')
                }

                return { id: user._id, email: user.email, isApproved: user.isApproved, isAdmin: user.isAdmin }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id
            if (user?.isAdmin) token.isAdmin = user.isAdmin
            return token
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: 'index',
        signOut: 'index',
    },
})
