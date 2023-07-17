import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-full w-full">
            <Sidebar />
            <div className="mx-auto h-full w-full max-w-[996px] pt-[72px]">
                {children}
            </div>
        </main>
    )
}
