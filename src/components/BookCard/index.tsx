import { Book } from '@prisma/client'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Heading, Text } from '../Typography'
import { RatingStars } from '../RatingCard/RatingStars'

export interface BookWithAvgRating extends Book {
    avgRating: number
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
        <Card className="flex cursor-pointer gap-5 border border-gray-700 bg-gray-700 px-5 py-[18px] transition hover:border-gray-600">
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
    )
}
