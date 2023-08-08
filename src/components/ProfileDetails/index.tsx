import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Heading, Text } from '../Typography'
import {
    PiBookOpen,
    PiBookmarkSimple,
    PiBooks,
    PiUserList,
} from 'react-icons/pi'

import { ProfileData } from '@/app/(root)/profile/[userId]/page'
import { ProfileDetailItem } from './ProfileDetailItem'

interface ProfileDetailsProps {
    profile: ProfileData
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
    return (
        <div className="flex h-max flex-col items-center border-l border-l-gray-700">
            <div className="flex flex-col items-center after:mt-10 after:block after:h-1 after:w-8 after:rounded-full after:bg-gradient-horizontal after:content-['']">
                <Avatar className="h-16 w-16">
                    <AvatarFallback>
                        {profile.user.name[0].toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={profile.user.avatar_url} />
                </Avatar>

                <Heading size="md" className="mt-5">
                    {profile.user.name}
                </Heading>

                <Text size="sm" color="gray400">
                    Membro desde sempre!
                </Text>
            </div>

            <div className="mt-[50px] flex flex-col gap-10">
                <ProfileDetailItem
                    icon={PiBookOpen}
                    info={profile.readPages}
                    label="Páginas lidas"
                />

                <ProfileDetailItem
                    icon={PiBooks}
                    info={profile.ratedBooks}
                    label="Livros avaliados"
                />

                <ProfileDetailItem
                    icon={PiUserList}
                    info={profile.readAuthors}
                    label="Autores lidos"
                />

                {profile.mostReadCategory && (
                    <ProfileDetailItem
                        icon={PiBookmarkSimple}
                        info={profile.mostReadCategory}
                        label="Categoria mais lida"
                    />
                )}
            </div>
        </div>
    )
}
