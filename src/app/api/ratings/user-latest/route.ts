import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Usuario não autorizado', { status: 401 })

    const latestUserRating = await prisma.rating.findFirst({
        where: {
            user_id: String(session.user.id),
        },
        orderBy: {
            created_at: 'desc',
        },
        include: {
            book: true,
        },
    })

    return NextResponse.json({ rating: latestUserRating })
}
