'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { Heading, Text } from '../Typography'
import { RatingStars } from '../RatingCard/RatingStars'
import { BookInfo } from './BookInfo'
import { FaBookOpen, FaBookmark } from 'react-icons/fa'
import { BookRatings } from '../BookRatings'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { BookWithAvgRating } from '../BookCard'
import { RatingWithAuthor } from '../UserRatingCard'
import { CategoriesOnBooks, Category } from '@prisma/client'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface BookDetails extends BookWithAvgRating {
    ratings: RatingWithAuthor[]
    categories: (CategoriesOnBooks & {
        category: Category
    })[]
}

interface RatingsDialogProps {
    children: ReactNode
    bookId: string
}

export const RatingsDialog = ({ children, bookId }: RatingsDialogProps) => {
    const [open, setOpen] = useState(false)

    const { data: book } = useQuery<BookDetails>(
        ['book', bookId],
        async () => {
            const { data } = await api.get(`/books/details?bookId=${bookId}`)
            return data.book ?? {}
        },
        {
            enabled: open,
        },
    )

    const ratingsLength = book?.ratings.length ?? 0

    const categories =
        book?.categories.map((category) => category.category.name).join(', ') ??
        ''

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <Dialog.Content className="scrollbar-modal fixed right-0 top-0 flex h-full w-[660px] flex-col overflow-y-auto bg-gray-800 px-12 py-6 shadow-[-4px,0px,30px,#00000080]">
                    <Dialog.Close className="mb-4 ml-auto flex items-center justify-center text-gray-400">
                        <X size={24} />
                    </Dialog.Close>

                    {book && (
                        <>
                            <div className="mt-10 flex flex-col rounded-md bg-gray-700 px-8 py-6">
                                <div className="flex gap-x-8">
                                    <Image
                                        src={book.cover_url}
                                        width={171}
                                        height={242}
                                        alt={book.name}
                                        className="min-w-[171px] rounded-md object-cover"
                                    />

                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <Heading size="sm">
                                                {book.name}
                                            </Heading>
                                            <Text
                                                color="gray300"
                                                className="mt-2"
                                            >
                                                {book.author}
                                            </Text>
                                        </div>

                                        <div>
                                            <RatingStars rating={4} size="md" />
                                            <Text
                                                color="gray400"
                                                size="sm"
                                                className="mt-1"
                                            >
                                                {ratingsLength}
                                                {ratingsLength === 1
                                                    ? ' avaliação'
                                                    : ' avaliações'}
                                            </Text>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center gap-[60px] border-t border-gray-600 pt-6">
                                    <BookInfo
                                        icon={FaBookmark}
                                        title="Categorias"
                                        info={categories}
                                    />
                                    <BookInfo
                                        icon={FaBookOpen}
                                        title="Páginas"
                                        info={String(book.total_pages)}
                                    />
                                </div>
                            </div>

                            <BookRatings
                                ratings={book.ratings}
                                bookId={bookId}
                            />
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
