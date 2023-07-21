import Author from './author'

type Post = {
    slug: string
    metadata: {
        title: string
        excerpt: string
        date?: string
        updatedAt?: string
        author?: Author
        tags?: string[]
        cover?: {
            url: string
        }
        ogImage?: {
            url: string
        }
    }
    html: string
    markdown: string
}

export default Post
