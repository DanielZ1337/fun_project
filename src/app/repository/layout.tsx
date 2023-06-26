'use client'

import {useSearchParams} from "next/navigation";

export default function Layout({children}: { children: React.ReactNode }) {
    const params = useSearchParams()

    const url = params.get('url')

    return (
        <>
            <p>
                {url}
            </p>
            {children}
        </>
    )
}