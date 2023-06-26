import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBase64 = async (content: string) => {
    return JSON.stringify(content).replaceAll(/\\n/g, '').slice(1, -1)
}