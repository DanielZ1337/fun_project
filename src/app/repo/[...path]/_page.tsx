import axios from "axios";
import Link from "next/link";

/*export async function generateStaticParams() {


    const recursive = (await axios.get('https://api.github.com/repos/DanielZ1337/Obsidian-SDU/git/trees/main?recursive=true', {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': 'Bearer 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',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data.tree.filter((value: any) => value.type === 'tree').map((value: any) => value.path.split('/').map((value: string) => encodeURIComponent(encodeURIComponent(encodeURIComponent(value)))))

    return recursive.map((value: string[]) => ({path: value}))

}*/

export default async function Page({params}: { params: { path: string[] } }) {


    const parsedPaths = params.path.map((value) => encodeURIComponent(value))


    const repoTree = (await axios.get(`http://localhost:3000/api/tree/DanielZ1337/Obsidian-SDU/main/${parsedPaths.join('/')}`)).data


    return <>
        <Link href={'/repo/' + params.path.map((value) => encodeURIComponent(value)).slice(0, -1).join("/")}>
            {'<--'} Back
        </Link>
        {repoTree.data.tree.map((value: any) => {
            if (value.type === 'tree') {
                return <Link
                    href={`/repo/${params.path.map((value, index) => encodeURIComponent(value)).join('/')}/${encodeURIComponent(encodeURIComponent(encodeURIComponent(value.path)))}`}
                    key={value.path}>
                    <p>{value.path}</p>
                </Link>
            } else {
                if (value.path.endsWith('.md')) {
                    return <Link
                        href={`/markdown/DanielZ1337/Obsidian-SDU/${encodeURIComponent(encodeURIComponent(encodeURIComponent(value.sha)))}`}
                        key={value.path}>
                        <p>{value.path}</p>
                    </Link>
                } else if (value.path.endsWith('.pdf')) {
                    return <Link
                        href={`/pdf/${params.path.map((value, index) => encodeURIComponent(value)).join('/')}/${encodeURIComponent(encodeURIComponent(encodeURIComponent(value.path)))}`}
                        key={value.path}>
                        <p>{value.path}</p>
                    </Link>
                } else if (value.path.endsWith('.json')) {


                } else if (value.path.endsWith('.png')) {

                }
            }
        })
        }
    </>
}