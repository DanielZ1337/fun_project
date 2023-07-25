import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export function useTest(owner: string, repo: string, token?: string) {
    return useQuery(["test", owner, repo, token], async () => {
        const {data} = await axios.get(`/api/test`);
        return data;
    }, {
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        refetchOnReconnect: process.env.NODE_ENV !== 'development',
        refetchOnMount: process.env.NODE_ENV !== 'development',
    });
}