/*
'use client'

import useTree from "@/hooks/useTree";
import {useEffect, useState} from "react";
import {generateFileExplorer} from '@/components/file-explorer'
import NotesNavigationMenu from "@/components/notes-navigation-menu";
import {useLinkMappings} from "@/hooks/useLinkMappings";

export default function Page() {

    const [search, setSearch] = useState<string>()
    const [tree, setTree] = useState<any>()
    const [currentFolder, setCurrentFolder] = useState<any>()

    const {data, isLoading} = useTree('danielz1337', 'test-mds')

    const {data: linksMapping, isLoading: isLinkMappingLoading} = useLinkMappings('danielz1337', 'test-mds')
    useEffect(() => {

        if (data) {
            // @ts-ignore
            const treeData = generateFileExplorer(data)
            setTree(treeData)
            setCurrentFolder(treeData)
        }
    }, [data, linksMapping])

    return (
        <>
            <NotesNavigationMenu/>
            {/!*{linksMapping && Array.from(linksMapping).map(([key, value]) => {
                return (
                    <div key={key}>
                        <p>{key}</p>
                        <p>{value.length !== 0 ? 'Backlink:' + value : undefined}</p>
                    </div>
                )
            })}*!/}
            {/!*<Accordion type='multiple'>
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
                        <strong>Repositories</strong>
                        <RepositoryList username={search ? search : undefined}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>*!/}
        </>
    )
}
*/
