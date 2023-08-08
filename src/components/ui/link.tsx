import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import { VariantProps, cva } from 'class-variance-authority'

import { ComponentProps } from 'react'
import NextLink from 'next/link'
import { cn } from '@/utils/class-merge'

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

type LinkProps = ComponentProps<typeof NextLink> &
    VariantProps<typeof nextLinkProps> & {
        iconSide?: 'left' | 'right'
        color?: 'white' | 'purple'
        text: string
        withoutIcon?: boolean
    }

export function Link({
    iconSide = 'right',
    color,
    className,
    text,
    withoutIcon,
    ...props
}: LinkProps) {
    return (
        <NextLink
            className={cn(nextLinkProps({ iconSide, color, className }))}
            {...props}
        >
            {text}
            {!withoutIcon &&
                (iconSide === 'right' ? <PiCaretRight /> : <PiCaretLeft />)}
        </NextLink>
    )
}

type LinkButtonProps = ComponentProps<'button'> &
    VariantProps<typeof nextLinkProps> & {
        iconSide?: 'left' | 'right'
        color?: 'white' | 'purple'
        text: string
        onClick?: () => void
        withoutIcon?: boolean
    }

export function LinkButton({
    iconSide = 'right',
    color,
    className,
    text,
    onClick,
    withoutIcon,
    ...props
}: LinkButtonProps) {
    return (
        <button
            className={cn(nextLinkProps({ iconSide, color, className }))}
            onClick={onClick}
            {...props}
        >
            {text}
            {!withoutIcon &&
                (iconSide === 'right' ? <PiCaretRight /> : <PiCaretRight />)}
        </button>
    )
}
