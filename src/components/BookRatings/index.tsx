'use client'

import { useState } from 'react'
import { Text } from '../Typography'
import { RatingWithAuthor, UserRatingCard } from '../UserRatingCard'
import { LinkButton } from '../ui/link'
import { RatingForm } from '../RatingForm'
import { useSession } from 'next-auth/react'
import { LoginDialog } from '../LoginDialog'

interface BookRatingsProps {
    ratings: RatingWithAuthor[]
    bookId: string
}

export const BookRatings = ({ ratings, bookId }: BookRatingsProps) => {
    const { data: session, status } = useSession()

    const [showForm, setShowForm] = useState(false)

    const isAuthenticated = status === 'authenticated'

    const handleRate = () => {
        if (!isAuthenticated) return
        setShowForm(true)
    }

    const sortedRatingsByDate = ratings.sort((a, b) => {
        return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
    })

    const canRate = ratings.every(
        (rating) => rating.user_id !== session?.user.id,
    )

    return (
        <section className="mt-10 flex flex-col">
            <header className="mb-4 flex items-center justify-between">
                <Text>Avaliações</Text>
                {canRate && (
                    <LoginDialog>
                        <LinkButton
                            text="Avaliar"
                            withoutIcon
                            onClick={handleRate}
                        />
                    </LoginDialog>
                )}
            </header>

            <section className="flex flex-col gap-3">
                {showForm && (
                    <RatingForm
                        bookId={bookId}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                {sortedRatingsByDate.map((rating) => (
                    <UserRatingCard key={rating.id} rating={rating} />
                ))}
            </section>
        </section>
    )
}
