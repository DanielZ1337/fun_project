"use client";

import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";
import {GitHubIcon, HomeIcon} from "@/components/icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import links from "@/lib/links.json" assert {type: "json"};
import NavbarSessionIndicator from "@/components/navbar-session-indicator";

export default function Navbar() {

    return (
        <div className={"mb-8"}>
            <div
                className={
                    "h-full p-4 -mt-4 mx-2 top-0 right-0 flex items-center inset-x-0 justify-between border-b border-neutral-950/50 dark:border-neutral-50/50"
                }
            >
                <Tip TipTitle={"Go to Home"}>
                    <Link
                        href={"/"}
                        className={
                            "-ml-4 sm:ml-0 active:scale-105 transition duration-75 active:bg-neutral-200 dark:active:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 sm:p-3 rounded-lg sm:rounded-2xl focus:outline-1 sm:focus:outline-2 focus:outline-offset-1 sm:focus:outline-offset-2 focus:outline-purple-500 outline-none"
                        }
                    >
                        <HomeIcon/>
                    </Link>
                </Tip>
                <div className={"flex items-center gap-2 sm:gap-4 -mr-4 sm:mr-0"}>
                    <Tip TipTitle={"Go to GitHub Source Code"}>
                        <Link
                            href={links.GITHUB_REPOSITORY}
                            className={
                                "rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 focus:outline-dashed"
                            }
                        >
                            <GitHubIcon fill={"#6f42c1"}>
                                <animate
                                    attributeName="fill"
                                    dur="16s"
                                    values="#6f42c1;purple;#a855f7;purple;#6f42c1"
                                    repeatCount="indefinite"
                                />
                            </GitHubIcon>
                        </Link>
                    </Tip>
                    <ThemeSwitcher/>
                    <NavbarSessionIndicator/>
                </div>
            </div>
        </div>
    )
}

const TipTrigger = ({children}: { children: React.ReactNode }) => (
    <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
);

const TipContent = ({children}: { children: React.ReactNode }) => (
    <Tooltip.Content
        className="animate-in data-[state=delayed-open]:slide-in-from-bottom-4 data-[state=delayed-open]:data-[side=top]:fade-in-0 duration-300 select-none rounded-[4px] bg-white dark:bg-black px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
        side={"top"}
        align={"center"}
        sideOffset={5}
    >
        {children}
        <Tooltip.Arrow className="fill-white dark:fill-black"/>
    </Tooltip.Content>
);

const Tip = (
    {
        children,
        TipTitle,
    }: {
        children: React.ReactNode;
        TipTitle: string;
    }) => (
    <Tooltip.Provider>
        <Tooltip.Root>
            <TipTrigger>{children}</TipTrigger>
            <Tooltip.Portal>
                <TipContent>{TipTitle}</TipContent>
            </Tooltip.Portal>
        </Tooltip.Root>
    </Tooltip.Provider>
);
