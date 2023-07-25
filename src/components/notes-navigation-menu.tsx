import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordian";
import BacklinkNavigationMenuPreview from "@/components/backlink-navigation-menu-preview";
import {generateFileExplorer, RecursiveComponent} from "@/components/file-explorer";
import {useEffect, useState} from "react";
import useTree from "@/hooks/useTree";

interface Backlink {
    title: string
    excerpt: string
    slug: string
}

export default function NotesNavigationMenu({backlinks, owner, repo, token}: {
    backlinks: Backlink[] | undefined,
    owner: string,
    repo: string,
    token?: string
}) {

    const [tree, setTree] = useState<any>()
    const [currentFolder, setCurrentFolder] = useState<any>()

    const {data, isLoading} = useTree(owner, repo, true, token ? token : undefined)

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
                                <BacklinkNavigationMenuPreview owner={owner} repo={repo} title={title} excerpt={excerpt} slug={slug} key={slug}/>
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