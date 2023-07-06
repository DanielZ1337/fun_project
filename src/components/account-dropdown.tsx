import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/avatar";
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
                    <AvatarImage src={session.user?.image!} alt={`@${session.user?.name}`}/>
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href={`https://github.com/${session.user?.name}`}>
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
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

AccountDropdown.displayName = "AccountDropdown"