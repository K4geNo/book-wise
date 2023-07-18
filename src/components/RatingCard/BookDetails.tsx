'use client'

import { useToggleShowMore } from '@/hooks/useToggleShowMore'
import { RatingWithAuthorAndBook } from '.'
import Image from 'next/image'
import { Heading, Text } from '../Typography'
import Link from 'next/link'

interface BookDetailsProps {
    rating: RatingWithAuthorAndBook
}

export const BookDetails = ({ rating }: BookDetailsProps) => {
    const MAX_SUMMARY_LENGTH = 180

    const {
        text: bookSummary,
        isShowMore,
        toggleShowMore,
    } = useToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGTH)

    return (
        <>
            <Link href={`/explorer?book=${rating.book.id}`}>
                <Image
                    src={rating.book.cover_url}
                    width={108}
                    height={152}
                    alt={rating.book.name}
                    className="min-w-[108px] rounded object-cover transition hover:brightness-[1.2]"
                />
            </Link>

            <div className="flex flex-col gap-y-5">
                <div>
                    <Heading size="xs">{rating.book.name}</Heading>
                    <Text size="sm" color="gray400">
                        {rating.book.author}
                    </Text>
                </div>

                <Text size="sm" color="gray300">
                    {bookSummary}
                    {rating.book.summary.length > MAX_SUMMARY_LENGTH && (
                        <button
                            className="ml-1 text-sm font-bold text-purple-100"
                            onClick={toggleShowMore}
                        >
                            {isShowMore ? 'Ver menos' : 'Ver mais'}
                        </button>
                    )}
                </Text>
            </div>
        </>
    )
}
