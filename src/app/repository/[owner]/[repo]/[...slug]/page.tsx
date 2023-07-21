'use client'

import ParseMarkdown from '@/components/parse-markdown'
import axios from 'axios'
import {useEffect, useState} from 'react'

interface Props {
    params: {
        owner: string
        repo: string
        slug: string[]
    }
}

export default function Page({params}: Props) {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        if (params.slug.length === 0) {
            return
        }

        const {owner, repo, slug} = params

        console.log(owner, repo, slug)

        axios.get(`/api/raw`, {
            params: {
                owner,
                repo,
                path: slug.join('/')
            }
        }).then((res) => {
            setData(res.data)
        })
    }, [params])

    if (params.slug.length === 0) {
        return <></>
    }

    /* const { data, isLoading } = useMarkdownContent(
        params['repository-name'],
        params.slug,
        session?.user?.token!
    ) */

    return (
        <>
            <ParseMarkdown code={data}/>
            {/* {isLoading && <div>Loading...</div>}
			{data && <div>{data}</div>} */}
        </>
    )
}
