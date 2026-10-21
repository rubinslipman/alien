import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { parseMarkdown } from "../../helpers";

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
    <main className="bg-ctp-base flex justify-center">
      <article className="m-2 bg-ctp-peach-100 max-w-5xl flex flex-col gap-2 p-4 min-h-screen">
        <time dateTime={post.date} className="text-ctp-blue-100">{post.date}</time>
        <h1 className="text-xl text-ctp-flamingo-600">{post.title}</h1>
        <div className="flex flex-col gap-2">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
