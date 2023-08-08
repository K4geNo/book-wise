import { cn } from '@/utils/class-merge'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export const tagVariants = cva(
    'rounded-full border border-solid border-purple-100 bg-none px-4 py-1 text-purple-100 transition hover:bg-purple-200 hover:text-gray-100',
    {
        variants: {
            active: {
                true: 'text-gray-100 bg-purple-200 border-purple-200',
            },
        },
    },
)

type TagProps = VariantProps<typeof tagVariants> &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        active?: boolean
        children: ReactNode
    }

/**
 * Renders a tag with customizable styles and an optional active state.
 * @param active - Whether the tag is active or not.
 * @param className - Additional classes to apply to the tag.
 * @param children - The content to display inside the tag.
 * @param props - Additional props to apply to the tag.
 * @returns A React button element representing the tag.
 */
export const Tag = ({ active, className, children, ...props }: TagProps) => {
    return (
        <button className={cn(tagVariants({ active, className }))} {...props}>
            {children}
        </button>
    )
}
