'use client'

import {FC, useEffect, useState} from "react";

import {UndirectedGraph} from "graphology";
import {Attributes} from "graphology-types";
import erdosRenyi from "graphology-generators/random/erdos-renyi";

import {useLoadGraph, useRegisterEvents, useSetSettings, useSigma} from "@react-sigma/core";
import {useRouter} from "next/navigation";

export const SampleGraph: FC = () => {
    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const setSettings = useSetSettings();
    const loadGraph = useLoadGraph();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    /**
     * When component mount
     * => load the graph
     */

    function generateRandomCMYKColor() {
        //return in an array
        return [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
        ];
    }

    function generateRandomName() {
        // without faker
        const names = [
            "Aaliyah",
            "Aaron",
            "Abigail",
            "Adam",
            "Addison",
            "Adrian",
            "Aiden",
            "Ainsley",
            "Alex",
            "Alexa",
            "Alexander",
            "Alexandra",
            "Alexis",
            "Alice",
            "Allison",
        ]

        return "yeet"
        return names[Math.floor(Math.random() * names.length)];
    }

    function generateRandomSize(min: number, max: number) {
        // without faker
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const router = useRouter()

    useEffect(() => {
        // Create the graph
        const graph = erdosRenyi(UndirectedGraph, {order: 5, probability: 0.1});
        const names = [
            "Aaliyah",
            "Aaron",
            "Abigail",
            "Adam",
            "Addison",
        ]

        for (let i = 0; i < 5; i++) {
            graph.mergeNodeAttributes(i, {label: names[i], x: Math.random() * 100, y: Math.random() * 100, size: 5})
        }

        /*graph.nodes().forEach((node: string) => {
            graph.mergeNodeAttributes(node, {
                label: generateRandomName(),
                size: 20,
                color: generateRandomCMYKColor(),
                x: 0,
                y: 0,
            });
        });*/
        loadGraph(graph);

        // Register the events
        registerEvents({
            enterNode: (event) => setHoveredNode(event.node),
            clickNode: (event) => router.push(`/notes/${event.node}`),
            leaveNode: () => setHoveredNode(null),
        });
    }, [loadGraph, registerEvents, router]);

    /**
     * When component mount or hovered node change
     * => Setting the sigma reducers
     */
    useEffect(() => {
        setSettings({
            nodeReducer: (node, data) => {
                const graph = sigma.getGraph();
                const newData: Attributes = {...data, highlighted: data.highlighted || false};

                if (hoveredNode) {
                    if (node === hoveredNode || graph.neighbors(hoveredNode).includes(node)) {
                        newData.highlighted = true;
                    } else {
                        newData.color = "#E2E2E2";
                        newData.highlighted = false;
                    }
                }
                return newData;
            },
            edgeReducer: (edge, data) => {
                const graph = sigma.getGraph();
                const newData = {...data, hidden: false};

                if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
                    newData.hidden = true;
                }
                return newData;
            },
        });
    }, [hoveredNode, setSettings, sigma]);

    return null;
};