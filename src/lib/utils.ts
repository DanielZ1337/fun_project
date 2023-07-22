import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getBaseUrl(){
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.VERCEL_URL!
}

export const getBase64 = async (content: string) => {
    return JSON.stringify(content).replaceAll(/\\n/g, '').slice(1, -1)
}

export function base64ToString(base64String: string): string {
    try {
        // Decode the base64 string into a Uint8Array
        const decodedBytes = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));

        // Convert Uint8Array to a regular string using UTF-8 encoding
        return new TextDecoder().decode(decodedBytes);
    } catch (error) {
        // If there's an error (e.g., invalid base64 input), handle it gracefully
        return `${error}`;
    }
}

export function getValidChildren(children: React.ReactNode) {
    return React.Children.toArray(children).filter((child) =>
        React.isValidElement(child)
    ) as React.ReactElement[]
}