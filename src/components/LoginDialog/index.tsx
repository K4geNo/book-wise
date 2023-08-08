import { ReactNode } from 'react'
import { Heading } from '../Typography'
import { AuthButtons } from '../AuthButtons'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface LoginDialogProps {
    children: ReactNode
}

export function LoginDialog({ children }: LoginDialogProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <Dialog.Content className="fixed left-1/2 top-1/2 w-[516px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-gray-700 px-[72px] py-14 shadow-[4px,16px,24px,0px,#00000040]">
                    <Dialog.Close className="absolute right-4 top-4 flex items-center justify-center text-gray-400">
                        <X size={24} />
                    </Dialog.Close>

                    <div className="mx-auto my-0 max-w-[372px] text-center">
                        <Heading size="xs" color="gray200" className="mb-10">
                            Faça login para deixar sua avaliação
                        </Heading>

                        <AuthButtons />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
