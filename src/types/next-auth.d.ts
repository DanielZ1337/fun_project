import type {User} from "next-auth";

interface CustomUserProps {
    token: string;
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: User & CustomUserProps;
    }
}