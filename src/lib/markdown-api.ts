import axios from 'axios'
// import remarkFrontmatter from 'remark-frontmatter'
// import rehypeKatex from 'rehype-katex'
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
import moment from "moment";
import Post from "@/types/post";
import rehypeHighlight from "rehype-highlight";

async function getImageFromGitHub(owner: string, repo: string, path: string, token?: string): Promise<string | undefined> {
    try {
        const {data} = await axios.get('/api/github', {
            params: {
                owner,
                repo,
                path,
                token
            }
        })

        return data.download_url
    } catch (e) {
        return undefined
    }
}

export async function getRawFile(owner: string, repo: string, path: string, token?: string): Promise<string | undefined> {
    try {
        const {data} = await axios.get(`/api/raw`, {
            params: {
                owner,
                repo,
                path,
                token
            }
        })

        return data
    } catch (e) {
        return undefined
    }
}

export async function getAllMarkdownFiles(owner: string, repo: string, token?: string): Promise<GitHubTreeItemResponse[] | undefined> {
    try {
        const {data} = await axios.get(`/api/tree`, {
            params: {
                owner,
                repo,
                recursive: true,
                token
            }
        }) as { data: GitHubTreeResponse }

        return data.tree.filter((file) => file.path.includes('.md'))
    } catch (e) {
        return undefined
    }
}

export async function getAllNotesData(owner: string, repo: string, token?: string): Promise<Post[]> {
    const files = await getAllMarkdownFiles(owner, repo, token)
    if (!files) return Promise.resolve([])
    const rawFiles = await Promise.all(files.map((file) => getRawFile(owner, repo, file.path, token)))
    const posts = await Promise.all(rawFiles.map((raw, index) => rawFileToPost(raw!, owner, repo, files[index].path, token)))
    const backLinks = await getAllBackLinks((posts).map((post) => ({slug: post.slug, markdown: post.markdown})))
    const postsWithBackLinks = (posts).map((post) => {
        return {
            ...post,
            backlinks: {
                to: backLinks.get(post.slug),
                from: Array.from(backLinks.entries()).filter(([, links]) => links.includes(post.slug)).map(([slug]) => slug)
            }
        }
    })

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

export function getSlugFromHref(currSlug: string, href: string) {
    return href.replace(/\.md$/, '')
    /* console.log(decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, ''))
    return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, '') */
}

export async function rawFileToPost(raw: string, owner: string, repo: string, path: string, token?: string): Promise<Post> {
    try {
        let {data, content} = matter(raw)

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
            const {data: commit} = await axios.get(`/api/commits`, {
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
            const {data: commit} = await axios.get(`/api/commits`, {
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
            const {data: commit} = await axios.get(`/api/commits`, {
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
            // if a link is in the github repository or a relative link, replace it with the raw github link
            const repositoryLink = /\((?!http(s)?:\/\/)([^\(\)]+)\)/g
            const matches = Array.from(content.matchAll(repositoryLink))
            for (const m of matches) {
                // if the link matches a media file (image, video) in the github repository
                if (m[2].toLowerCase().match(/.*\.(png|jpg|jpeg|gif|mp4|webm|ogg|mp3|wav)$/g)) {
                    // console.log(m[2])
                    // take path into consideration (e.g. /posts/2021-01-01-post-name)

                    /*if (m[2].startsWith('/')) {
                        m[2] = m[2].substring(1)
                    }

                    if (m[2].startsWith('./')) {
                        m[2] = m[2].substring(2)
                    }

                    if (m[2].startsWith('../')) {
                        m[2] = m[2].substring(3)
                    }

                    if (m[2].startsWith('..')) {
                        m[2] = m[2].substring(2)
                    }

                    if (m[2].startsWith('.')) {
                        m[2] = m[2].substring(1)
                    }*/

                    const filePath = path.split('/').slice(0, -1).join('/')
                    const link = await getImageFromGitHub(owner, repo, `${filePath}/${m[2]}`, token)
                    if (!link) {
                        content = content.replace(m[2], '')
                    } else {
                        content = content.replace(m[2], link)
                    }
                }

                if (m[2].toLowerCase().endsWith('.md')) {
                    const linkWithoutMD = m[2].replace(/\.md$/, '')
                    content = content.replace(m[2], `${linkWithoutMD}${token ? `?token=${token}` : ''}`)
                }
            }


            const processedContent = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkToc)
                .use(remarkMath)
                .use(remarkRehype)
                .use(rehypeSlug)
                // .use(rehypeMathjax)
                // .use(rehypeHighlight)
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
    } catch (e) {
        return {
            slug: path.replace(/\.md$/, ''),
            metadata: {
                title: '',
                excerpt: '',
                date: '',
                updatedAt: '',
                author: {
                    name: '',
                    picture: '',
                },
                tags: [],
                cover: {
                    url: '',
                },
                ogImage: {
                    url: '',
                },
            },
            html: '',
            markdown: '',
        }
    }
}

