'use client'

import {useNotesData} from "@/hooks/useNotesData";
import {useState} from "react";
import Input from "@/components/input";
import ParseMarkdown from "@/components/parse-markdown";
import BacklinkNavigationMenuPreview from "@/components/backlink-navigation-menu-preview";

export default function Page() {
    const [noteSearch, setNoteSearch] = useState('')

    const {data, isLoading} = useNotesData('danielz1337', 'test-mds')


    return (
        <>
            <Input type="text" value={noteSearch} onChange={(e) => setNoteSearch(e.target.value)} className={"mb-4"}/>
            {noteSearch && data?.filter((note) => note.metadata.title === noteSearch).map((note) => (
                <div key={note.metadata.title}>
                    <ul>
                        {note.backLinks?.map((backLink) => (
                            <li key={backLink}>
                                <BacklinkNavigationMenuPreview title={note.metadata.title}
                                                               excerpt={note.metadata.excerpt} slug={note.slug}/>
                            </li>
                        ))}
                    </ul>
                    <h1>{note.metadata.title}</h1>
                    <ParseMarkdown code={note.markdown}/>
                </div>
            ))}
            {isLoading && <p>Loading...</p>}
        </>
    )
}