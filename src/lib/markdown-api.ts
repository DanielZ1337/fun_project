import axios from 'axios'
// import remarkFrontmatter from 'remark-frontmatter'
// import rehypeKatex from 'rehype-katex'
// import rehypeMathjax from 'rehype-mathjax'
import {GitHubTreeItemResponse, GitHubTreeResponse} from "@/types/github-reponses";
import matter from "gray-matter";
import RemoveMarkdown from "remove-markdown";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import moment from "moment";

export async function getRawFile(owner: string, repo: string, path: string, token?: string): Promise<string> {
    const {data} = await axios.get('http://localhost:3000/api/raw', {
        params: {
            owner,
            repo,
            path,
            token
        }
    })

    return data
}

export async function getAllMarkdownFiles(owner: string, repo: string, token?: string): Promise<GitHubTreeItemResponse[]> {
    const {data} = await axios.get('http://localhost:3000/api/tree', {
        params: {
            owner,
            repo,
            recursive: true,
            token
        }
    }) as { data: GitHubTreeResponse }

    return data.tree.filter((file) => file.path.includes('.md'))
}

export async function getAllData(owner: string, repo: string, token?: string) {
    const files = await getAllMarkdownFiles(owner, repo, token)
    const rawFiles = await Promise.all(files.map((file) => getRawFile(owner, repo, file.path, token)))
    const posts = Promise.all(rawFiles.map((raw, index) => rawFileToPost(raw, owner, repo, files[index].path, token)))
    const backLinks = await getAllBackLinks((await posts).map((post) => ({slug: post.slug, markdown: post.markdown})))
    const postsWithBackLinks = (await posts).map((post) => {
        return {
            ...post,
            backLinks: {
                to: backLinks.get(post.slug),
                from: Array.from(backLinks.entries()).filter(([, links]) => links.includes(post.slug)).map(([slug]) => slug)
            }
        }
    })

    console.log(postsWithBackLinks)

    return postsWithBackLinks
}

export async function getAllBackLinks(posts: { slug: string, markdown: string }[]) {
    const linksMapping = new Map<string, string[]>()
    const postsMapping = new Map(posts.map((i) => [i.slug, i.markdown]))
    const allSlugs = new Set(postsMapping.keys())

    postsMapping.forEach((content, slug) => {
        const mdLink = /\[[^\[\]]+\]\(((?!http(s)?:\/\/)[^\(\)]+)\)/g
        const matches = Array.from(content.matchAll(mdLink))
        const linkSlugs = []
        for (const m of matches) {
            const linkSlug = getSlugFromHref(slug, m[1])
            if (allSlugs.has(linkSlug)) {
                linkSlugs.push(linkSlug)
            }
        }
        linksMapping.set(slug, linkSlugs)
    })

    return linksMapping
}

/*export async function getAllBackLinks(owner: string, repo: string, token?: string) {
    const linksMapping = new Map<string, string[]>()
    const postsMapping = new Map((await getAllMarkdownFiles(owner, repo, token)).map((i) => [i.path, i.path]))
    const allSlugs = new Set(postsMapping.keys())
    console.log(allSlugs);
    postsMapping.forEach((content, slug) => {
        const mdLink = /\[[^\[\]]+\]\(((?!http(s)?:\/\/)[^\(\)]+)\)/g
        const matches = Array.from(content.matchAll(mdLink))
        const linkSlugs = []
        for (const m of matches) {
            const linkSlug = getSlugFromHref(slug, m[1])
            if (allSlugs.has(linkSlug)) {
                linkSlugs.push(linkSlug)
            }
        }
        linksMapping.set(slug, linkSlugs)
    })

    return linksMapping
}*/

export function getSlugFromHref(currSlug: string, href: string) {
    return href.replace(/\.md$/, '')
    /* console.log(decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, ''))
    return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, '') */
}

export async function rawFileToPost(raw: string, owner: string, repo: string, path: string, token?: string) {
    const {data, content} = matter(raw)

    if (data.date) {
        data.date = moment(new Date(data.date)).toISOString()
    }

    if (data.updatedAt) {
        data.updatedAt = moment(new Date(data.updatedAt)).toISOString()
    }

    // if no title is defined in the metadata, use the filename as title
    if (!data.title) {
        // Remove the '.md' extension
        data.title = path.replace(/\.md$/, '')
        // if (filename.includes('-') && filename.includes(' ')) {
        // 	data.title = filename.replace(/-/g, ' ')
        // 	data.title = data.title.replace(/\w\S*!/g, (w: string) => w.replace(/^\w/, (c: string) => c.toUpperCase()))
        // }

        // if (filename.includes('-')) {
        // 	data.title = filename.replace(/-/g, ' ')
        // }

        // if (filename.includes(' ')) {
        // 	data.title = filename.replace(/\w\S*!/g, (w: string) => w.replace(/^\w/, (c: string) => c.toUpperCase()))
        // }

        // if (!filename.includes('-') && !filename.includes(' ')) {
        // 	data.title = filename
        // }
    }

    if (!data.excerpt) {
        data.excerpt = RemoveMarkdown(
            unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .processSync(content)
                .toString()
                .replace(/<[^>]*>?/gm, '')
        ).substring(0, 500)
    }

    if (!data.date) {
        const {data: commit} = await axios.get('http://localhost:3000/api/commits', {
            params: {
                owner,
                repo,
                path,
                token
            },
        })
        data.date = commit[0].commit.author.date
    }

    if (!data.updatedAt) {
        const {data: commit} = await axios.get('http://localhost:3000/api/commits', {
            params: {
                owner,
                repo,
                path,
                token
            },
        })
        data.updatedAt = commit[0].commit.author.date
    }

    if (!data.author) {
        const {data: commit} = await axios.get('http://localhost:3000/api/commits', {
            params: {
                owner,
                repo,
                path,
                token
            },
        })
        data.author = {
            name: commit[0].commit.author.name,
            picture: commit[0].author.avatar_url,
        }
    }

    if (content) {
        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkToc)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeSlug)
            // .use(rehypeMathjax)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(content)

        data.content = processedContent.toString()
    }

    return {
        slug: path.replace(/\.md$/, ''),
        metadata: {
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            updatedAt: data.updatedAt,
            author: data.author,
            tags: data.tags,
            cover: data.cover,
            ogImage: data.ogImage,
        },
        html: data.content,
        markdown: content,
    }
}


/*export async function getAllPosts(owner: string, repo: string): Promise<Post[]> {
    const {data} = await axios.get('/api/tree', {
        params: {
            owner,
            repo,
            recursive: true,
        }
    }) as { data: GitHubTreeResponse }

    const posts = data.tree
        .filter((file) => file.path.includes('.md'))
        .map((file) => getPost(owner, repo, file.path))

    return Promise.all(posts)
}

export async function getPost(owner: string, repo: string, path: string): Promise<Post> {
    const rawFile = await getRawFile(owner, repo, path)
    const {data, content} = matter(rawFile)

    if (data.date) {
        data.date = moment(new Date(data.date)).toISOString()
    }

    if (data.updatedAt) {
        data.updatedAt = moment(new Date(data.updatedAt)).toISOString()
    }

    // if no title is defined in the metadata, use the filename as title
    if (!data.title) {
        // Remove the '.md' extension
        data.title = path.replace(/\.md$/, '')
        // if (filename.includes('-') && filename.includes(' ')) {
        // 	data.title = filename.replace(/-/g, ' ')
        // 	data.title = data.title.replace(/\w\S*!/g, (w: string) => w.replace(/^\w/, (c: string) => c.toUpperCase()))
        // }

        // if (filename.includes('-')) {
        // 	data.title = filename.replace(/-/g, ' ')
        // }

        // if (filename.includes(' ')) {
        // 	data.title = filename.replace(/\w\S*!/g, (w: string) => w.replace(/^\w/, (c: string) => c.toUpperCase()))
        // }

        // if (!filename.includes('-') && !filename.includes(' ')) {
        // 	data.title = filename
        // }
    }

    if (!data.excerpt) {
        data.excerpt = RemoveMarkdown(
            unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .processSync(content)
                .toString()
                .replace(/<[^>]*>?/gm, '')
        ).substring(0, 500)
    }

    if (!data.date) {
        const {data: commit} = await axios.get('/api/commits', {
            params: {
                owner,
                repo,
                path,
            },
        })
        data.date = commit[0].commit.author.date
    }

    if (!data.updatedAt) {
        const {data: commit} = await axios.get('/api/commits', {
            params: {
                owner,
                repo,
                path,
            },
        })
        data.updatedAt = commit[0].commit.author.date
    }

    if (!data.author) {
        const {data: commit} = await axios.get('/api/commits', {
            params: {
                owner,
                repo,
                path,
            },
        })
        data.author = {
            name: commit[0].commit.author.name,
            picture: commit[0].author.avatar_url,
        }
    }

    if (content) {
        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkToc)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeSlug)
            // .use(rehypeMathjax)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(content)

        data.content = processedContent.toString()
    }

    return {
        slug: path.replace(/\.md$/, ''),
        metadata: {
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            updatedAt: data.updatedAt,
            author: data.author,
            tags: data.tags,
            cover: data.cover,
            ogImage: data.ogImage,
        },
        html: data.content,
        markdown: content,
    }
}

export async function getLinkMappings(owner: string, repo: string) {
    const linksMapping = new Map<string, string[]>()
    const postsMapping = new Map((await getAllPosts(owner, repo)).map((i) => [i.slug, i.markdown]))
    const allSlugs = new Set(postsMapping.keys())
    console.log(linksMapping);
    console.log(postsMapping);
    console.log(allSlugs);
    postsMapping.forEach((content, slug) => {
        const mdLink = /\[[^\[\]]+\]\(((?!http(s)?:\/\/)[^\(\)]+)\)/g
        const matches = Array.from(content.matchAll(mdLink))
        const linkSlugs = []
        for (const m of matches) {
            const linkSlug = getSlugFromHref(slug, m[1])
            if (allSlugs.has(linkSlug)) {
                linkSlugs.push(linkSlug)
            }
        }
        linksMapping.set(slug, linkSlugs)
    })

    return linksMapping
}

export function getSlugFromHref(currSlug: string, href: string) {
    return href.replace(/\.md$/, '')
    /!* console.log(decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, ''))
    return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, '') *!/
}*/

