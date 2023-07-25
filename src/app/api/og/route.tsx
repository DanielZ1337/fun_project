import {ImageResponse} from "next/server";

export const runtime = 'edge'

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    return new ImageResponse(
        (
            // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

            <div tw='flex h-full w-full items-center justify-center tracking-tight font-base font-bold bg-white'>
                <div tw='absolute flex items-center left-0 -top-1'>
                    <span tw='bg-black w-10 h-10'/>
                    <span tw='ml-2 text-2xl'>
                        {owner}
                    </span>
                </div>
                <div
                    tw='flex text-center justify-center w-auto bg-black text-white leading-6 max-w-xl text-5xl flex-wrap py-5 px-12 my-10 mx-auto'>
                    <span tw='leading-6 text-3xl font-normal bg-clip-text' style={{
                        /* purple black gradient background */
                        backgroundImage: 'linear-gradient(90deg, #805ad5 0%, #6b46c1 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}>
                        {repo}
                    </span>
                </div>
            </div>

        ),
        {
            width: 1200,
            height: 630,
        },
    );
}