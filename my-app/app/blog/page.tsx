import fs from "node:fs";
import path from "node:path";

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

function getPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), "app", "blog", "posts");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .sort();

  return files
    .map((file) => parseMarkdown(path.join(postsDirectory, file)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function Page() {
  const posts = getPosts();

  return (
    <main>
      <section>
        <div>
          <span>Travel Journal</span>
          <h1>Notes from the Road</h1>
          <p>Field stories about slow mornings, open roads, and the places that change the pace of a day.</p>
        </div>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <time dateTime={post.date}>{post.date}</time>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <a href={`/blog/${post.slug}`}>Read article</a>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
