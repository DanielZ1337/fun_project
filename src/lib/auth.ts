import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const {GITHUB_ID, GITHUB_SECRET} = process.env

if (!GITHUB_ID || !GITHUB_SECRET || GITHUB_ID.length === 0 || GITHUB_SECRET.length === 0) {
    throw new Error('Missing environment variables GITHUB_ID and GITHUB_SECRET.')
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            authorization: {
                params: {
                    scope: 'read:user user:email repo',
                },
            },
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account?.access_token) {
                token.accessToken = account.access_token
            }

            return token
        },
        async session({session, token}) {
            session.user.accessToken = token.accessToken

            return session
        },
    },
    logger: {
        // debug: console.log,
    },
}
