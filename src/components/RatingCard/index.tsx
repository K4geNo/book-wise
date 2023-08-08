import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Book, Rating, User } from '@prisma/client'
import { Card, CardContent, CardHeader } from '../ui/card'

import { BookDetails } from './BookDetails'
import Link from 'next/link'
import { RatingStars } from './RatingStars'
import { Text } from '../Typography'
import { cn } from '@/lib/utils'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'

export interface RatingWithAuthorAndBook extends Rating {
    user: User
    book: Book
}

interface RatingCardProps {
    rating: RatingWithAuthorAndBook
    variant?: 'default' | 'compact'
}

export const RatingCard = ({
    rating,
    variant = 'default',
}: RatingCardProps) => {
    const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

    return (
        <Card className="w-full border-none bg-gray-700">
            {variant === 'default' && (
                <CardHeader className="mb-4 w-full">
                    <section className="flex items-center gap-4">
                        <Link href={`/profile/${rating.user.id}`}>
                            <Avatar>
                                <AvatarImage src={rating.user.image ?? ''} />
                                <AvatarFallback>
                                    {rating.user.name &&
                                        rating.user.name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div>
                            <Text>{rating.user.name}</Text>
                            <Text size="sm" color="gray400">
                                {distance}
                            </Text>
                        </div>
                    </section>

                    <RatingStars rating={rating.rate} size="md" />
                </CardHeader>
            )}

            <CardContent
                className={cn('flex gap-x-5', variant === 'compact' && 'pt-6')}
            >
                <BookDetails rating={rating} />
            </CardContent>
        </Card>
    )
}
