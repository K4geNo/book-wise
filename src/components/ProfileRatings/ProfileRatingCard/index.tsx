'use client'

import { Heading, Text } from '@/components/Typography'

import Image from 'next/image'
import Link from 'next/link'
import { ProfileRating } from '..'
import { RatingStars } from '@/components/RatingCard/RatingStars'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'

interface ProfileRatingCardProps {
    rating: ProfileRating
}

export function ProfileRatingCard({ rating }: ProfileRatingCardProps) {
    const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

    return (
        // container
        <div className="flex flex-col gap-2">
            <Text size="sm" color="gray300">
                {distance}
            </Text>

            {/* card content */}
            <div className="flex flex-col gap-6 rounded-[8px] bg-gray-700 p-6">
                {/* book details */}
                <div className="flex gap-6">
                    <Link
                        href={`/explorer?book=${rating.book.id}`}
                        className="flex"
                    >
                        <Image
                            src={rating.book.cover_url}
                            width={98}
                            height={134}
                            alt={`Capa do livro ${rating.book.name}`}
                            className="min-w-[98px] rounded object-cover transition hover:brightness-[1.2]"
                        />
                    </Link>
                    <section className="flex flex-col justify-between">
                        <div>
                            <Heading size="sm">{rating.book.name}</Heading>
                            <Text size="sm" color="gray400">
                                {rating.book.author}
                            </Text>
                        </div>

                        <RatingStars rating={rating.rate} size="md" />
                    </section>
                </div>

                <Text size="sm" color="gray300">
                    {rating.description}
                </Text>
            </div>
        </div>
    )
}
