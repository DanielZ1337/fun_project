"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {motion} from "framer-motion";
import {Computer, Moon, Sun} from "@/components/Icons";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {resolvedTheme, theme, setTheme} = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu.Root onOpenChange={setOpen}>
            <DropdownMenu.Trigger
                className={
                    "flex outline-none hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 rounded-lg"
                }
            >
                <p className={"mr-2"}>Theme</p>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    animate={open ? {rotate: 180} : {rotate: 0}}
                >
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                    />
                </motion.svg>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={"border border-neutral-950/20 dark:border-neutral-50/20 dark:bg-neutral-950 bg-white p-4 rounded-lg mt-4 shadow-xl"}
                >
                    <DropdownMenu.RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className={"flex flex-col gap-2"}
                    >
                        <Item value={"system"}>
                            <Computer className={"w-6 h-6"}/>
                            &nbsp;System
                        </Item>
                        <Item value={"light"}>
                            <Sun className={"w-6 h-6"}/>
                            &nbsp;Light
                        </Item>
                        <Item value={"dark"}>
                            <Moon className={"w-6 h-6"}/>
                            &nbsp;Dark
                        </Item>
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
ThemeSwitcher.displayName = "ThemeSwitcher";

const Item = ({
    children,
    value,
    ...props
}: {
    children: React.ReactNode;
    value: string;
}) => {
    return (
        <DropdownMenu.RadioItem
            className={
                "dark:bg-neutral-950 p-4 my-0.5 rounded-md flex dark:hover:bg-slate-800 hover:bg-slate-200 outline-offset-2 outline-none focus:outline-purple-500 hover:outline-2 hover:outline-purple-500/50 data-[state=checked]:bg-purple-300 dark:data-[state=checked]:bg-purple-800 transition-colors duration-200 ease-in-out"
            }
            value={value}
            {...props}
        >
            {children}
        </DropdownMenu.RadioItem>
    );
};

export default ThemeSwitcher;
