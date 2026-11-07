import { BlogPost } from "../types";
import Tag from "./tag";

export default function TagList({ posts }: { posts: BlogPost[] }) {
    return (<div>  
        <h2>Tags</h2>
        <ul className="flex flex-row gap-2">
            {posts.map((post) => (
                <li key={post.slug}>
                <Tag 
                name={post.tags}
                />
                </li>
            ))}
            </ul></div>)

  }
