import "./globals.css";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/Toaster";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import links from "@/lib/links.json" assert {type: "json"};
import Providers from "@/components/Providers";
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "GitHub Repository Browser",
    description: "Browse GitHub repositories with ease",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-white dark:bg-black subpixel-antialiased py-12 px-4 flex flex-col",
                inter.className
            )}
        >
        <Providers>
            <div
                className={
                    "rounded-2xl container bg-neutral-50 dark:bg-neutral-950 flex flex-col flex-1 drop-shadow-[0px_0px_55px_rgba(59,41,92,0.25)] dark:drop-shadow-[0px_0px_95px_rgba(59,41,92,0.45)]"
                }
            >
                <div className={"m-8 flex flex-col flex-1"}>
                    <Navbar/>
                    {children}
                </div>
            </div>
            <footer className={"text-center -mb-8 mt-3 text-neutral-500"}>
                Built with ❤️ by <Link href={links.TWITTER} className={"underline focus:outline-purple-500 outline-none rounded-md"}>
                Daniel Bermann Schmidt</Link>
            </footer>
            <div className={"absolute left-0 top-0"}>
                <Toaster/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
