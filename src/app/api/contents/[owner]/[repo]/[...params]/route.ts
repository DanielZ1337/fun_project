import axios from "axios";
import {NextResponse} from "next/server";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { owner: string, repo: string, params: string[] }
    }
) {
    const {owner, repo} = params
    const slug = params.params // 'a', 'b', or 'c'

    const contents = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${slug.join('/')}`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch(error => error.response)

    return NextResponse.json({status: contents.status, statusText: contents.statusText, data: contents.data})
}