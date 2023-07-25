import Link from "next/link";

interface Props {
    owner: string
    repo: string
    title: string
    excerpt: string
    slug: string
}

export default function BacklinkNavigationMenuPreview({owner, repo, title, excerpt, slug}: Props) {
    return (
        <Link href={`/notes/${owner}/${repo}/${slug}`}
              className='block p-4 border border-gray-200 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900'>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <p className='mt-1 text-sm text-gray-500'>{excerpt}</p>
        </Link>
    )
}