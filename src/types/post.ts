import Author from './author'

export type Post = {
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
    backlinks?:{
        to?: string[]
        from?: string[]
    }
}

export default Post
