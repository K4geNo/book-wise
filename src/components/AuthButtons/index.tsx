'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { PiRocketLaunch } from 'react-icons/pi'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface AuthButtonsProps {
    callbackUrl?: string
    canGuest?: boolean
}

export const AuthButtons = ({
    callbackUrl = '/',
    canGuest,
}: AuthButtonsProps) => {
    const router = useRouter()

    const handleSignIn = (provider?: string) => {
        if (!provider) {
            router.push(callbackUrl)
            return
        }

        signIn(provider, { callbackUrl })
    }

    return (
        <div className="flex flex-col gap-y-5">
            <button
                className="flex items-center gap-x-5 rounded-lg bg-gray-600 px-6 py-5 text-lg transition-colors hover:bg-gray-600/50"
                onClick={() => handleSignIn('google')}
            >
                <FcGoogle size={32} />
                Entrar com o Google
            </button>
            <button
                className="flex items-center gap-x-5 rounded-lg bg-gray-600 px-6 py-5 text-lg transition-colors hover:bg-gray-600/50"
                onClick={() => handleSignIn('github')}
            >
                <FaGithub size={32} />
                Entrar com o Github
            </button>
            {canGuest && (
                <button
                    className="flex items-center gap-x-5 rounded-lg bg-gray-600 px-6 py-5 text-lg transition-colors hover:bg-gray-600/50"
                    onClick={() => handleSignIn('github')}
                >
                    <PiRocketLaunch size={32} color="#8381D9" />
                    Entrar como visitante
                </button>
            )}
        </div>
    )
}
