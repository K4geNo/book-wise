import { PiChartLineUp } from 'react-icons/pi'
import { PageTitle } from '../PageTitle'
import { Text } from '../Typography'
import { RatingCard } from '../RatingCard'

export const LatestRatings = () => {
    return (
        <div className="scrollbar-hidden flex h-full w-full flex-col overflow-y-auto">
            <PageTitle icon={PiChartLineUp} title="Início" className="mb-10" />

            <Text size="sm">Avaliações mais recentes</Text>

            <section className="mt-4 flex flex-col gap-y-3">
                {Array.from({ length: 20 }).map((_, index) => (
                    <RatingCard
                        key={index}
                        rating={{
                            id: 'aa',
                            rate: 4,
                            user: {
                                name: 'Lucas',
                                avatar_url:
                                    'https://avatars.githubusercontent.com/u/4256471?v=4',
                                email: 'johndoe@example.com',
                                id: 'daisdja',
                                created_at: new Date(),
                            },
                            book: {
                                id: 'daisdja',
                                author: 'Lucas',
                                name: 'Lucas',
                                cover_url:
                                    'https://avatars.githubusercontent.com/u/4256471?v=4',
                                created_at: new Date(),
                                summary:
                                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, aliquid autem libero fuga hic facere ullam voluptatum incidunt amet perspiciatis odio, enim voluptas blanditiis delectus optio dolores molestiae! Quibusdam architecto odio quos porro error necessitatibus alias voluptas repudiandae impedit fuga velit, hic ab. Omnis voluptatum odio reiciendis. Corporis, autem nostrum.',
                                total_pages: 100,
                            },
                            created_at: new Date(),
                            book_id: 'daisdja',
                            user_id: 'daisdja',
                            description: 'Lucas',
                        }}
                    />
                ))}
            </section>
        </div>
    )
}
