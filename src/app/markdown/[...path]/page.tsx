import axios from "axios";
import ParseMarkdown from "@/components/parse-markdown";

export default async function Page(
    {params}: { params: { path: string[] } }
) {

    console.log(params.path)

    const res = (await axios.get(`http://localhost:3000/api/blob/${params.path.join('/')}`)).data

    const markdown = atob(res.data)

    return (
        <>
            <h1>Markdown test</h1>

            <ParseMarkdown code={markdown}/>
        </>
    )
}