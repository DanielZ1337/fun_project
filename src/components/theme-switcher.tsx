"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {motion} from "framer-motion";
import {ComputerIcon, MoonIcon, SunIcon} from "@/components/icons";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {resolvedTheme, theme, setTheme} = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu.Root modal={false} onOpenChange={setOpen}>
            <DropdownMenu.Trigger
                className={
                    "flex outline-none hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 rounded-lg data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-900"
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
                    animate={open ? {rotate: 0} : {rotate: 180}}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
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
                    className={"border border-neutral-950/20 dark:border-neutral-50/20 dark:bg-neutral-950 bg-white p-4 rounded-lg mt-4 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"}
                >
                    <DropdownMenu.RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className={"flex flex-col gap-2"}
                    >
                        <Item value={"system"}>
                            <ComputerIcon/>
                            &nbsp;System
                        </Item>
                        <Item value={"light"}>
                            <SunIcon/>
                            &nbsp;Light
                        </Item>
                        <Item value={"dark"}>
                            <MoonIcon/>
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
                "dark:bg-neutral-950 p-4 my-0.5 rounded-md flex dark:hover:bg-neutral-800 hover:bg-neutral-200 outline-offset-2 outline-none focus:outline-purple-500 hover:outline-2 hover:outline-purple-500/50 data-[state=checked]:bg-purple-300 dark:data-[state=checked]:bg-purple-800 transition-colors duration-200 ease-in-out"
            }
            value={value}
            {...props}
        >
            {children}
        </DropdownMenu.RadioItem>
    );
};

export default ThemeSwitcher;
