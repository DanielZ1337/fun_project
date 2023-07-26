'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useNotesData} from "@/hooks/useNotesData";
import React, {useEffect} from "react";
import {Spinner} from "@/components/icons";
import {useToast} from "@/hooks/useToast";
import Input from "@/components/ui/input";
import Link from "next/link";
import NotesNavigationMenu from "@/components/notes-navigation-menu";
import ParseMarkdown from "@/components/parse-markdown";
import PostHeader from "@/components/post-header";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import Button from "@/components/ui/button";

export default function NotesComponent({params}: { params: { slug: string[] } }) {
    const {slug} = params
    const owner = slug[0]
    const repo = slug[1]
    const slugs = slug.slice(2)
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const {data, isError, isLoading} = useNotesData(owner, repo, token ? token : undefined)
    const router = useRouter()
    const [currentSlug, setCurrentSlug] = React.useState<string | undefined>(undefined)
    const [currentBacklinks, setCurrentBacklinks] = React.useState<{
        title: string,
        excerpt: string,
        slug: string
    }[] | undefined>(undefined)
    const {toast} = useToast()
    const [noteSearch, setNoteSearch] = React.useState<string>("")
    const [noteSearchResults, setNoteSearchResults] = React.useState<{
        title: string,
        excerpt: string,
        slug: string
    }[] | undefined>(undefined)
    const defaultInputRef = React.useRef<HTMLInputElement>(null)
    const dialogInputRef = React.useRef<HTMLInputElement>(null)

    if (!owner || !repo) {
        throw new Error('Missing owner or repo')
    }

    useEffect(() => {
        if (noteSearch === "" || isError || !data) return
        // find notes that match the search query fastest way possible
        const results = data.filter((note) => note.metadata.title.toLowerCase().includes(noteSearch.toLowerCase()) || note.slug.toLowerCase().includes(noteSearch.toLowerCase())).map((note) => {
            return {
                title: note.metadata.title,
                excerpt: note.markdown,
                slug: note.slug
            }
        })
        setNoteSearchResults(results)


    }, [data, isError, noteSearch])

    useEffect(() => {
        if (slugs.length === 0) {
            router.push(`/notes/${owner.toLowerCase()}/${repo.toLowerCase()}/readme${token ? `?token=${token}` : ""}`)
        }

        if (!data) return

        if (data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => decodeURI(decodeURI(slug.toLowerCase()))).join("/")).length > 0) {
            const currentPost = data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => decodeURI(decodeURI(slug.toLowerCase()))).join("/"))[0]
            if (currentPost.slug !== currentSlug) {
                setCurrentSlug(currentPost.slug)
                const backlinks = data.filter((note) => note.slug !== currentPost.slug && note.markdown.includes(currentPost.slug)).map((note) => {
                    return {
                        title: note.metadata.title,
                        excerpt: note.markdown,
                        slug: note.slug
                    }
                })

                setCurrentBacklinks(backlinks)
            }
        }

    }, [currentSlug, data, owner, repo, router, slugs, token])

    useEffect(() => {
        if (slugs.length === 0) return
        if (isError) {
            toast({
                title: "Error loading notes",
                description: "There was an error loading the notes",
                duration: 5000,
            })
        }
    }, [isError, slugs.length, toast])

    if (isLoading) {
        return (
            <div className={"flex gap-2 flex-col items-center justify-center w-full h-full"}>
                <Spinner className={"w-10 h-10"}/>
                <p className={"mt-2 text-sm font-medium text-gray-500"}>Loading...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className={"flex gap-2 flex-col items-center justify-center w-full h-full"}>
                <p className={"text-sm font-medium text-gray-500"}>Error loading notes</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className={"flex gap-2 flex-col items-center justify-center w-full h-full"}>
                <p className={"text-sm font-medium text-gray-500"}>No notes found</p>
            </div>
        )
    }

    return (
        <>
            <Input ref={defaultInputRef} tabIndex={1} autoFocus={false} type="text" value={noteSearch}
                   onChange={(e) => {
                       setNoteSearch(e.target.value)
                       dialogInputRef.current?.focus()
                   }} className={"mb-4"}/>

            <Dialog open={noteSearch.length > 0} onOpenChange={() => {
                setNoteSearch("")
                defaultInputRef.current?.focus()
            }}>
                <DialogContent className="sm:max-w-[425px] flex flex-col max-h-[66%] ">
                    <DialogHeader>
                        <DialogTitle>Search for notes</DialogTitle>
                    </DialogHeader>
                    <Input ref={dialogInputRef} tabIndex={1} autoFocus={true} type="text" value={noteSearch}
                           onChange={(e) => setNoteSearch(e.target.value)} className={"mb-4"}/>
                    <div className={"flex flex-col gap-2 overflow-y-auto break-all"}>
                        {noteSearchResults && noteSearchResults.length > 0 && noteSearchResults.map((note) => {
                            return (
                                <Link
                                    href={`/notes/${owner.toLowerCase()}/${repo.toLowerCase()}/${note.slug}${token ? `?token=${token}` : ""}`}
                                    key={note.slug}><p
                                    className={"text-sm font-medium text-gray-500 hover:text-current"}>{note.title}</p>
                                </Link>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>

            <div className={"flex divide-x justify-between"}>
                <div className={"w-full pr-4"}>
                    {currentSlug && data && data.filter((note) => note.slug === currentSlug).length > 0 &&
                        <PostHeader post={data.filter((note) => note.slug === currentSlug)[0]}/>}
                    <div className={"mt-4"}>
                        {data && data.filter((note) => note.slug === currentSlug).length === 0 &&
                            <div
                                className={"flex gap-2 flex-col items-center justify-center w-full h-full mt-8"}>
                                <p className={"text-sm font-medium text-gray-500"}>Note not found</p>
                            </div>}
                        {currentSlug && data && data.filter((note) => note.slug === currentSlug).length > 0 &&
                            <ParseMarkdown
                                code={data.filter((note) => note.slug === currentSlug)[0].markdown}/>}
                    </div>
                </div>
                <NotesNavigationMenu backlinks={currentBacklinks} token={token ? token : undefined} repo={repo}
                                     owner={owner}/>
            </div>
            {/*<NotesGraph posts={data} owner={owner} repo={repo} token={token ? token : undefined}/>*/
            }
        </>
    )
}