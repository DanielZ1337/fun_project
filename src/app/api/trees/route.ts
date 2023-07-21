import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import axios, {AxiosError} from "axios";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const recursive = searchParams.has('recursive')
    const token = searchParams.get('token')
    const session = await getServerSession(authOptions)

    if (!owner || !repo) return new Response('Missing parameters', {status: 400})

    try {
        const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?${recursive && 'recursive=1'}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
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