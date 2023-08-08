import { Book } from '@prisma/client'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Heading, Text } from '../Typography'
import { RatingStars } from '../RatingCard/RatingStars'
import { Badge } from '../ui/badge'
import { RatingsDialog } from '../RatingsDialog'

export interface BookWithAvgRating extends Book {
    avgRating: number
    alreadyRead: boolean
}

interface BookCardProps {
    book: BookWithAvgRating
    size?: 'md' | 'lg'
}

export const BookCard = ({ book, size = 'md' }: BookCardProps) => {
    const IMAGE_SIZES = {
        md: {
            width: 64,
            height: 94,
        },
        lg: {
            width: 108,
            height: 152,
        },
    }

    const currentSize = IMAGE_SIZES[size]

    return (
        <RatingsDialog bookId={book.id}>
            <Card className="relative flex cursor-pointer gap-5 overflow-hidden border border-gray-700 bg-gray-700 px-5 py-[18px] transition hover:border-gray-600">
                {book.alreadyRead && <Badge>LIDO</Badge>}

                <Image
                    src={book.cover_url}
                    width={currentSize.width}
                    height={currentSize.height}
                    alt={book.name}
                    className={`rounded object-cover min-w-[${currentSize.width}]`}
                />

                <CardContent className="flex flex-col justify-between p-0">
                    <div>
                        <Heading className="line-clamp-2" size="xs">
                            {book.name}
                        </Heading>
                        <Text size="sm" color="gray400">
                            {book.author}
                        </Text>
                    </div>

                    <RatingStars rating={book.avgRating} size="md" />
                </CardContent>
            </Card>
        </RatingsDialog>
    )
}
