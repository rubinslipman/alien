import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

type BlogPost = {
  title: string;
  date: string;
  summary: string;
  slug: string;
  content: string;
};

function parseMarkdown(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const frontMatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!frontMatterMatch) {
    return {
      title: path.basename(filePath, ".md"),
      date: new Date().toISOString(),
      summary: "A travel note from the road.",
      slug: path.basename(filePath, ".md"),
      content: raw,
    };
  }

  const [, frontMatter, content] = frontMatterMatch;
  const metadata: Record<string, string> = {};

  for (const line of frontMatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes(":")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split(":");
    const value = valueParts.join(":").trim().replace(/^"|"$/g, "");
    metadata[key.trim()] = value;
  }

  return {
    title: metadata.title ?? path.basename(filePath, ".md"),
    date: metadata.date ?? new Date().toISOString(),
    summary: metadata.summary ?? "A travel note from the road.",
    slug: path.basename(filePath, ".md"),
    content,
  };
}

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
