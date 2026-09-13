import fs from "node:fs";
import path from "node:path";
import { BlogPost } from './types'
import { parseMarkdown } from "./helpers";

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
          <h1>Travel Journal</h1>
          <p>Notes from the Road</p>
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
