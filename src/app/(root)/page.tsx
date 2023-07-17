import { LatestRatings } from '@/components/LatestRatings'

export default function Home() {
    return (
        <main className="grid h-full w-full grid-cols-[1fr,308px] gap-x-16 overflow-hidden">
            <LatestRatings />

            <div>
                <h1>book</h1>
            </div>
        </main>
    )
}
