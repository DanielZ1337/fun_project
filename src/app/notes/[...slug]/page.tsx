import NotesComponent from "@/app/notes/[...slug]/notes-component";
import {Metadata} from "next";

export async function generateMetadata({params, searchParams}: {
    params: { slug: string[] },
    searchParams: URLSearchParams
}): Promise<Metadata> {
    // read route params
    const {slug} = params;
    const owner = slug[0]
    const repo = slug[1]

    return {
        title: `${owner}/${repo} - Notes`,
        description: `Notes for ${owner}/${repo}`,
        twitter: {
            card: 'summary_large_image',
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: `https://fun-project-tau.vercel.app/notes/${owner}/${repo}`,
            title: `${owner}/${repo} - Notes`,
            description: `Notes for ${owner}/${repo}`,
            images: [
                {
                    url: `/api/og?owner=${owner}&repo=${repo}`,
                    width: 1200,
                    height: 630,
                    alt: `${owner}/${repo} - Notes`,
                },
            ],
            siteName: 'GitHub Repository Browser',
        },
    };
}

export default function Page({params}: { params: { slug: string[] } }) {
    return (
        <NotesComponent params={params}/>
    )
}