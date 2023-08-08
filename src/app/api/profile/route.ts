import { NextResponse } from 'next/server'
import { getMostFrequentString } from '@/utils/get-most-frequent-string'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.error()

    const profile = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            ratings: {
                include: {
                    book: {
                        include: {
                            categories: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            },
        },
    })

    const readPages = profile?.ratings.reduce(
        (acc, rating) => acc + rating.book.total_pages,
        0,
    )

    const ratedBooks = profile?.ratings.length

    const readAuthors = profile?.ratings.reduce((acc, rating) => {
        if (!acc.includes(rating.book.author)) {
            acc.push(rating.book.author)
        }
        return acc
    }, [] as string[])

    const categories = profile?.ratings.flatMap((rating) =>
        rating.book.categories.flatMap((category) => category.category.name),
    )

    const mostReadCategory = categories
        ? getMostFrequentString(categories)
        : null

    const profileData = {
        user: {
            avatar_url: profile?.image,
            name: profile?.name,
        },
        ratings: profile?.ratings,
        readPages,
        ratedBooks,
        readAuthors: readAuthors?.length,
        mostReadCategory,
    }

    return NextResponse.json({ profile: profileData })
}
