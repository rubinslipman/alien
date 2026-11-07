import fs from "node:fs";
import path from "node:path";
import { BlogPost } from './types'
import { parseMarkdown } from "./helpers";
import { ThemeToggle } from "./components/themeToggle"; 
import TagList from "./components/tagList";
import PostList from "./components/postList";

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

function filterPosts(posts: BlogPost[], filter: string): BlogPost[] {
  const result = posts.filter((post) => post.tags === filter);
  return result
}

export default function Home() {
  const posts = getPosts();

  return (
     
            <main>
              <div>
                <div className="mt-2 mb-4">
                  <h1 className="">
                  Personal Journal of Phineus Nigellus
                  </h1>
                  <ThemeToggle />
                </div>
          
                <div className="max-w-lg mt-2 mb-2 flex flex-col gap-2">
                  <h2 className="text-lg">About me</h2>
                  <p>
                    I'm a software developer who builds mostly with <span className="bg-amber-500 p-1">TypeScript</span>, <span className="bg-red-500 p-1">React</span> and <span className="bg-blue-500 p-1">JavaScript</span>. I'm currently learning
                    NextJS framework which is pretty exciting. I am also upskilling on AI which is rapidly evolving. I love keeping up with
                    whats new and exciting.
                  </p>

                  <p>
                    In my free time I enjoy reading, languages and Yoga. I also keep fit with a mix of Muay Thai and running. 
                    At the end of 2026 I hope to have my first home, to be fit and healthy and have a new list of goals for 2027.
                  </p>

                  <p>
                    Two years ago i had my heartbroken, I was also diagnosed with Autism and started therapy for the second time in my life.
                    I'm now buying a house for myself, dating frequently and learning about myself. I'll write a little about this. 
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <TagList posts={posts} />
                  <PostList posts={posts} />
                </div>
              </div>
            </main>
       
  );
}
