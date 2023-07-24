import Image from 'next/image'
import { Navigation } from './Navigation'
import { PiSignIn } from 'react-icons/pi'
import Link from 'next/link'
import { getSession } from '@/utils/get-session'
import { SignOutButton } from './SignOutButton'

export const Sidebar = async () => {
    const session = await getSession()

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
                    <SignOutButton
                        name={session.user.name}
                        image={session.user.image as string}
                    />
                )}
            </footer>
        </aside>
    )
}
