import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getSession() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    return session
}
