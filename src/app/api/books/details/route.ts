import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const bookId = searchParams.get('bookId')

    if (!bookId) return NextResponse.error()

    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
        },
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
            ratings: {
                include: {
                    user: true,
                },
            },
        },
    })

    const booksAvgRating = await prisma.rating.groupBy({
        by: ['book_id'],
        where: {
            book_id: bookId,
        },
        _avg: {
            rate: true,
        },
    })

    const booksWithAvgRating = {
        ...book,
        avgRating: booksAvgRating[0]?._avg?.rate || 0,
    }

    return NextResponse.json({
        book: booksWithAvgRating,
    })
}
