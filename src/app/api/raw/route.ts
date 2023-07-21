import axios, {AxiosError} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export const revalidate = 60

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const path = searchParams.get('path')
    const token = searchParams.get('token')
    const session = await getServerSession(authOptions)

    if (!owner || !repo || !path) return new Response('Missing parameters', {status: 400})

    try {
        const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                Accept: 'application/vnd.github.raw',
                Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
            }
        })
        return new Response(JSON.stringify(data), {status: 200})
    } catch (error) {
        if (error instanceof AxiosError) {
            return new Response(error.response?.statusText, {status: error.response?.status})
        }
    }
}