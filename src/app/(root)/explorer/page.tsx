'use client'

import { PageTitle } from '@/components/PageTitle'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { PiBinoculars, PiMagnifyingGlass } from 'react-icons/pi'
import { Tag } from '@/components/ui/tag'
import { BookCard, BookWithAvgRating } from '@/components/BookCard'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@prisma/client'
import { api } from '@/lib/axios'

export default function ExplorerPage() {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    )

    const { data: categories } = useQuery<Category[]>(
        ['categories'],
        async () => {
            const { data } = await api.get('/books/categories')
            return data.categories ?? []
        },
    )

    const { data: books } = useQuery<BookWithAvgRating[]>(
        ['books', selectedCategory],
        async () => {
            const { data } = await api.get('/books', {
                params: {
                    category: selectedCategory,
                },
            })

            return data.books ?? []
        },
    )

    const filteredBooks = books?.filter((book) => {
        return (
            book.name.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        )
    })

    return (
        <section className="flex h-full w-full flex-col overflow-hidden">
            <header className="flex justify-between">
                <PageTitle title="Explorer" icon={PiBinoculars} />

                <Input
                    placeholder="Buscar livro ou autor"
                    icon={<PiMagnifyingGlass size={20} />}
                    className="max-w-[433px]"
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                />
            </header>

            <div className="mb-12 mt-10 flex flex-wrap gap-3">
                <Tag
                    active={selectedCategory === null}
                    onClick={() => setSelectedCategory(null)}
                >
                    Tudo
                </Tag>
                {categories?.map((category) => (
                    <Tag
                        key={category.id}
                        active={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </Tag>
                ))}
            </div>

            <div className="scrollbar-hidden grid h-full auto-rows-[188px] grid-cols-3 gap-5 overflow-y-auto pb-10">
                {filteredBooks?.map((book) => (
                    <BookCard key={book.id} book={book} size="lg" />
                ))}
            </div>
        </section>
    )
}
