"use client";

import RepoTree from "@/lib/RepoTree";
import {useEffect, useMemo, useRef, useState} from "react";
import RepoFolder from "@/lib/RepoFolder";
import axios, {AxiosResponse} from "axios";
import RepoFile from "@/lib/RepoFile";

export default function Home() {
    const repo = useMemo(() => new RepoTree('/'), []);
    const [currentFolder, setCurrentFolder] = useState<RepoFolder>(repo._root);
    const [repoTree, setRepoTree] = useState<AxiosResponse>();
    const [input, setInput] = useState("");
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [currentFile, setCurrentFile] = useState<RepoFile | null>(null);
    const count = useRef(0);

    useEffect(() => {
        count.current = count.current + 1;
        console.log(input);
        console.log(currentFolder)
        console.log(currentPath)
    }, [currentFolder, currentPath, input]);

    useEffect(() => {
        axios.get(
            "https://api.github.com/repos/DanielZ1337/Obsidian-SDU/git/trees/main?recursive=true",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer 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`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            }
        ).then((res) => {
            setRepoTree(res.data);
        }).catch((err) => {
            console.log(err)
        });

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
    }, [repo, repoTree]);

    return (
        <>
            {currentFolder === repo._root ? (
                <h1 className={"border-b"}>Root</h1>
            ) : (
                <>
                    <p onClick={() => {
                        setCurrentFolder(currentFolder.parent)
                        setCurrentPath(currentPath.slice(0, currentPath.length - 1))
                    }} className={"p-4 bg-green-900/50"}>{"<--"} Go back</p>
                    <h1 className={"border-b"}>/ {currentPath.join(' / ')}</h1>
                </>
            )}

            {currentFolder.folders.map((folder) => (
                <p
                    onClick={() => {
                        setCurrentFolder(folder);
                        setCurrentPath([...currentPath, folder.folderName])
                    }}
                    key={folder.folderName}
                >
                    {folder.folderName}
                </p>
            ))}
            {currentFolder.files.map((file) => (
                <p
                    onClick={() => {
                        setCurrentFile(file);
                    }}
                    key={file.name}
                >
                    {file.name}
                </p>
            ))}
        </>
    );
}
