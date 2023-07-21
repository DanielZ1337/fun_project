import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/accordian";
import BacklinkNavigationMenuPreview from "@/components/backlink-navigation-menu-preview";

const backlinks = [
    {
        title: 'Backlink 1',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem beatae commodi consequatur cumque cupiditate debitis delectus deleniti dicta dolor doloremque doloribus dolorum ea eius eligendi error esse est et eum eveniet ex excepturi exercitationem expedita explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa ipsum iste itaque iure iusto laboriosam laborum laudantium libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quam quasi quia quibusdam quisquam quod quos ratione recusandae rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sed sequi similique sit soluta sunt suscipit tempora tenetur totam ullam unde vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum',
        slug: 'backlink-1'
    },
    {
        title: 'Backlink 2',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem beatae commodi consequatur cumque cupiditate debitis delectus deleniti dicta dolor doloremque doloribus dolorum ea eius eligendi error esse est et eum eveniet ex excepturi exercitationem expedita explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa ipsum iste itaque iure iusto laboriosam laborum laudantium libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quam quasi quia quibusdam quisquam quod quos ratione recusandae rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sed sequi similique sit soluta sunt suscipit tempora tenetur totam ullam unde vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum',
        slug: 'backlink-2'
    },
    {
        title: 'Backlink 3',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem beatae commodi consequatur cumque cupiditate debitis delectus deleniti dicta dolor doloremque doloribus dolorum ea eius eligendi error esse est et eum eveniet ex excepturi exercitationem expedita explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa ipsum iste itaque iure iusto laboriosam laborum laudantium libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quam quasi quia quibusdam quisquam quod quos ratione recusandae rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sed sequi similique sit soluta sunt suscipit tempora tenetur totam ullam unde vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum',
        slug: 'backlink-3'
    },
    {
        title: 'Backlink 4',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem beatae commodi consequatur cumque cupiditate debitis delectus deleniti dicta dolor doloremque doloribus dolorum ea eius eligendi error esse est et eum eveniet ex excepturi exercitationem expedita explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa ipsum iste itaque iure iusto laboriosam laborum laudantium libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis non nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quam quasi quia quibusdam quisquam quod quos ratione recusandae rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sed sequi similique sit soluta sunt suscipit tempora tenetur totam ullam unde vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum',
        slug: 'backlink-4'
    }
]

export default function NotesNavigationMenu() {


    return (
        <Accordion type='multiple'>
            <AccordionItem value={'backlinks'}>
                <AccordionTrigger>Backlinks</AccordionTrigger>
                <AccordionContent>
                    <div className='grid gap-4'>
                        {backlinks.map(({title, excerpt, slug}) => (
                            <BacklinkNavigationMenuPreview title={title} excerpt={excerpt} slug={slug} key={slug}/>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='file-explorer'>
                <AccordionTrigger>File Explorer</AccordionTrigger>
                <AccordionContent>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='repository'>
                <AccordionTrigger>Repository</AccordionTrigger>
                <AccordionContent>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}