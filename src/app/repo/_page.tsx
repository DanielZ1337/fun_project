import axios from "axios";
import Link from "next/link";

export default async function Repo() {

    const repoTree = (await axios.get('https://api.github.com/repos/DanielZ1337/Obsidian-SDU/git/trees/main', {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }))

    return (
        <>
            {repoTree.data.tree.map((value: any) => {
                if (value.type === 'tree') {
                    return <Link
                        href={'/repo/' + encodeURIComponent(encodeURIComponent(encodeURIComponent(value.path)))}
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
                            href={`/pdf/DanielZ1337/Obsidian-SDU/${encodeURIComponent(encodeURIComponent(encodeURIComponent(value.sha)))}`}
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
    )
}