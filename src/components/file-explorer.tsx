'use client'

import {useEffect, useState} from "react";
import useTree from "@/hooks/useTree";
import {DocumentIcon, FolderClosedIcon, FolderOpenIcon} from "@/components/icons";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

type GitHubTreeItem = {
    name: string
    path: string
    mode: string
    type: 'blob' | 'tree'
    sha: string
    size?: number
    url: string
    children?: GitHubTreeItem[]
}

type GitHubRootTree = {
    sha: string
    url: string
    truncated: boolean
    children: GitHubTreeItem[]
}

function FileExplorer() {
    const [tree, setTree] = useState<GitHubRootTree>()
    const [currentFolder, setCurrentFolder] = useState<GitHubTreeItem | GitHubRootTree>()

    const {data} = useTree('danielz1337', 'vop-exercises')

    useEffect(() => {
        if (data) {
            // @ts-ignore
            const treeData = generateFileExplorer(data?.data)

            setTree(treeData)
            setCurrentFolder(treeData)
        }
    }, [data])

    return (
        <>
            {tree && (
                <div className='-ml-5'>
                    <RecursiveComponent data={tree}/>
                </div>
            )}
        </>
    )
}

type NestedItem = {
    [key: string]: boolean
}

function RecursiveComponent({data}: any) {
    const [showNested, setShowNested] = useState<NestedItem>({})

    useEffect(() => {
        console.log(showNested);
    }, [showNested])

    const toggleNested = (name: string | number) => {
        // @ts-ignore
        setShowNested({...showNested, [name]: !showNested[name]})
    }

    //get owner and repo name
    const url = data.url.split('/')
    const owner = url[4]
    const repo = url[5]
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    return (
        <div style={{paddingLeft: '20px'}}>
            {data.children?.map((parent: GitHubTreeItem) => {
                return (
                    <div key={parent.path}>
                        {/* rendering folders */}
                        {parent.type === 'tree' &&
                            <button className={"flex gap-2"} onClick={() => toggleNested(parent.path)}>
                                {showNested[parent.path] ? <FolderOpenIcon/> : <FolderClosedIcon/>}
                                {parent.name}
                            </button>}
                        {/* rendering files */}
                        {parent.type === 'blob' && parent.name.endsWith('.md') && (
                            <Link href={`/notes/${owner}/${repo}/${parent.path}${token ? `?token=${token}` : ""}`.replace('.md', '')}
                                  className={"flex gap-2"}>
                                <DocumentIcon/>
                                {parent.name}
                            </Link>
                        )}
                        {/* @ts-ignore */}
                        <div style={{display: !showNested[parent.path] && 'none'}}>
                            {parent.children && <RecursiveComponent data={parent}/>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


function generateFileExplorer(githubTree: any) {
    const root = {sha: githubTree.sha, url: githubTree.url, truncated: githubTree.truncated, children: []}

    const tree: GitHubTreeItem[] = githubTree.tree

    tree.forEach((path) => {
        const pathParts = path.path.split('/')
        let currentDir:
            | {
            sha: any
            url: any
            truncated: any
            children: never[]
        }
            | GitHubTreeItem = root

        pathParts.forEach((part) => {
            const existingPath = currentDir.children?.find((child: GitHubTreeItem) => child.name === part)

            if (existingPath) {
                currentDir = existingPath
            } else {
                if (path.type === 'blob') {
                    const newFile: GitHubTreeItem = {
                        name: part,
                        path: path.path,
                        mode: path.mode,
                        type: path.type,
                        sha: path.sha,
                        url: path.url,
                    }

                    // @ts-ignore
                    currentDir.children?.push(newFile)
                    return
                }

                if (path.type === 'tree') {
                    const newDir: GitHubTreeItem = {
                        name: part,
                        path: path.path,
                        mode: path.mode,
                        type: path.type,
                        sha: path.sha,
                        url: path.url,
                        children: [],
                    }

                    // @ts-ignore
                    currentDir.children?.push(newDir)
                    currentDir = newDir
                    return
                }
            }
        })
    })

    return root
}

export {
    FileExplorer,
    RecursiveComponent,
    generateFileExplorer
}