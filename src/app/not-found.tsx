import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <h1 className="text-5xl mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-2">Oops! The page you are looking for does not exist.</p>
            <Link href="/" className="text-lg cursor-pointer text-purple-300 dark:text-purple-700 hover:underline hover:underline-offset-2">Go to Homepage</Link>
        </div>
    );
};
