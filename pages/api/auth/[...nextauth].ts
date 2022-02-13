import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    if (
        (req.method === 'GET' && req.query.nextauth.includes('signin')) ||
        req.query.nextauth.includes('login') ||
        req.query.nextauth.includes('signup')
    ) {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized request',
        })
        return
    }

    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.G_CLIENT_ID,
                clientSecret: process.env.G_CLIENT_SECRET,
            }),
        ],
    })
}
