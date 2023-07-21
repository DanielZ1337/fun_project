import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import axios from "axios";
import {redisClient} from "@/lib/redis";
import {createRatelimiter} from "@/lib/ratelimiter";

const CACHE_EXPIRATION_TIME = 3600; // Cache expiration time in seconds (1 hour)

export async function GET(req: Request) {
    const rateLimit = createRatelimiter(redisClient, 20, '60 s');
    const result = await rateLimit.limit('api/repositories');

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
    const owner = searchParams.get("username");
    const session = await getServerSession(authOptions);

    if (session && !owner) {
        const cachedRepos = await getCachedRepos(session.user.accessToken);
        if (cachedRepos) {
            return new Response(JSON.stringify(cachedRepos), {status: 200});
        }

        const repos = await getReposByToken(session.user.accessToken);
        if (repos.status === 401) {
            return new Response("Bad credentials", {status: 401});
        }

        if (repos.status !== 200) {
            return new Response("Error fetching repos", {status: repos.status});
        }

        // Cache the response in Redis using the SETEX command
        await cacheRepos(session.user.accessToken, repos.data);

        return new Response(JSON.stringify(repos.data), {status: 200});
    }

    if (owner) {
        const repos = await getPublicReposByUsername(owner);
        return new Response(JSON.stringify(repos), {status: 200});
    }

    return new Response("Not a valid request. Please login or enter an owner", {status: 400});
}

async function getCachedRepos(token: string) {
    const cacheKey = `repos-${token}`;
    const cachedResponse = await redisClient.get(cacheKey);
    return cachedResponse ? cachedResponse : null;
}

async function cacheRepos(token: string, data: any) {
    const cacheKey = `repos-${token}`;
    await redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(data));
}

async function getReposByToken(token: string) {
    return await axios.get("https://api.github.com/user/repos", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res).catch(err => err.response);
}

async function getPublicReposByUsername(username: string) {
    const {data} = await axios.get(`https://api.github.com/users/${username}/repos`);
    return data;
}
