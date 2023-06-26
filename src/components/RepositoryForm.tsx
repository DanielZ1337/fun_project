'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import {useState} from "react";
import OgImagePreview from "@/components/OgImagePreview";
import * as Toggle from "@radix-ui/react-toggle";
import {LockClosed, LockOpen} from "@/components/Icons";
import {useRouter} from "next/navigation";


export default function RepositoryForm() {
    const [url, setUrl] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [privateRepo, setPrivateRepo] = useState(false)

    const router = useRouter()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (e.currentTarget.url.value === "") return
        setUrl(e.currentTarget.url.value)
        setSubmitted(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit}
                  className={"w-full flex flex-col sm:flex-row gap-6 items-center justify-center"}
            >
                <div className={"flex flex-col gap-2 w-full sm:1/3 md:w-1/2 lg:w-1/3 xl:w-1/4"}>
                    <Input
                        autoFocus
                        tabIndex={1}
                        name={"url"}
                        onPaste={(e) => {
                            const clipboardData = e.clipboardData.getData('text/plain');
                            if (clipboardData === url) return
                            if (clipboardData !== "") {
                                setUrl(clipboardData)
                                setSubmitted(true)
                            }
                        }}
                        placeholder={"Enter a GitHub repository URL..."}
                        type={"text"}
                    />
                    {privateRepo && (
                        <Input
                            tabIndex={2}
                            name={"token"}
                            placeholder={"Enter a GitHub token..."}
                            type={"password"}
                        />
                    )}
                </div>

                <Toggle.Root tabIndex={2}
                             className={"focus:outline-none focus-visible:outline-purple-500 rounded-md p-2 active:dark:bg-neutral-800 active:bg-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"}
                             aria-label="Toggle private repository"
                             onPressedChange={() => setPrivateRepo(!privateRepo)}>
                    {privateRepo ? (
                        <LockClosed/>) : (<LockOpen/>)
                    }
                </Toggle.Root>
                <div className={"flex gap-6"}>
                <Button
                    className={"px-3 py-2 rounded-full"}
                    type={"submit"}
                    tabIndex={3}
                >
                    Find Repository
                </Button>

                <Button
                    className={"px-3 py-2 rounded-full"}
                    onClick={(e) => {
                        e.preventDefault()
                        let formUrl = e.currentTarget.form!.url.value
                        if (formUrl === "") return
                        if (!formUrl.startsWith("https") && !formUrl.startsWith("http")){
                            formUrl = `http://${formUrl}`
                        }
                        router.push(`repository?url=${formUrl}`)
                    }}
                    tabIndex={4}
                >
                    Browse Repository
                </Button>
                </div>
            </form>

            {submitted && (
                <OgImagePreview url={url}/>
            )}
        </>
    )
}