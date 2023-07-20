'use client'

import { PiChartLineUp } from 'react-icons/pi'
import { PageTitle } from '../PageTitle'
import { Text } from '../Typography'
import { RatingCard, RatingWithAuthorAndBook } from '../RatingCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const LatestRatings = () => {
    const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
        ['latest-ratings'],
        async () => {
            const { data } = await api.get('/ratings/latest')

            return data?.ratings ?? []
        },
    )

    return (
        <div className="scrollbar-hidden flex h-full w-full flex-col overflow-y-auto">
            <PageTitle icon={PiChartLineUp} title="Início" className="mb-10" />

            <Text size="sm">Avaliações mais recentes</Text>

            <section className="mt-4 flex flex-col gap-y-3">
                {ratings?.map((rating) => (
                    <RatingCard key={rating.id} rating={rating} />
                ))}
            </section>
        </div>
    )
}
