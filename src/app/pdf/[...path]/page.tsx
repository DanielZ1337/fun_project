import axios from "axios";

export default async function Page({params}: { params: { path: string[] } }) {

    const repoTree = (await axios.get(`http://localhost:3000/api/blob/${params.path.join('/')}`)).data

    console.log(repoTree.data)

    return (
        /*<iframe title="pdf" src={blob}
                className={"absolute top-0 left-0 w-screen h-screen"}/>*/
        <iframe src={`data:application/pdf;base64,${repoTree.data}`}
                className={"absolute top-0 left-0 w-screen h-screen"}/>
    );
}