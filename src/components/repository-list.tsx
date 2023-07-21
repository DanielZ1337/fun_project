'use client'

import {GitHubRepositoryResponse} from "@/types/github-reponses";
import {useSession} from "next-auth/react";
import {useRepositoriesWithUsername} from "@/hooks/useRepositories";

interface Props {
    username?: string | undefined
}

export const RepositoryList = ({username = undefined}: Props) => {
    const {data: Session} = useSession()
    const {data, isLoading} = useRepositoriesWithUsername(username ? username : Session?.user?.name!)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error</div>
    }

    return (
        <>
            {data.map((repository: GitHubRepositoryResponse) => (
                <div key={repository.id}>
                    <p>{repository.name}</p>
                </div>
            ))}
        </>
    )
}
