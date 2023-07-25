'use client';

import React, {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import {useToast} from "@/hooks/useToast";
import {GitHubIcon, Spinner} from "@/components/icons";
import {useRouter} from "next/navigation";

export default function Page() {
    const [githubLoading, setGitHubLoading] = useState(false)
    const useToaster = useToast();
    const router = useRouter()



    useEffect(() => {
        /*try {
            setGitHubLoading(true)
            signIn('github').then(r => {
                if (r?.error) {
                    setGitHubLoading(false)
                    useToaster.toast({
                        title: "Couldn't log in",
                        description: 'An unknown error occurred in the login process'
                    })
                } else {
                    router.push('/')
                }
            })
            setGitHubLoading(false)
        } catch (e) {
            setGitHubLoading(false)
            useToaster.toast({
                title: "Couldn't log in",
                description: 'An unknown error occurred in the login process'
            })
        }*/
        signIn('github', {
            callbackUrl: '/'
        })
    }, [])
/*

    return (
        <LoginButton logo={<GitHubIcon/>} loadingElement={<Spinner/>}
                     onClick={LoginWithGitHub} isDisabled={githubLoading}>
            Login with GitHub
        </LoginButton>
    )*/
}