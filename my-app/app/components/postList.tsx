'use client'
import { BlogPost } from "../types";
import Post from "./post";

export default function postList({ posts }: { posts: BlogPost[] }) {
    return (<div>
             <h2 className="text-lg">Blog posts</h2>
            <ul className="flex flex-col gap-2">
                {posts.map((post) => (
                    <li key={post.slug}>
                    <Post post={post} /> 
                    </li>
                ))}
            </ul></div>)
}