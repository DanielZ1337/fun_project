'use client'

import axios from "axios";
import {File} from "buffer";
import {useState} from "react";
// import {useEffect, useState} from "react";

export default async function _page() {
    // const [document, setDocument] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string | null>(null)

    const response = await axios
        .get(
            'https://api.github.com/repos/DanielZ1337/Obsidian-SDU/contents/Requirements%20Engineering.pdf?ref=main',
            {
                responseType: 'blob',
                headers: {
                    Accept: 'application/vnd.github.raw',
                    Authorization: `Bearer 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`,
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        )
        .then((response) => response.data).then((data) => {
            // @ts-ignore
            setFile(new File([data], "name"))
            /* @ts-ignore */
            setUrl(URL.createObjectURL(new File([data], "name")))
        });

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return Buffer.from(binary, 'binary').toString('base64');
    }

    // console.log(arrayBufferToBase64(response));

    // const blob = new Blob([response], { type: 'application/pdf' }); // Create a BLOB object

    // console.log(response)
    // const blob = new Blob([response], { type: 'application/pdf' }); // Create a BLOB object
    // const blobURL = URL.createObjectURL(blob); // Get the URL of the BLOB
    // console.log(blobURL)

    return (
        <>
            <iframe title="pdf" src={url!}/>
        </>
    );
}