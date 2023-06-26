import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: { owner: string, repo: string, branch: string, params: string[] }
    }
) {
    const {owner, repo, branch} = params
    const searchParams = request.nextUrl.searchParams

    const repoTree = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}:${searchParams.has('recursive') ? `?recursive=${searchParams.get('recursive')}` : ''}`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch(error => error.response)

    return NextResponse.json({status: repoTree.status, statusText: repoTree.statusText, data: repoTree.data})
}