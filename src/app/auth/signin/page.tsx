'use client';

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {useToast} from "@/hooks/useToast";
import {GitHubIcon, Spinner} from "@/components/icons";

export default function Page() {
    const [githubLoading, setGitHubLoading] = useState(false)
    const useToaster = useToast();


    async function LoginWithGitHub() {
        try {
            setGitHubLoading(true)
            await signIn('github', {
                callbackUrl: '/'
            })
        } catch (e) {
            setGitHubLoading(false)
            useToaster.toast({
                title: "Couldn't log in",
                description: 'An unknown error occurred in the login process'
            })
        }
    }


    return (
        <LoginButton logo={<GitHubIcon/>} loadingElement={<Spinner/>}
                     onClick={LoginWithGitHub} isDisabled={githubLoading}>
            Login with GitHub
        </LoginButton>
    )
}

function LoginButton({logo, loadingElement, children, onClick, isDisabled, ...props}: {
    logo?: React.ReactNode
    loadingElement?: React.ReactNode,
    children: React.ReactNode,
    onClick: () => void,
    isDisabled?: boolean
}): React.ReactElement {
    return (
        <button {...props} onClick={onClick} disabled={isDisabled}
                className={"flex gap-2 max-w-sm mx-auto w-full items-center justify-center focus:outline-2 focus:outline focus:outline-offset-2 focus:outline-green-900/50 rounded-md text-white bg-slate-800 p-3 disabled:bg-slate-300 disabled:cursor-not-allowed"}>
            {isDisabled ? loadingElement : logo}
            {children}
        </button>
    )
}