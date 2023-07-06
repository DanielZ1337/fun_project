import {useState} from "react";
import {GitHubRepositoryResponse} from "@/types/github-reponses";

interface Props {
    username: string | undefined
}

export const RepositoryList = async ({username = undefined}: Props) => {
    const [repositories, setRepositories] = useState<GitHubRepositoryResponse[]>([]);

}

RepositoryList.displayName = "RepositoryList"
