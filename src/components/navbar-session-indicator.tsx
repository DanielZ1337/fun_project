import {signIn, useSession} from "next-auth/react";
import {Spinner} from "@/components/icons";
import {AccountDropdown} from "@/components/account-dropdown";
import Button from "@/components/ui/button";
import React, {useEffect} from "react";
import {useToast} from "@/hooks/useToast";
import {useRouter, useSearchParams} from "next/navigation";

export default function NavbarSessionIndicator() {
    const {data: session, status} = useSession();
    const [isLoggingIn, setIsLoggingIn] = React.useState(false)
    const useToaster = useToast()
    const searchParams = useSearchParams()
    const router = useRouter()


useEffect(() => {
    if (searchParams.get('error') === "OAuthAccountNotLinked") {
        useToaster.toast({
            title: "Error",
            description: "This account is not linked to any GitHub account.",
        })
        try {
            signIn('github').then(() => {
                useToaster.toast({
                    title: "Logged in",
                    description: "You have successfully logged in.",
                })
            })
        } catch (e) {
            useToaster.toast({
                title: "Error",
                description: "An error occurred while logging in.",
            })
        }
    }
    if (status === "authenticated") {
        useToaster.toast({
            title: "Logged in",
            description: "You have successfully logged in.",
        })
    }
}, [searchParams, status, useToaster])

    async function handleLogin() {
        try {
            setIsLoggingIn(true)
            await signIn('github')
        } catch (e) {
            setIsLoggingIn(false)
            useToaster.toast({
                title: "Error",
                description: "An error occurred while logging in.",
            })
        }

    }

    if (status === "loading") return <Spinner/>;
    if (status === "authenticated") return <AccountDropdown session={session}/>;
    if (status === "unauthenticated") {
        if (isLoggingIn) {
            return (
                <div className={"flex gap-2 items-center"}>
                    <Spinner className={"w-5 h-5"}/>
                    <p className={"text-sm font-medium text-gray-500"}>Logging in...</p>
                </div>
            )
        } else {
            return <Button className={"rounded-md p-2"} disabled={isLoggingIn} onClick={handleLogin}>
                Login
            </Button>
        }
    }

    return null;
}