import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const categoryId = searchParams.get('category') || undefined

    const books = await prisma.book.findMany({
        where: {
            categories: {
                some: {
                    categoryId,
                },
            },
        },
        include: {
            ratings: true,
        },
    })

    const booksAvgRating = await prisma.rating.groupBy({
        by: ['book_id'],
        _avg: {
            rate: true,
        },
    })

    let userBooksIds: string[] = []

    const session = await getServerSession(authOptions)

    if (session) {
        const userBooks = await prisma.book.findMany({
            where: {
                ratings: {
                    some: {
                        user_id: String(session.user.id),
                    },
                },
            },
        })

        userBooksIds = userBooks.map((book) => book.id)
    }

    const booksWithAvgRating = books.map((book) => {
        const bookAvgRating = booksAvgRating.find(
            (bookAvgRating) => bookAvgRating.book_id === book.id,
        )

        const { ratings, ...bookInfo } = book

        return {
            ...bookInfo,
            ratings: ratings.length,
            avgRating: bookAvgRating?._avg?.rate || 0,
            alreadyRead: userBooksIds.includes(book.id),
        }
    })

    return NextResponse.json({
        books: booksWithAvgRating,
    })
}
