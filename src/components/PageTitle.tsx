import { HTMLAttributes } from 'react'
import { Heading } from './Typography'
import { IconType } from 'react-icons'
import { cn } from '@/utils/class-merge'

type PageTitleProps = HTMLAttributes<HTMLDivElement> & {
    icon: IconType
    title: string
    sizeIcon?: number
}

export const PageTitle = ({
    icon: Icon,
    title,
    className,
    sizeIcon = 32,
    ...props
}: PageTitleProps) => {
    return (
        <div className={cn('flex items-center gap-3', className)} {...props}>
            <Icon size={sizeIcon} className="text-green-100" />
            <Heading size="lg">{title}</Heading>
        </div>
    )
}
