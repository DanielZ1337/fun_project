import axios from "axios";
import {getBase64} from "@/lib/utils";
import {NextResponse} from "next/server";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { params: string[] }
    }
) {
    const slug = params.params // 'a', 'b', or 'c'
    if (slug.length !== 3) return new Response('Invalid params', {status: 400})

    const blob = await axios.get(`https://api.github.com/repos/${slug[0]}/${slug[1]}/git/blobs/${slug[2]}`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch(error => error.response)

    return NextResponse.json({
        status: blob.status,
        statusText: blob.statusText,
        data: (blob.status === 200 ? await getBase64(blob.data.content) : blob.data)
    })
}