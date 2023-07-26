import {Session} from "next-auth";
import axios from "axios";
import Post from "@/types/post";
import matter from "gray-matter";
import moment from "moment/moment";
import RemoveMarkdown from "remove-markdown";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import {GitHubTreeResponse} from "@/types/github-reponses";

interface getTreeProps {
    owner: string;
    repo: string;
    recursive: boolean;
    token?: string;
    session?: Session;
}

async function getTree({owner, repo, recursive, token, session}: getTreeProps) {
    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?${recursive && 'recursive=1'}`, {
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        },
    }) as { data: GitHubTreeResponse }

    return data.tree.filter((file) => file.path.includes('.md'))
}

interface getRawProps {
    owner: string;
    repo: string;
    path: string;
    token?: string;
    session?: Session;
}

async function getRaw({owner, repo, path, token, session}: getRawProps): Promise<string> {
    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            Accept: "application/vnd.github.raw",
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        },
    });

    return data;
}

interface getCommitProps {
    owner: string;
    repo: string;
    path: string;
    token?: string;
    session?: Session;
    per_page?: number;
}

async function getCommit({owner, repo, token, session, path, per_page}: getCommitProps): Promise<any> {
    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        },
        params: {
            path: path,
            per_page: per_page ? per_page : 1,
        },
    });

    return data;
}

interface getGithubFileProps {
    owner: string;
    repo: string;
    path: string;
    token?: string;
    session?: Session;
}

async function getGithubFile({owner, repo, path, token, session}: getGithubFileProps) {
    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        }
    })

    return data.download_url;
}


interface getNotesDataProps {
    owner: string;
    repo: string;
    token?: string;
    session?: Session;
}

export async function getNotesData({owner, repo, token, session}: getNotesDataProps): Promise<Post[]> {
    const tree = await getTree({owner, repo, recursive: true, token, session})
    const rawFiles = await Promise.all(tree.map((file) => getRaw({owner, repo, path: file.path, token, session})))
    const posts = await Promise.all(rawFiles.map((raw, index) => rawFileToPost(raw, owner, repo, tree[index].path, token, session)))
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

export async function rawFileToPost(raw: string, owner: string, repo: string, path: string, token?: string, session?: Session): Promise<Post> {
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

        if (!data.date || !data.updatedAt || !data.author) {
            const commit = await getCommit({owner, repo, path, token, session})
            if (!data.date) {
                data.date = commit[0].commit.author.date
            }
            if (!data.updatedAt) {
                data.updatedAt = commit[0].commit.author.date
            }
            if (!data.author) {
                data.author = {
                    name: commit[0].commit.author.name,
                    picture: commit[0].author.avatar_url,
                }
            }
        }

        if (content) {
            // if a link is in the github repository or a relative link, replace it with the raw github link
            // const repositoryLink = /\((?!http(s)?:\/\/)([^\(\)]+)\)/g
            // const repositoryLink = /(!?\[.*]\((?!http(s)?:\/\/)([^\(\)]+)\)|\[\[(?!http(s)?:\/\/)([^\(\)]+)\]\])/g
            const repositoryLink = /\[.*]\((?!http(s)?:\/\/)([^\(\)]+)\)/g
            const matches = Array.from(content.matchAll(repositoryLink))
            for (const m of matches) {
                // if the link matches a media file (image, video) in the github repository
                if (m[2].toLowerCase().match(/.*\.(png|jpg|jpeg|gif|mp4|webm|ogg|mp3|wav|svg)$/g)) {
                    const originalLink = m[2]
                    // take path into consideration (e.g. /posts/2021-01-01-post-name)

                    if (m[2].startsWith('/')) {
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
                    }

                    // console.log(path)
                    const filePath = path.split('/').slice(0, -1).join('/')
                    try {
                        const link = await getGithubFile({owner, repo, path: `${filePath}/${m[2]}`, token, session})
                        content = content.replace(originalLink, link)
                    } catch (e) {
                        // console.log(m[2])
                        content = content.replace(originalLink, '')
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
        // console.log(e)
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
