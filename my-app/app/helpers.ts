import { BlogPost } from './types'
import fs from "node:fs";
import path from "node:path";

export function parseMarkdown(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const frontMatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!frontMatterMatch) {
    console.log('not found!!!')
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