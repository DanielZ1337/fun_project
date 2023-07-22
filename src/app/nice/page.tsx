'use client'

import {useNotesData} from "@/hooks/useNotesData";
import {useState} from "react";
import Input from "@/components/input";
import ParseMarkdown from "@/components/parse-markdown";
import NotesNavigationMenu from "@/components/notes-navigation-menu";
import {useSearchParams} from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [noteSearch, setNoteSearch] = useState('')
    const [backlinks, setBacklinks] = useState<{
        title: string
        excerpt: string
        slug: string
    }[]>()

    const {data, isLoading} = useNotesData('danielz1337', 'test-mds', token ? token : undefined)

    function getBacklinks() {
        if (data) {
            const backlinks = data.filter((note) => note.markdown.includes(noteSearch)).map((note) => {
                return {
                    title: note.metadata.title,
                    excerpt: note.markdown,
                    slug: note.slug
                }
            })
            setBacklinks(backlinks)
        }
    }

    return (
        <>
            <Input type="text" value={noteSearch} onChange={(e) => {
                getBacklinks()
                setNoteSearch(e.target.value)
            }} className={"mb-4"}/>
            <NotesNavigationMenu backlinks={backlinks}/>
            {noteSearch && data?.filter((note) => note.metadata.title === noteSearch).map((note) => (
                <div key={note.metadata.title}>
                    <h1>{note.metadata.title}</h1>
                    <ParseMarkdown code={note.markdown}/>
                </div>
            ))}
            {isLoading && <p>Loading...</p>}
        </>
    )
}