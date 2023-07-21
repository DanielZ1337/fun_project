import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import axios from "axios";
import {redisClient} from "@/lib/redis";
import {createRatelimiter} from "@/lib/ratelimiter";

const CACHE_EXPIRATION_TIME = 3600; // Cache expiration time in seconds (1 hour)

export const runtime = 'edge';

export async function GET(req: Request) {
    const rateLimit = createRatelimiter(redisClient, 500, '300 s');
    const result = await rateLimit.limit('api/commits');

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
    const per_page = searchParams.get("per_page");
    const session = await getServerSession(authOptions);

    if (!owner || !repo || !path) return new Response("Missing parameters", {status: 400});

    // Generate a unique cache key based on the request parameters
    const cacheKey = `${owner}-${repo}-${path}-${per_page ? per_page : 1}`;

    // Check if the response is cached in Redis
    const cachedResponse = await redisClient.get(cacheKey);

    if (cachedResponse) {
        return new Response(JSON.stringify(cachedResponse), {status: 200});
    }

    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        },
        params: {
            path: path,
            per_page: per_page ? per_page : 1,
        },
    });

    // Cache the response in Redis using the SETEX command
    await redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(data));

    return new Response(JSON.stringify(data), {status: 200});
}
