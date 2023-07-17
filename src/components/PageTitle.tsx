import { IconType } from 'react-icons'
import { Heading } from './Typography'
import { cn } from '@/utils/class-merge'
import { HTMLAttributes } from 'react'

type PageTitleProps = HTMLAttributes<HTMLDivElement> & {
    icon: IconType
    title: string
}

export const PageTitle = ({
    icon: Icon,
    title,
    className,
    ...props
}: PageTitleProps) => {
    return (
        <div className={cn('flex items-center gap-3', className)} {...props}>
            <Icon size={32} className="text-green-100" />
            <Heading size="lg">{title}</Heading>
        </div>
    )
}
