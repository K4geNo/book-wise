import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

interface ActionIconProps extends ComponentProps<'button'> {
    icon: IconType
    iconColor?: string
}

export function ActionIcon({
    icon: Icon,
    iconColor = 'text-gray-500',
    ...props
}: ActionIconProps) {
    return (
        <button
            className="flex h-10 w-10 items-center justify-center rounded bg-gray-600 transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-600"
            {...props}
        >
            <Icon className={iconColor} size={24} />
        </button>
    )
}
