import {useQuery} from "@tanstack/react-query";
import type {OgPreview} from "@/types/og-preview";
import axios from "axios";

export function useOgPreview(url: string) {
    return useQuery<OgPreview>(["og-preview", url], async () => {
        const {data} = await axios.get(`/api/linkpreview?url=${url}`)
        return data as OgPreview
    }, {
        refetchOnWindowFocus: false,
    })
}