'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useNotesData} from "@/hooks/useNotesData";
import React, {useEffect} from "react";
import ParseMarkdown from "@/components/parse-markdown";
import {Spinner} from "@/components/icons";
import NotesNavigationMenu from "@/components/notes-navigation-menu";

export default function Page({params}: { params: { slug: string[] } }) {
    const {slug} = params
    const owner = slug[0]
    const repo = slug[1]
    const slugs = slug.slice(2)
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const {data, isLoading} = useNotesData(owner, repo, token ? token : undefined)
    const pathname = usePathname()
    const router = useRouter()
    const [currentSlug, setCurrentSlug] = React.useState<string | undefined>(undefined)
    const [currentBacklinks, setCurrentBacklinks] = React.useState<{
        title: string,
        excerpt: string,
        slug: string
    }[] | undefined>(undefined)

    if (!owner || !repo) {
        throw new Error('Missing owner or repo')
    }

    useEffect(() => {
        if (slugs.length === 0) {
            router.push(`/notes/${owner}/${repo}/readme`)
        }
        if (!data) return

        if (data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => decodeURI(slug.toLowerCase())).join("/")).length > 0) {
            const currentPost = data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => decodeURI(slug.toLowerCase())).join("/"))[0]
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

    }, [currentSlug, data, owner, repo, router, slugs])

    if (isLoading) {
        return (
            <div className={"flex gap-2 flex-col items-center justify-center w-full h-full"}>
                <Spinner className={"w-10 h-10"}/>
                <p className={"mt-2 text-sm font-medium text-gray-500"}>Loading...</p>
            </div>
        )
    }

    return (
        <>
            <NotesNavigationMenu backlinks={currentBacklinks} token={token ? token : undefined} repo={repo}
                                 owner={owner}/>
            {currentSlug && data && data.filter((note) => note.slug === currentSlug).length > 0 &&
                <ParseMarkdown code={data.filter((note) => note.slug === currentSlug)[0].markdown}/>
            }
        </>
    )
}