import {signIn, useSession} from "next-auth/react";
import {Spinner} from "@/components/icons";
import {AccountDropdown} from "@/components/account-dropdown";
import Button from "@/components/button";

export default function NavbarSessionIndicator() {
    const {data: session, status} = useSession();

    if (status === "loading") return <Spinner/>;
    if (status === "authenticated") return <AccountDropdown session={session}/>;
    if (status === "unauthenticated") return <Button className={"rounded-md p-2"} onClick={() => signIn('github')}>
        Login
    </Button>;

    return null;
}