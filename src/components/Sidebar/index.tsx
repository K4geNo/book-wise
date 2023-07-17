'use client'

import Image from 'next/image'
import { Navigation } from './Navigation'
import { PiSignIn, PiSignOut } from 'react-icons/pi'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const Sidebar = () => {
    const { data: session } = useSession()

    return (
        <aside className="flex h-full min-w-[232px] flex-col items-center justify-between rounded-xl bg-hero-navigation bg-cover bg-center bg-no-repeat pb-6 pt-10">
            <div className="flex flex-col items-center">
                <Image src="/images/logo.svg" width={128} height={32} alt="" />

                <Navigation />
            </div>

            <footer>
                {!session && (
                    <Link
                        href={'/login'}
                        className="flex items-center gap-x-3 font-bold"
                    >
                        Fazer login
                        <PiSignIn size={20} className="text-green-100" />
                    </Link>
                )}

                {session && (
                    <button
                        className="flex items-center gap-x-3"
                        onClick={() => signOut()}
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={session.user.avatar_url as string}
                                alt={session.user.name}
                            />
                            <AvatarFallback>
                                {session.user.name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-sm">{session.user.name}</span>

                        <PiSignOut size={20} className="text-red-500" />
                    </button>
                )}
            </footer>
        </aside>
    )
}
