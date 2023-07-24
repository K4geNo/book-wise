import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const booksWithAvgRating = await prisma.$queryRaw`
        SELECT b.*, AVG(r.rate) as avgRating
        FROM books b
        LEFT JOIN ratings r ON b.id = r.book_id
        WHERE b.id IN (
            SELECT b2.id
            FROM books b2
            LEFT JOIN ratings r2 ON b2.id = r2.book_id
            GROUP BY b2.id
            ORDER BY COUNT(r2.id) DESC
            LIMIT 4
        )
        GROUP BY b.id
        ORDER BY avgRating DESC;
    `

    return NextResponse.json({ books: booksWithAvgRating })
}
