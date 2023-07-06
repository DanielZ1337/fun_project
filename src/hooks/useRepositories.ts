import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {GitHubRepositoryResponse} from "@/types/github-reponses";

export function useRepositoriesWithUsername(username: string) {
    return useQuery(["repositories", username], async () => {
        const {data} = await axios.get(`/api/repositories?username=${username}`);
        return data as GitHubRepositoryResponse[];
    });
}

export function useRepositoriesWithToken() {
    return useQuery(["repositories"], async () => {
        const {data} = await axios.get(`/api/repositories`);
        return data as GitHubRepositoryResponse[];
    });
}