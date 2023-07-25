'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {motion} from "framer-motion";
import {useState} from "react";
import {cn} from "@/lib/utils";

type RootProps = {
    titles: string[]
    defaultTab?: string
    className?: string
    children: React.ReactNode
}

export function RepositoryFormTabs({titles, defaultTab, children, className}: RootProps) {
    const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab)

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className={cn('w-full', className)}
        >
            <TabsList asChild>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className={"w-full sm:w-fit overflow-x-auto sm:overflow-hidden divide-x dark:divide-purple-900 divide-purple-300 rounded-md"}
                >
                    {titles.map((title) => (
                        <TabsTrigger value={title} key={title} className={"relative"}>
                            {title === activeTab && (
                                <motion.div
                                    layoutId={"active-tab"}
                                    className={"absolute -bottom-1 left-0 right-0 h-0.5 dark:bg-purple-700 bg-purple-500 rounded-t-full"}
                                    transition={{duration: 0.2}}
                                />
                            )}
                            <span className={"text-sm font-medium relative z-10"}>
                                    {title}
                                </span>
                        </TabsTrigger>
                    ))}
                </motion.div>
            </TabsList>
            <div className={"flex items-center justify-center w-full p-10"}>
                {children}
            </div>
        </Tabs>
    )
}

type ContentProps = {
    title: string
    className?: string
    children: React.ReactNode
}

export function RepositoryFormTabsContent({title, children, className}: ContentProps) {
    return (
        <TabsContent value={title} className={cn('', className)}>
            {children}
        </TabsContent>
    )
}

