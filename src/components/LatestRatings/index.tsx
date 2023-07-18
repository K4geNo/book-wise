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
                                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum nisi laborum consequatur similique in quaerat a, aliquam vero accusamus, quasi hic commodi assumenda eveniet cum perspiciatis blanditiis! Dolore id ipsa blanditiis velit qui earum veniam corporis natus vitae ratione fuga quis est dolorum voluptatum provident, eligendi deleniti explicabo voluptatibus possimus. Pariatur quisquam provident perspiciatis dolore sint maiores delectus officiis quis hic? Ea hic ut itaque molestias et magni cupiditate veniam qui, dolore, possimus asperiores architecto, praesentium beatae nam consequuntur voluptatem? Deserunt, ipsa? Reiciendis ut laudantium atque, laboriosam quam a natus ducimus id cum ad animi impedit magnam pariatur modi, assumenda consequuntur ipsum? Nostrum unde nam eius facilis dolorum dolores dolorem amet eligendi, accusantium rem recusandae ea, explicabo assumenda, eos pariatur sint excepturi dignissimos! Illum totam quam sint tenetur eligendi. Enim ad, aut, suscipit hic itaque officia cupiditate, nam voluptatem id ducimus perferendis illo saepe asperiores similique accusamus? Rerum quis, aspernatur amet neque ex laboriosam minus reiciendis exercitationem iste dolore! Aliquid molestias modi numquam eligendi voluptas assumenda tenetur, culpa perspiciatis voluptatum adipisci asperiores beatae ea doloribus voluptate ducimus ullam libero. Sapiente est quis officiis. Eaque accusantium unde est esse sint, provident corrupti neque quas minima pariatur nisi earum consequuntur saepe minus.',
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
