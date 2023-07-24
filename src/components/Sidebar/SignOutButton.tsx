'use client'

import { signOut } from 'next-auth/react'
import { PiSignOut } from 'react-icons/pi'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface SignOutButtonProps {
    name: string
    image: string
}

export const SignOutButton = ({ image, name }: SignOutButtonProps) => {
    return (
        <button className="flex items-center gap-x-3" onClick={() => signOut()}>
            <Avatar className="h-8 w-8">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            <span className="text-sm">{name}</span>

            <PiSignOut size={20} className="text-red-500" />
        </button>
    )
}
