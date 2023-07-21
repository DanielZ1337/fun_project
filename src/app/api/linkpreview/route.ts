import he from "he";
import {OgPreview} from "@/types/og-preview";
import axios from "axios";

export const revalidate = 60 * 60;

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    let href = searchParams.get("url");

    if (!href || href === "") {
        return new Response("No link provided", {status: 400});
    }

    if (!href.startsWith("http") && !href.startsWith("https")) {
        href = `http://${href}`;
    }

    const res = await axios
        .get(href, {
            headers: {
                responseType: "text",
                "User-Agent":
                    "Mozilla/5.0 (compatible; Googlebot/2.1; https://www.google.com/bot.html)",
            },
        })
        .then((res) => res)
        .catch((err) => err.response);

    if (!res) {
        return new Response("Error fetching link", {status: 500});
    }

    if (res.status !== 200) {
        return new Response("Error fetching link", {status: res.status});
    }

    // const head = res.data.match(/<head>[\S\s]*?<\/head>/)[0];

    // Parse the HTML using regular expressions
    const title = findMetaData("og:title", res.data);
    const description = findMetaData("og:description", res.data);
    const imageUrl = findMetaData("og:image", res.data);
    const imageAlt = findMetaData("og:image:alt", res.data);
    const imageWidth = findMetaData("og:image:width", res.data);
    const imageHeight = findMetaData("og:image:height", res.data);
    const siteName = findMetaData("og:site_name", res.data);
    const url = findMetaData("og:url", res.data);

    return new Response(
        JSON.stringify({
            success: 1,
            meta: {
                title,
                description,
                siteName,
                url,
                image: {
                    url: imageUrl,
                    alt: imageAlt,
                    width: imageWidth,
                    height: imageHeight,
                }
            }
        } as OgPreview),
    );
}

function findMetaData(property: string, stringToSearch: string) {
    const regex = new RegExp(
        `<meta(?=.*?content="(.*?)")(?=[^>]*property="${property}").*?>`
    )

    const match = stringToSearch.match(regex);

    return match ? he.decode(match[1]) : "";
}
