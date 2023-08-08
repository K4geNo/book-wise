'use client'

import { cn } from '@/utils/class-merge'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Heading, Text } from '../Typography'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { Rating, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { RatingStars } from '../RatingCard/RatingStars'

export type RatingWithAuthor = Rating & {
    user: User
}

type UserRatingCardProps = {
    rating: RatingWithAuthor
}

export function UserRatingCard({ rating }: UserRatingCardProps) {
    const { data: session } = useSession()

    const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

    const isOwner = session?.user?.id === rating.user.id

    return (
        <div
            className={cn(
                'rounded-[8px] p-6',
                isOwner ? 'bg-gray-600' : 'bg-gray-700',
            )}
        >
            <div className="mb-5 flex items-start justify-between">
                <section className="flex gap-4">
                    <Link href={`/profile/${rating.user_id}`}>
                        <Avatar>
                            <AvatarFallback>
                                {rating.user.name &&
                                    rating.user.name[0].toUpperCase()}
                            </AvatarFallback>

                            <AvatarImage
                                src={rating?.user?.image ?? ''}
                                alt={rating?.user?.name ?? ''}
                            />
                        </Avatar>
                    </Link>

                    <div>
                        <Heading size="xs">{rating.user.name}</Heading>
                        <Text size="sm" color="gray400">
                            {distance}
                        </Text>
                    </div>
                </section>

                <RatingStars rating={rating.rate} size="md" />
            </div>

            <Text size="sm" color="gray300">
                {rating.description}
            </Text>
        </div>
    )
}
