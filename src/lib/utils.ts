import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBase64 = async (content: string) => {
    return JSON.stringify(content).replaceAll(/\\n/g, '').slice(1, -1)
}

export function getValidChildren(children: React.ReactNode) {
    return React.Children.toArray(children).filter((child) =>
        React.isValidElement(child)
    ) as React.ReactElement[]
}