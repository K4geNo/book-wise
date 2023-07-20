'use client'

import { useQuery } from '@tanstack/react-query'
import { BookCard, BookWithAvgRating } from '../BookCard'
import { Text } from '../Typography'
import { Link } from '../ui/link'
import { api } from '@/lib/axios'

// interface PopularBooksProps {}

export const PopularBooks = () => {
    const { data: popularBooks } = useQuery<BookWithAvgRating[]>(
        ['popular-books'],
        async () => {
            const { data } = await api.get('/books/popular')

            return data?.books ?? []
        },
    )

    return (
        <div className="mt-14 flex w-full flex-col gap-4">
            <header className="flex items-center justify-between">
                <Text size="sm">Livros populares</Text>
                <Link href="/explore" text="Ver todos" />
            </header>

            <section className="flex flex-col gap-3">
                {popularBooks?.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </section>
        </div>
    )
}
