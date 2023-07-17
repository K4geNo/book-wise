import { PrismaAdapter } from '@/lib/auth/prismaAdapter'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, {
        adapter: PrismaAdapter(req, res),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID ?? '',
                clientSecret: process.env.GITHUB_SECRET ?? '',
                profile: (profile: GithubProfile) => {
                    return {
                        id: profile.id,
                        name: profile.name!,
                        email: profile.email!,
                        avatar_url: profile.avatar_url,
                    }
                },
            }),
        ],
        callbacks: {
            async session({ session, user }) {
                return {
                    ...session,
                    user,
                }
            },
        },
        pages: {
            signIn: '/login',
        },
    })
}

export { auth as GET, auth as POST }
