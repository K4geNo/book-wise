import { AuthButtons } from '@/components/AuthButtons'
import { Heading, Text } from '@/components/Typography'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <section className="grid h-full grid-cols-[800px,1fr]">
            <div className="flex w-full items-center justify-center rounded-xl bg-hero-login bg-cover bg-center bg-no-repeat">
                <Image src="/images/logo.svg" width={232} height={58} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-[372px] flex-col gap-y-10">
                    <div>
                        <Heading size="lg">Boas vindas!</Heading>
                        <Text color="gray200">
                            Faça seu login ou acesse como visitante.
                        </Text>
                    </div>

                    <AuthButtons />
                </div>
            </div>
        </section>
    )
}
