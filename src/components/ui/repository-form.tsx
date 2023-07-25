'use client'

import {RepositoryFormTabs, RepositoryFormTabsContent} from "@/components/repository-form-tabs";
import RepositoryOgPreviewForm from "@/components/repository-og-preview-form";
import Input from "@/components/ui/input";
import {FormEvent, useState} from "react";
import {useSession} from "next-auth/react";
import RepositoryList from "@/components/repository-list";

const TABS = {
    LINK: 'Link',
    USERNAME: 'Username',
    PERSONAL_REPO: 'Personal repository',
}
export default function RepositoryForm() {
    const [username, setUsername] = useState<string | undefined>(undefined)
    const {data: session} = useSession()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username')
        if (typeof username === 'string') {
            setUsername(username)
        }
    };

    return (
        <RepositoryFormTabs titles={Object.values(TABS)} defaultTab={TABS.LINK}>
            <RepositoryFormTabsContent title={TABS.LINK} className={"w-full"}>
                <RepositoryOgPreviewForm/>
            </RepositoryFormTabsContent>
            <RepositoryFormTabsContent title={TABS.USERNAME} className={"space-y-4"}>
                <form onSubmit={handleSubmit} className={"space-x-2"}>
                    <label htmlFor="username">Username:</label>
                    <Input
                        autoFocus
                        tabIndex={1}
                        name={'username'}
                        onPaste={(e) => {
                            const clipboardData = e.clipboardData.getData('text/plain')
                            if (clipboardData === username && clipboardData === '' && !clipboardData) return
                            setUsername(clipboardData)
                        }}
                        placeholder={'Enter a GitHub username...'}
                        type={'text'}
                    />
                </form>
                {username && <RepositoryList username={username}/>}
            </RepositoryFormTabsContent>
            <RepositoryFormTabsContent title={TABS.PERSONAL_REPO}>
                <h1>Personal repository</h1>
                {session ? <RepositoryList/> : <p>Not logged in</p>}
            </RepositoryFormTabsContent>
        </RepositoryFormTabs>
    )
}