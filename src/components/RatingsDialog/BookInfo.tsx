import { IconType } from 'react-icons'
import { Heading, Text } from '../Typography'

interface BookInfoProps {
    icon: IconType
    title: string
    info: string
}

export const BookInfo = ({ icon: Icon, title, info }: BookInfoProps) => {
    return (
        <div className="flex items-center gap-4">
            <Icon className="h-6 w-6 text-green-100" />

            <div>
                <Text size="sm" color="gray300">
                    {title}
                </Text>
                <Heading size="sm" color="gray200">
                    {info}
                </Heading>
            </div>
        </div>
    )
}
