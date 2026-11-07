import { BlogPost } from "../types";

export default function Post({post}: {post: BlogPost}) {
    return (<article className="flex flex-row gap-2">
                / <a href={`/blog/${post.slug}`} className="text-ctp-teal-500">{post.title}</a>
                <time dateTime={post.date} className="text-ctp-lavender-400">{post.date}</time>
                | {post.tags}
                </article>)
}