'use client'

import { cn } from '@/utils/class-merge'
import { VariantProps, cva } from 'class-variance-authority'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'
import { PiCaretRight } from 'react-icons/pi'

export const nextLinkProps = cva(
    'flex items-center font-bold gap-2 py-2 px-3 rounded transition',
    {
        variants: {
            iconSide: {
                left: 'flex-row-reverse',
                right: 'flex-row',
            },
            color: {
                white: 'text-gray-200 hover:bg-[#E6E8F20A]',
                purple: 'text-purple-100 hover:bg-[#8381D90F]',
            },
        },
        defaultVariants: {
            color: 'purple',
        },
    },
)

type LinkProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof nextLinkProps> & {
        iconSide?: 'left' | 'right'
        color?: 'white' | 'purple'
        text: string
        href?: string
        onClick?: () => void
        withoutIcon?: boolean
    }

export const Link = ({
    iconSide = 'right',
    color,
    className,
    text,
    href,
    onClick,
    withoutIcon,
    ...props
}: LinkProps) => {
    const router = useRouter()

    const isHref = () => {
        if (href) return router.push(href)

        return onClick
    }

    return (
        <button
            className={cn(nextLinkProps({ iconSide, color, className }))}
            onClick={isHref}
            {...props}
        >
            {text}
            {!withoutIcon &&
                (iconSide === 'right' ? <PiCaretRight /> : <PiCaretRight />)}
        </button>
    )
}
