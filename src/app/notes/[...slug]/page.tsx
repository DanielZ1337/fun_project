'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useNotesData} from "@/hooks/useNotesData";
import React, {useEffect} from "react";
import ParseMarkdown from "@/components/parse-markdown";
import Link from "next/link";

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

    if (!owner || !repo) {
        throw new Error('Missing owner or repo')
    }

    useEffect(() => {
        if (slugs.length === 0) {
            router.push(`/notes/${owner}/${repo}/readme`)
        }
        if (!data) return

        if (data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => slug.toLowerCase()).join("/")).length > 0) {
            setCurrentSlug(data.filter((note) => note.slug.toLowerCase() === slugs.map((slug) => slug.toLowerCase()).join("/"))[0].slug)
        }

    }, [currentSlug, data, owner, pathname, repo, router, slugs, slugs.length])

    if (isLoading) {
        return <div className={"w-full max-w-lg space-y-2 animate-pulse"}>
            <div
                className="flex items-center justify-center bg-gray-300 h-64 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
        </div>
    }

    return (
        <>
            {currentSlug && data && data.filter((note) => note.slug === currentSlug).length > 0 &&
                <ParseMarkdown code={data.filter((note) => note.slug === currentSlug)[0].markdown} />
            }
            <div className={"flex flex-col gap-2"}>
                {data &&
                    data.map((note) => {
                        return (
                            <Link href={`/notes/${owner}/${repo}/${note.slug}`} key={note.slug} className={"w-full"}>
                                {note.slug}
                            </Link>
                        )
                    })}
            </div>
        </>
    )
}