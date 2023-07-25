import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import axios, {AxiosError} from "axios";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const path = searchParams.get("path");
    const token = searchParams.get("token");
    const session = await getServerSession(authOptions);

    if (!owner || !repo || !path) return new Response("Missing parameters", {status: 400});
    try {
        const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
            }
        })
        return new Response(JSON.stringify(data), {status: 200});
    } catch (e) {
        if (e instanceof AxiosError) {
            return new Response(e.response?.statusText, {status: e.response?.status});
        } else {
            return new Response('An unknown error occurred', {status: 500});
        }
    }
}