import he from "he";
import {OgPreview} from "@/types/og-preview";
import axios from "axios";
import {redisClient} from "@/lib/redis";
import {createRateLimiter} from "@/lib/ratelimiter";

const CACHE_EXPIRATION_TIME = 60 * 60 // 1 hour

export async function GET(req: Request) {
    try {
        /*const rateLimit = createRateLimiter(redisClient, 5, '10 s');
        const result = await rateLimit.limit('api/ogpreview');

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Too many requests",
                resultState: result
            }), {status: 429});
        }*/

        const {searchParams} = new URL(req.url);
        let href = searchParams.get("url");

        if (!href || href === "") {
            return new Response("No link provided", {status: 400});
        }

        if (!href.startsWith("http") && !href.startsWith("https")) {
            href = `http://${href}`;
        }

        // Check if the response is cached in Redis
        const cachedResponse = await redisClient.get(href);

        if (cachedResponse) {
            return new Response(JSON.stringify(cachedResponse), {status: 200});
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

        const title = findMetaData("og:title", res.data);
        const description = findMetaData("og:description", res.data);
        const imageUrl = findMetaData("og:image", res.data);
        const imageAlt = findMetaData("og:image:alt", res.data);
        const imageWidth = findMetaData("og:image:width", res.data);
        const imageHeight = findMetaData("og:image:height", res.data);
        const siteName = findMetaData("og:site_name", res.data);
        const url = findMetaData("og:url", res.data);

        const ogPreviewData = {
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
                },
            },
        } as OgPreview;

        // Cache the response in Redis
        await redisClient.setex(href, CACHE_EXPIRATION_TIME, JSON.stringify(ogPreviewData));

        return new Response(JSON.stringify(ogPreviewData), {status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, {status: 500})
        }
    }
}

function findMetaData(property: string, stringToSearch: string) {
    const regex = new RegExp(
        `<meta(?=.*?content="(.*?)")(?=[^>]*property="${property}").*?>`
    );

    const match = stringToSearch.match(regex);

    return match ? he.decode(match[1]) : "";
}
