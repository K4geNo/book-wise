'use client'

import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import { useMemo, useState } from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { Input } from '../ui/input'
import { Link } from '../ui/link'
import { PageTitle } from '../PageTitle'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { ProfileRatingCard } from './ProfileRatingCard'
import { Text } from '../Typography'

export interface ProfileRating extends Rating {
    book: Book & {
        categories: CategoriesOnBooks &
            {
                category: Category
            }[]
    }
}

interface ProfileRatingsProps {
    ratings: ProfileRating[]
    isOwnProfile: boolean
}

export function ProfileRatings({ ratings, isOwnProfile }: ProfileRatingsProps) {
    const [search, setSearch] = useState('')

    const filteredRatings = useMemo(() => {
        return ratings.filter((rating) => {
            return rating.book.name.toLowerCase().includes(search.toLowerCase())
        })
    }, [ratings, search])

    return (
        <div className="scrollbar-hidden flex h-full w-full flex-col overflow-y-auto pb-10">
            {isOwnProfile && (
                <PageTitle title="Perfil" icon={AiOutlineUser} sizeIcon={25} />
            )}

            {!isOwnProfile && (
                <Link
                    href={'/'}
                    text="Voltar"
                    iconSide="left"
                    color="white"
                    className="self-start"
                />
            )}

            <Input
                placeholder="Buscar livro avaliado"
                icon={<PiMagnifyingGlass size={20} />}
                value={search}
                className="mb-8 mt-10"
                onChange={({ target }) => setSearch(target.value)}
            />

            <div className="flex flex-col gap-6">
                {filteredRatings.map((rating) => (
                    <ProfileRatingCard key={rating.id} rating={rating} />
                ))}

                {filteredRatings.length <= 0 && (
                    <Text size="sm" color="gray400" className="text-center">
                        {search && 'Nenhum livro encontrado'}
                        {!search && 'Nenhuma avaliação encontrada'}
                    </Text>
                )}
            </div>
        </div>
    )
}
