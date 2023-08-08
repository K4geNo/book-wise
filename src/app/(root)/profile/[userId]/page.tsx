'use client'

import { ProfileRating, ProfileRatings } from '@/components/ProfileRatings'

import { ProfileDetails } from '@/components/ProfileDetails'
import { fetchProfile } from '@/lib/api/fetchProfile'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

interface ProfilePageParams {
    params: {
        userId: string
    }
}

export interface ProfileData {
    user: {
        avatar_url: string
        name: string
    }
    ratings: ProfileRating[]
    readPages: number
    ratedBooks: number
    readAuthors: number
    mostReadCategory?: string
}

export default function ProfilePage({ params }: ProfilePageParams) {
    const { data: profile } = useQuery<ProfileData>(
        ['profile', params.userId],
        () => fetchProfile(params.userId),
        {
            enabled: !!params.userId,
        },
    )

    const { data: session } = useSession()

    const isOwnProfile = session?.user?.id === params.userId

    return (
        <main className="grid h-full w-full grid-cols-[1fr,308px] gap-x-16 overflow-hidden">
            {profile && (
                <>
                    <ProfileRatings
                        isOwnProfile={isOwnProfile}
                        ratings={profile.ratings}
                    />
                    <ProfileDetails profile={profile} />
                </>
            )}

            {!profile && <h1>carregando</h1>}
        </main>
    )
}
