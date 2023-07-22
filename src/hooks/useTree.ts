import {useQuery} from "@tanstack/react-query";
import axios from "axios";


type GitHubTreeItem = {
    name: string
    path: string
    mode: string
    type: 'blob' | 'tree'
    sha: string
    size?: number
    url: string
    children?: GitHubTreeItem[]
}

type GitHubRootTree = {
    sha: string
    url: string
    truncated: boolean
    children: GitHubTreeItem[]
}


export default function useTree(owner: string, repo: string, recursive: boolean = true, token?: string) {
    return useQuery({
        queryKey: ['github-tree', owner, repo, recursive],
        queryFn: async () => {
            const {data} = await axios.get('/api/tree', {
                params: {
                    owner,
                    repo,
                    recursive,
                    token,
                },
            })


            return data as GitHubRootTree
        },
    })
}