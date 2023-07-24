import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Book, Rating, User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Text } from '../Typography'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { RatingStars } from './RatingStars'
import { BookDetails } from './BookDetails'

export interface RatingWithAuthorAndBook extends Rating {
    user: User
    book: Book
}

interface RatingCardProps {
    rating: RatingWithAuthorAndBook
}

export const RatingCard = ({ rating }: RatingCardProps) => {
    const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

    return (
        <Card className="w-full border-none bg-gray-700">
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

            <CardContent className="flex gap-x-5">
                <BookDetails rating={rating} />
            </CardContent>
        </Card>
    )
}
