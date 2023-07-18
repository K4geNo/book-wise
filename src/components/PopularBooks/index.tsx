import { BookCard } from '../BookCard'
import { Text } from '../Typography'
import { Link } from '../ui/link'

// interface PopularBooksProps {}

export const PopularBooks = () => {
    return (
        <div className="mt-10 flex w-full flex-col gap-4">
            <header className="flex items-center justify-between">
                <Text size="sm">Livros populares</Text>
                <Link href="/explore" text="Ver todos" />
            </header>

            <section className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <BookCard
                        key={`popular-${i}`}
                        book={{
                            author: 'J. K. Rowling',
                            avgRating: 4,
                            cover_url:
                                'https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg',
                            created_at: new Date(),
                            id: '1',
                            name: 'Harry Potter e a Pedra Filosofal',
                            summary:
                                'Harry Potter e a Pedra Filosofal é o primeiro livro dos sete volumes da série de fantasia Harry Potter, tanto em termos cronológicos como em ordem de publicação, da autora inglesa J. K. Rowling.',
                            total_pages: 223,
                        }}
                    />
                ))}
            </section>
        </div>
    )
}
