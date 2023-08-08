import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { LucideProps, Star } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'

export const ratingStarsVariants = cva('text-purple-100 box-border', {
    variants: {
        size: {
            sm: 'w-[14px] h-[14px] py-0 px-0.5',
            md: 'w-5 h-5 py-0 px-[3px]',
            lg: 'w-6 h-6 py-0 px-0.5',
        },
    },
})

type RatingStarsProps = VariantProps<typeof ratingStarsVariants> &
    HTMLAttributes<LucideProps> & {
        size?: 'sm' | 'md' | 'lg'
        rating: number
        setRating?: (rating: number) => void
    }

export const RatingStars = ({
    size,
    rating,
    className,
    setRating,
}: RatingStarsProps) => {
    const [previewValue, setPreviewValue] = useState(0)

    const isEditable = !!setRating

    const ratingValue = isEditable ? previewValue : rating

    const handleMouseEnter = (value: number) => {
        if (isEditable) setPreviewValue(value)
    }

    const handleMouseLeave = () => {
        if (isEditable) setPreviewValue(rating)
    }

    const handleSetRating = () => {
        if (isEditable) setRating(previewValue)
    }

    return (
        <div
            className={cn('flex items-center', isEditable && 'cursor-pointer')}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={`star-${index}`}
                    className={cn(ratingStarsVariants({ size, className }))}
                    fill={index + 1 <= ratingValue ? 'currentColor' : 'none'}
                    onMouseEnter={() => handleMouseEnter(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleSetRating}
                />
            ))}
        </div>
    )
}
