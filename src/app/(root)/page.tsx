import { LatestRatings } from '@/components/LatestRatings'
import { PopularBooks } from '@/components/PopularBooks'

export default function Home() {
    return (
        <main className="grid h-full w-full grid-cols-[1fr,308px] gap-x-16 overflow-hidden">
            <LatestRatings />

            <PopularBooks />
        </main>
    )
}
