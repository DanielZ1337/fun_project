import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export function useMarkdownContent(username: string, repositoryName: string, slug: string[], token: string) {
    return useQuery(['content', username, repositoryName, slug.join('/')], async () => {
        const {data} = await axios.get(
            `http://api.github.com/repos/${username}/${repositoryName}/contents/${slug.join('/')}.md`,
            {
                headers: {
                    Accept: 'application/vnd.github.raw',
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return data as string
    })
}
