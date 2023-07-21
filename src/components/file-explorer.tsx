'use client'

import {useEffect, useState} from "react";
import useTree from "@/hooks/useTree";

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

function RecursiveComponent({data}: any) {
    const [showNested, setShowNested] = useState({})

    useEffect(() => {
        console.log(showNested);
    }, [showNested])

    const toggleNested = (name: string | number) => {
        // @ts-ignore
        setShowNested({...showNested, [name]: !showNested[name]})
    }

    return (
        <div style={{paddingLeft: '20px'}}>
            {data.children?.map((parent: any) => {
                return (
                    <div key={parent.path}>
                        {/* rendering folders */}
                        {parent.type === 'tree' &&
                            <button onClick={() => toggleNested(parent.path)}>{parent.name}</button>}
                        {/* rendering files */}
                        {parent.type === 'blob' && <span>{parent.name}</span>}
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