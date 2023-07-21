'use client'

import {useEffect} from 'react'
import {usePathname, useSearchParams} from 'next/navigation'
import nProgress from "nprogress";

export default function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    nProgress.configure({
        showSpinner: false,
    })

    useEffect(() => {
        nProgress.done()
        return () => {
            nProgress.start()
        }
    }, [pathname, searchParams])

    return null
}