'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Heading } from '../Typography'
import { RatingStars } from '../RatingCard/RatingStars'
import { FormEvent, useState } from 'react'
import { TextArea } from '../ui/textarea'
import { ActionIcon } from '../ui/action-icon'
import { PiX } from 'react-icons/pi'
import { FaCheck } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface RatingFormProps {
    onCancel: () => void
    bookId: string
}

export const RatingForm = ({ onCancel, bookId }: RatingFormProps) => {
    const { data: session } = useSession()

    const user = session?.user

    const [currentRate, setCurrentRate] = useState(0)
    const [description, setDescription] = useState('')

    const submitDisabled = !currentRate || !description.trim()

    const queryClient = useQueryClient()

    const { mutateAsync: handleRate } = useMutation(
        async () => {
            await api.post(`/books/rate?bookId=${bookId}`, {
                description,
                rate: currentRate,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['book', bookId])
                queryClient.invalidateQueries(['books'])
                onCancel()
            },
        },
    )

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (submitDisabled) return

        await handleRate()
    }

    return (
        <div className="rounded-md bg-gray-700 p-6">
            {user && (
                <div className="flex items-center justify-between">
                    <section className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>
                                {user.name?.[0].toUpperCase()}
                            </AvatarFallback>
                            <AvatarImage src={user.image} />
                        </Avatar>

                        <Heading size="xs">{user.name}</Heading>
                    </section>
                    <RatingStars
                        size="lg"
                        rating={currentRate}
                        setRating={setCurrentRate}
                    />
                </div>
            )}

            <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                <TextArea
                    placeholder="Escreva sua avaliação"
                    maxLength={450}
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <div className="flex items-center justify-end gap-2">
                    <ActionIcon
                        icon={PiX}
                        type="button"
                        onClick={onCancel}
                        iconColor="text-purple-100"
                    />
                    <ActionIcon
                        icon={FaCheck}
                        type="submit"
                        iconColor="text-green-100"
                        disabled={submitDisabled}
                    />
                </div>
            </form>
        </div>
    )
}
