'use client'

import "@react-sigma/core/lib/react-sigma.min.css";
// @ts-ignore
import {MultiDirectedGraph} from "graphology";
import {SigmaContainer, useRegisterEvents} from "@react-sigma/core";
import useTree from "@/hooks/useTree";
import {useEffect, useMemo} from "react";
import type Post from "@/types/post";
import type {SigmaNodeEventPayload} from "sigma/sigma";

interface NotesGraphProps {
    posts?: Post[]
    owner: string
    repo: string
    token?: string
}

export default function NotesGraph({posts, owner, repo, token}: NotesGraphProps) {
    const {data, isLoading} = useTree(owner, repo, true, token ? token : undefined)

    const graph = useMemo(() => new MultiDirectedGraph(), []);

    const registerEvents = useRegisterEvents();

    useEffect(() => {
        registerEvents({
            // node events
            clickNode: (event: SigmaNodeEventPayload) => console.log("clickNode", event.event, event.node, event.preventSigmaDefault)
        });
        if (posts) {
            posts.forEach((post) => {
                graph.addNode(post.slug, {label: post.slug, x: Math.random() * 100, y: Math.random() * 100, size: 5})
            })

            posts.forEach((post) => {
                const backlinks = posts.filter((note) => note.slug !== post.slug && note.markdown.includes(post.slug)).map((note) => {
                    return {
                        title: note.metadata.title,
                        excerpt: note.markdown,
                        slug: note.slug
                    }
                })

                backlinks.forEach((backlink) => {
                    graph.addEdge(post.slug, backlink.slug, {size: 1})
                })
            })
        }
    }, [data, graph, posts, registerEvents])


    return <SigmaContainer style={{height: "500px"}} graph={graph}/>
}
