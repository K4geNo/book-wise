'use client'

import { RatingCard, RatingWithAuthorAndBook } from '../RatingCard'

import { Link } from '../ui/link'
import { PageTitle } from '../PageTitle'
import { PiChartLineUp } from 'react-icons/pi'
import { Text } from '../Typography'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const LatestRatings = () => {
    const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
        ['latest-ratings'],
        async () => {
            const { data } = await api.get('/ratings/latest')

            return data?.ratings ?? []
        },
    )

    const { data: session } = useSession()

    const userId = session?.user?.id

    const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>(
        ['latest-user-rating', userId],
        async () => {
            const { data } = await api.get(`/ratings/user-latest`)

            return data?.rating ?? null
        },
        {
            enabled: !!userId,
        },
    )

    return (
        <div className="scrollbar-hidden flex h-full w-full flex-col overflow-y-auto">
            <PageTitle icon={PiChartLineUp} title="Início" className="mb-10" />

            {latestUserRating && (
                <div className="mb-10 flex flex-col">
                    <header className="mb-4 flex items-center justify-between gap-4">
                        <Text size="sm">Sua última avaliação</Text>
                        <Link text="Ver todas" href={`/profile/${userId}`} />
                    </header>

                    <RatingCard rating={latestUserRating} variant="compact" />
                </div>
            )}

            <Text size="sm">Avaliações mais recentes</Text>

            <section className="mt-4 flex flex-col gap-y-3">
                {ratings?.map((rating) => (
                    <RatingCard key={rating.id} rating={rating} />
                ))}
            </section>
        </div>
    )
}
