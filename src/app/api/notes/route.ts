import {AxiosError} from "axios";
import {GitHubTreeResponse} from "@/types/github-reponses";
import {getAllNotesData} from "@/lib/markdown-api";
import {redisClient} from "@/lib/redis";
import {createRateLimiter} from "@/lib/ratelimiter";

const CACHE_EXPIRATION_TIME = 60 * 60; // Cache expiration time in seconds (1 hour)

export async function GET(req: Request) {
    try {
        const rateLimit = createRateLimiter(redisClient, 10, '10 s');
        const result = await rateLimit.limit('api/tree');

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Too many requests",
                rateLimitState: result
            }), {
                headers: {
                    'X-RateLimit-Limit': result.limit.toString(),
                    'X-RateLimit-Remaining': result.remaining.toString(),
                    'X-RateLimit-Reset': result.reset.toString(),
                }, status: 429
            });
        }

        const {searchParams} = new URL(req.url);
        const owner = searchParams.get("owner");
        const repo = searchParams.get("repo");
        const token = searchParams.get("token");

        if (!owner || !repo) return new Response("Missing parameters", {status: 400});

        // Generate a unique cache key based on the request parameters
        const cacheKey = `${owner}-${repo}-notes`;

        // Check if the response is cached in Redis
        const cachedResponse = await redisClient.get(cacheKey);

        if (cachedResponse) {
            return new Response(JSON.stringify(cachedResponse), {status: 200});
        }

        const posts = await getAllNotesData(owner, repo, token ? token : undefined);

        // Cache the response in Redis using the SETEX command
        await redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(posts));

        return new Response(JSON.stringify(posts), {status: 200});
    } catch (error) {
        if (error instanceof AxiosError) {
            return new Response(error.response?.statusText, {status: error.response?.status});
        }

        if (error instanceof Error) {
            return new Response(error.message, {status: 500})
        }
    }
}
