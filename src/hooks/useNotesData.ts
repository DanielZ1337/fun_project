import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Post from "@/types/post";


export function useNotesData(owner: string, repository: string, token?: string) {
    return useQuery(['notesData', owner, repository, token], async () => {
        const data = await axios.get('/api/notes', {
            params: {
                owner,
                repo: repository,
                token,
            }
        })

        return data.data as Post[];
    }, {
        retry: false,
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        refetchOnReconnect: process.env.NODE_ENV !== 'development',
        refetchOnMount: process.env.NODE_ENV !== 'development',
    })
}