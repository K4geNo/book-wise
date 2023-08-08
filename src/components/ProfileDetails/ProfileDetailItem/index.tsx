import { Heading, Text } from '@/components/Typography'

import { IconType } from 'react-icons'

interface ProfileDetailItemProps {
    icon: IconType
    info: string | number
    label: string
}

export function ProfileDetailItem({
    icon: Icon,
    info,
    label,
}: ProfileDetailItemProps) {
    return (
        <div className="flex gap-5">
            <Icon className="text-green-100" size={32} />
            <div>
                <Heading size="xs" color="gray200">
                    {info}
                </Heading>
                <Text size="sm" color="gray300">
                    {label}
                </Text>
            </div>
        </div>
    )
}
