import axios from "axios";
import Image from "next/image";

export default async function Page() {


    const repoTree = await axios.get(`https://api.github.com/repos/DanielZ1337/Obsidian-SDU/git/blobs/10ddb1a326513b31cf5ce13712f966ac49030720`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API}`,
            'X-GitHub-Api-Version': '2022-11-28'
        },
        responseType: 'blob'
    })


    return (
        /*<iframe title="pdf" src={blob}
                className={"absolute top-0 left-0 w-screen h-screen"}/>*/
        <Image src={`data:image/png;base64,${repoTree}`} width={500} height={500} alt="Red dot"/>
    );
}