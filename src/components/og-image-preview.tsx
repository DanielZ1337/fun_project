import Image from "next/image";
import Link from "next/link";
import {useToast} from "@/hooks/useToast";
import {useOgPreview} from "@/hooks/useOgPreview";
import {useEffect, useRef} from "react";

interface Props {
    url: string
}

const OgImagePreview = ({url}: Props) => {
    const previewRef = useRef<HTMLAnchorElement>(null)
    const {toast} = useToast()


    const {isLoading, isError, data} = useOgPreview(url)
    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: "There was an error fetching the preview for this link.",
                duration: 5000,
            })
        }

        if (!isLoading) {
            setTimeout(() => {
                previewRef.current?.scrollIntoView({behavior: "smooth"})
            }, 200)
        }
    }, [isLoading, isError, toast])

    if (isLoading) {
        return (
            <div className={"w-full max-w-lg space-y-2 animate-pulse"}>
                <div
                    className="flex items-center justify-center bg-gray-300 h-64 rounded dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path
                            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-72"/>
                <div className="flex items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"/>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"/>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"/>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className={"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"}/>
            </div>
        )
    }

    if (isError) {
        return <p className={"text-gray-500 dark:text-gray-400"}>Error fetching preview</p>
    }

    return (
        <Link
            ref={previewRef}
            className={"my-6 max-w-lg flex-wrap border-neutral-300 dark:border-neutral-500 border rounded-lg overflow-clip shadow-xl"}
            href={data.meta.url}
        >
            <Image
                src={data.meta.image.url}
                alt={data.meta.image.alt ? data.meta.image.alt : data.meta.title}
                width={0}
                height={0}
                sizes={"100vw"}
                className={"object-contain"}
                style={{height: "100%", width: "100%"}}
            />

            <div className={"p-3 text-left break-all"}>
                <h1 className={"text-xl font-bold text-center mb-2"}>{data.meta.title}</h1>
                <h3>{data.meta.description}</h3>
                <Link href={data.meta.url}
                      className={"underline text-blue-500 text-xs"}>{data.meta.url}</Link>
            </div>
        </Link>
    )
}

export default OgImagePreview;