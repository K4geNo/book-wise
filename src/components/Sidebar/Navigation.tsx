'use client'

import { cn } from '@/utils/class-merge'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { PiBinoculars, PiChartLineUpLight, PiUser } from 'react-icons/pi'

const NAV_ITEMS = [
    {
        label: 'Início',
        href: '/',
        icon: PiChartLineUpLight,
    },
    {
        label: 'Explorar',
        href: '/explorer',
        icon: PiBinoculars,
    },
]

export const Navigation = () => {
    const pathname = usePathname()

    const { data: session } = useSession()

    const navItems = useMemo(() => {
        if (session) {
            return NAV_ITEMS.concat({
                label: 'Perfil',
                href: `/profile/${session.user.id}`,
                icon: PiUser,
            })
        }

        return NAV_ITEMS
    }, [session])

    return (
        <nav className="mt-16 flex flex-col gap-y-7">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'relative flex items-center gap-x-3 text-gray-400 transition-all hover:text-gray-100',
                        'mr-4 before:h-6 before:w-1 before:bg-gradient-vertical before:opacity-0 before:content-[""]',
                        pathname === item.href &&
                            'text-gray-100 before:opacity-100',
                    )}
                >
                    <item.icon size={24} />
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}
