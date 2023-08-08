import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)

    const bookId = searchParams.get('bookId')

    if (!bookId) return NextResponse.error()

    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 401 })

    try {
        const { description, rate } = await request.json()

        const userAlreadyRated = await prisma.rating.findFirst({
            where: {
                book_id: bookId,
                user_id: String(session.user.id),
            },
        })

        if (userAlreadyRated)
            return new Response('You already rated this book', { status: 400 })

        await prisma.rating.create({
            data: {
                description,
                rate,
                book_id: bookId,
                user_id: String(session.user.id),
            },
        })

        return new Response('Rating created', { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response('Bad request', { status: 400 })
    }
}
