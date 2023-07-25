import {useQuery} from "@tanstack/react-query";
import {getAllNotesData} from "@/lib/markdown-api";


export function useNotesData(owner: string, repository: string, token?: string) {
    return useQuery(['notesData', owner, repository, token], async () => {
        return await getAllNotesData(owner, repository, token)
    }, {
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        refetchOnReconnect: process.env.NODE_ENV !== 'development',
        refetchOnMount: process.env.NODE_ENV !== 'development',
    })
}