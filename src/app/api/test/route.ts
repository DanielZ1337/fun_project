export function GET(req: Request) {
    if (process.env.NODE_ENV === 'development') {
        return new Response(JSON.stringify('http://localhost:3000'), {status: 200});
    } else {
        return new Response(JSON.stringify(process.env.VERCEL_URL), {status: 200});
    }
}