import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { parseMarkdown } from "../helpers";

export default async function Page({
    params,
    }: {
    params: Promise<{ slug: string }>;
    }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "app", "blog", "posts", `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const post = parseMarkdown(filePath);

  return (
    <main>
      <article>
        <span>Travel Journal</span>
        <time dateTime={post.date}>{post.date}</time>
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
        <div>
          {post.content.split("\n").map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
