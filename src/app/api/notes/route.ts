import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {redisClient} from "@/lib/redis";
import {createRateLimiter} from "@/lib/ratelimiter";
import {getNotesData} from "@/lib/getallnotes";
import axios, {AxiosError} from "axios";

/* taken from source code */
type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

// function to check if the request exceeds the rate limit
async function checkRateLimit(key: string, limit: number, duration: Duration) {
    const rateLimit = createRateLimiter(redisClient, limit, duration);
    const result = await rateLimit.limit(key);

    return result.success;
}

const CACHE_EXPIRATION_TIME = 60 * 60; // Cache expiration time in seconds (1 hour)

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const token = searchParams.get("token");
    const session = await getServerSession(authOptions);

    if (!owner || !repo) return new Response("Missing parameters", {status: 400});

    // Set up rate-limiting configuration
    const rateLimitKey = `ratelimit:${req.url}:${req.method}:notes`;
    const rateLimitDuration = '60 s'; // 60 seconds
    const rateLimitLimit = 100; // 100 requests per minute

    try {
        // Check if the request exceeds the rate limit
        const isAllowed = await checkRateLimit(rateLimitKey, rateLimitLimit, rateLimitDuration);
        if (!isAllowed) {
            return new Response("Rate limit exceeded", {status: 429});
        }

        const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
            }
        })

        if (res.status !== 200) {
            return new Response("Error fetching repo", {status: res.status});
        }

        // Check if the response is cached
        const cacheKey = `cache:${owner}-${repo}-notes`.toLowerCase();

        const cachedResponse = await redisClient.json.get(cacheKey);
        if (cachedResponse) {
            return new Response(JSON.stringify(cachedResponse), {status: 200});
        }

        // Fetch data from the source if not cached
        const posts = await getNotesData({
            owner,
            repo,
            token: token ? token : undefined,
            session: session ? session : undefined,
        });
        // Cache the response
        await redisClient.json.set(cacheKey, '$', JSON.stringify(posts))
        await redisClient.expire(cacheKey, CACHE_EXPIRATION_TIME)

        return new Response(JSON.stringify(posts), {status: 200});
    } catch (e) {
        if (e instanceof AxiosError) {
            return new Response(e.response?.statusText, {status: e.response?.status});
        }
        if (e instanceof Error) {
            return new Response(e.message, {status: 500});
        } else {
            return new Response("Unknown error occurred", {status: 500});
        }
    }
}
