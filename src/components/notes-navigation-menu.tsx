import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/accordian";
import BacklinkNavigationMenuPreview from "@/components/backlink-navigation-menu-preview";
import {RecursiveComponent} from "@/components/file-explorer";
import {useEffect, useState} from "react";
import useTree from "@/hooks/useTree";
import {generateFileExplorer} from "@/components/file-explorer";

interface Backlink {
    title: string
    excerpt: string
    slug: string
}

export default function NotesNavigationMenu({backlinks}: { backlinks: Backlink[] | undefined }) {

    const [tree, setTree] = useState<any>()
    const [currentFolder, setCurrentFolder] = useState<any>()

    const {data, isLoading} = useTree('danielz1337', 'test-mds', true)

    useEffect(() => {

        if (data) {
            // @ts-ignore
            const treeData = generateFileExplorer(data)
            setTree(treeData)
            setCurrentFolder(treeData)
        }
    }, [data])

    return (
        <Accordion type='multiple'>
            <AccordionItem value={'backlinks'}>
                <AccordionTrigger>Backlinks</AccordionTrigger>
                <AccordionContent>
                    {backlinks && backlinks.length === 0 && <p>No backlinks found</p>}
                    {backlinks && (
                        <div className='grid gap-4'>
                            {backlinks.map(({title, excerpt, slug}) => (
                                <BacklinkNavigationMenuPreview title={title} excerpt={excerpt} slug={slug} key={slug}/>
                            ))}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='file-explorer'>
                <AccordionTrigger>File Explorer</AccordionTrigger>
                <AccordionContent>
                    {tree && (
                        <div className='-ml-5'>
                            <RecursiveComponent data={tree}/>
                        </div>
                    )}
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