import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const ratings = await prisma.rating.findMany({
        orderBy: {
            created_at: 'desc',
        },
        include: {
            user: true,
            book: true,
        },
        take: 10,
    })

    return NextResponse.json({ ratings })
}
