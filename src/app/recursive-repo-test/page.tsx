"use client";

import RepoTree from "@/lib/RepoTree";
import {useEffect, useMemo, useRef, useState} from "react";
import RepoFolder from "@/lib/RepoFolder";
import axios, {AxiosResponse} from "axios";
import RepoFile from "@/lib/RepoFile";
import {useSession} from "next-auth/react";
import {useToast} from "@/hooks/useToast";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@/components/breadcrumb";
import {HomeSolidIcon} from "@/components/icons";

export default function Home() {
    const repo = useMemo(() => new RepoTree('/'), []);
    const [currentFolder, setCurrentFolder] = useState<RepoFolder>(repo._root);
    const [repoTree, setRepoTree] = useState<AxiosResponse>();
    const [input, setInput] = useState("");
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [currentFile, setCurrentFile] = useState<RepoFile | null>(null);
    const [error, setError] = useState<boolean>();
    const count = useRef(0);
    const [mounted, setMounted] = useState(false);

    const {toast} = useToast();

    const {data: session} = useSession();

    useEffect(() => {
        count.current = count.current + 1;
        /*console.log(input);
        console.log(currentFolder)
        console.log(currentPath)*/
    }, [currentFolder, currentPath, input]);

    // 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

    useEffect(() => {

        axios.get(
            "https://api.github.com/repos/DanielZ1337/Obsidian-SDU/git/trees/main?recursive=true",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${session?.user.accessToken ? session?.user.accessToken : null}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            }
        ).then((res) => {
            setRepoTree(res.data);
        }).catch((err) => {
            console.log(err)
        });
    }, [mounted, repo, session?.user.accessToken, toast]);

    if (repoTree) {
        /* @ts-ignore */
        repoTree.tree!.map((element: any) => {
            if (element.type === "tree") {
                repo.addFolder(element.path);
            } else {
                repo.addFile(element);
            }
        });
    }

    if (!session && error && !repoTree) return <p>Not logged in</p>;

    if (error) return <p>Error</p>;

    if (!error && !repoTree) return <p>Loading...</p>;

    return (
        <>
            {currentFolder !== repo._root && (
                <p onClick={() => {
                    setCurrentFolder(currentFolder.parent)
                    setCurrentPath(currentPath.slice(0, currentPath.length - 1))
                }} className={"p-4 bg-green-900/50 cursor-pointer"}>{"<--"} Go back</p>
            )}
            <Breadcrumb>
                {currentPath.length !== 0 && (
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => {
                            setCurrentFolder(repo._root)
                            setCurrentPath([])
                        }}>
                            <HomeSolidIcon
                                className={"w-4 h-4 cursor-pointer hover:stroke-current hover:dark:fill-black hover:fill-white"}/>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {currentPath.map((path) => (
                    <BreadcrumbItem key={path}
                                    isCurrentPage={currentPath.join("/") == currentPath.slice(0, currentPath.length - 1).join("/") + (currentPath.length > 1 ? "/" : "") + path}>
                        <BreadcrumbLink onClick={() => {
                            setCurrentFolder(repo.findFolderByPath(currentPath.slice(0, currentPath.indexOf(path) + 1).join("/"))!)
                            setCurrentPath(currentPath.slice(0, currentPath.indexOf(path) + 1))
                        }}>
                            {path}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
            <ul className={"flex flex-col gap-1 divide-y divide-neutral-950/20 dark:divide-neutral-50/20"}>
                {currentFolder.folders.map((folder) => (
                    <li
                        onClick={() => {
                            setCurrentFolder(folder);
                            setCurrentPath([...currentPath, folder.folderName])
                        }}
                        key={folder.folderName}
                        className={"cursor-pointer"}
                    >
                        {folder.folderName}
                    </li>
                ))}
                {currentFolder.files.map((file) => (
                    <li
                        onClick={() => {
                            setCurrentFile(file);
                        }}
                        className={"cursor-pointer"}
                        key={file.name}
                    >
                        {file.name}
                    </li>
                ))}
            </ul>
        </>
    );
}
