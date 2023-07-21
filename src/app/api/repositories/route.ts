import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import axios from "axios";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const owner = searchParams.get("username");
    const session = await getServerSession(authOptions);

    if (session && !owner) {
        const repos = await getReposByToken(session.user.accessToken);

        if (repos.status === 401) {
            return new Response("Bad credentials", {status: 401});
        }

        if (repos.status !== 200) {
            return new Response("Error fetching repos", {status: repos.status});
        }
        return new Response(JSON.stringify(repos.data), {status: 200});
    }

    if (owner) {
        const repos = await getPublicReposByUsername(owner);
        return new Response(JSON.stringify(repos), {status: 200});
    }

    return new Response("Not a valid request. Please login or enter a owner", {status: 400});

}

async function getReposByToken(token: string) {
    return await axios.get("https://api.github.com/user/repos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res).catch(err => err.response);
}

async function getPublicReposByUsername(username: string) {
    const {data} = await axios.get(`https://api.github.com/users/${username}/repos`);
    return data
}