import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/class-merge'
import { HTMLAttributes, ReactNode } from 'react'

export const textVariants = cva('leading-[160%]', {
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
        color: {
            gray100: 'text-gray-100',
            gray200: 'text-gray-200',
            gray300: 'text-gray-300',
            gray400: 'text-gray-400',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'gray100',
    },
})

type TextProps = VariantProps<typeof textVariants> &
    HTMLAttributes<HTMLParagraphElement> & {
        size?: 'sm' | 'md' | 'lg'
        color?: 'gray100' | 'gray200' | 'gray300' | 'gray400'
        children: ReactNode
    }

/**
 * Renders a text element with customizable size and color.
 * @param className - Additional class name(s) for the component.
 * @param size - The size variant of the text element. Can be 'sm', 'md', or 'lg'.
 * @param color - The color variant of the text element. Can be 'gray100', 'gray200', 'gray300', or 'gray400'.
 * @param children - The content to be displayed inside the text element.
 * @returns A React component that renders a text element.
 */
export const Text = ({ className, size, color, children }: TextProps) => {
    return (
        <p className={cn(textVariants({ size, color, className }))}>
            {children}
        </p>
    )
}

export const headingVariants = cva('leading-[140%] font-bold', {
    variants: {
        size: {
            xs: 'text-base',
            sm: 'text-lg',
            md: 'text-xl',
            lg: 'text-2xl',
        },
        color: {
            gray100: 'text-gray-100',
            gray200: 'text-gray-200',
            gray300: 'text-gray-300',
            gray400: 'text-gray-400',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'gray100',
    },
})

type HeadingProps = VariantProps<typeof headingVariants> &
    HTMLAttributes<HTMLHeadingElement> & {
        children: ReactNode
        size?: 'xs' | 'sm' | 'md' | 'lg'
        color?: 'gray100' | 'gray200' | 'gray300' | 'gray400'
    }

/**
 * Renders a heading element with customizable size and color.
 * @param className - Additional class name(s) for the component.
 * @param size - The size variant of the heading element. Can be 'xs', 'sm', 'md', or 'lg'.
 * @param color - The color variant of the heading element. Can be 'gray100', 'gray200', 'gray300', or 'gray400'.
 * @param children - The content to be displayed inside the heading element.
 * @returns A React component that renders a heading element.
 */
export const Heading = ({ className, children, size, color }: HeadingProps) => {
    return (
        <h1 className={cn(headingVariants({ size, color, className }))}>
            {children}
        </h1>
    )
}
