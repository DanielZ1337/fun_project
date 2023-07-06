import Image from "next/image";
import Link from "next/link";
import {useToast} from "@/hooks/useToast";
import {useOgPreview} from "@/hooks/useOgPreview";
import {useEffect, useRef} from "react";
import {Spinner} from "@/components/icons";

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
            <div className={"flex flex-col items-center justify-center gap-2"}>
                <Spinner/>
                <p className={"text-gray-500 dark:text-gray-400"}>Fetching preview...</p>
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