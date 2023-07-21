import {useQuery} from "@tanstack/react-query";
import {getLinkMappings} from "@/lib/markdown-api";

export function useLinkMappings(owner: string, repository: string) {
    return useQuery(['linksMapping', owner, repository], async () => {
        return await getLinkMappings(owner, repository)
    })
}