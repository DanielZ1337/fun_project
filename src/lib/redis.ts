import {Redis} from '@upstash/redis'
import https from "https";

export const redisClient = Redis.fromEnv({
    agent: new https.Agent({keepAlive: true}),
    cache: "force-cache",
    retry: {
        retries: 0,
    }
});
