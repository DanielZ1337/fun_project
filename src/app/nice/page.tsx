'use client'

import {useNotesData} from "@/hooks/useNotesData";
import {useEffect, useState} from "react";
import Input from "@/components/ui/input";
import ParseMarkdown from "@/components/parse-markdown";
import NotesNavigationMenu from "@/components/notes-navigation-menu";
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Page() {
    const searchParams = useSearchParams()
    const {data: session} = useSession()
    const token = searchParams.get('token')

    const [noteSearch, setNoteSearch] = useState('')
    const [backlinks, setBacklinks] = useState<{
        title: string
        excerpt: string
        slug: string
    }[]>()

    const owner = 'danielz1337'
    const repo = 'obsidian-sdu'

    const {data, isLoading} = useNotesData(owner, repo, token ? token : undefined)

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

    useEffect(() => {
        setNoteSearch('2. semester/Data Management/Normalization')
    }, [data])

    return (
        <>
            <Input type="text" value={noteSearch} onChange={(e) => {
                getBacklinks()
                setNoteSearch(e.target.value)
            }} className={"mb-4"}/>
            <NotesNavigationMenu owner={owner} repo={repo} backlinks={backlinks} token={token ? token : undefined}/>
            {noteSearch && data?.filter((note) => note.slug === noteSearch).map((note) => (
                <div key={note.metadata.title}>
                    <h1>{note.metadata.title}</h1>
                    <ParseMarkdown code={note.markdown}/>
                </div>
            ))}
            {isLoading && <p>Loading...</p>}
        </>
    )
}