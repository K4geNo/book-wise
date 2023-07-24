import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
            profile: (profile: GithubProfile) => {
                return {
                    id: profile.id,
                    name: profile.name!,
                    email: profile.email!,
                    image: profile.avatar_url,
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
}

const handler: NextAuthOptions = NextAuth(authOptions)

export { handler as GET, handler as POST }
