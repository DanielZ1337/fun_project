import axios, {AxiosError} from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redisClient} from "@/lib/redis";
import {createRateLimiter} from "@/lib/ratelimiter";

const CACHE_EXPIRATION_TIME = 60 * 60; // Cache expiration time in seconds (1 hour)

export async function GET(req: Request) {
    try {
        const rateLimit = createRateLimiter(redisClient, 120, '30 s');
        const result = await rateLimit.limit('api/raw');

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
        const path = searchParams.get("path");
        const token = searchParams.get("token");
        const session = await getServerSession(authOptions);

        if (!owner || !repo || !path) return new Response("Missing parameters", {status: 400});

        // Generate a unique cache key based on the request parameters
        const cacheKey = `${owner}-${repo}-${path}`;

        // Check if the response is cached in Redis
        const cachedResponse = await redisClient.get(cacheKey);

        if (cachedResponse) {
            return new Response(JSON.stringify(cachedResponse), {status: 200});
        }

        const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                Accept: "application/vnd.github.raw",
                Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
            },
        });

        // Cache the response in Redis using the SETEX command
        await redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, data);

        return new Response(data, {status: 200});
    } catch (error) {
        if (error instanceof AxiosError) {
            return new Response(error.response?.statusText, {status: error.response?.status});
        }

        if (error instanceof Error) {
            return new Response(error.message, {status: 500})
        }
    }
}
