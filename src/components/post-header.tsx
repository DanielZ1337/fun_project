import Post from "@/types/post";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function PostHeader({post}: { post: Post }) {
    return (
        <div className="mx-auto py-4 px-6 border-b border-gray-300 w-full flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{post.metadata.title}</h1>
            <div>
                <div className="flex items-center">
                    <Avatar className={"w-12 h-12 rounded-full mr-4"}>
                        <AvatarImage src={post.metadata.author?.picture} alt={post.metadata.author?.name}/>
                        <AvatarFallback>{post.metadata.author?.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-lg">{post.metadata.author?.name}</span>
                </div>
            </div>
            <div>
                <p className="text-gray-600">Created: {post.metadata.date}</p>
                <p className="text-gray-600">Updated: {post.metadata.updatedAt}</p>
            </div>
        </div>
    )
}