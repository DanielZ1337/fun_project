import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOut} from "next-auth/react";
import {Session} from "next-auth";
import Link from "next/link";

interface Props {
    session: Session
}

export const AccountDropdown = ({session}: Props) => {

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={"cursor-pointer"} asChild>
                <Avatar>
                    <AvatarImage src={session.user.image!} alt={`@${session.user.name}`}/>
                    <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href={`https://github.com/${session.user.name}`}>
                        GitHub
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => signOut({
                    redirect: false,
                }).then(() => {
                    window.location.reload()
                })}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

AccountDropdown.displayName = "AccountDropdown"