import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  content: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getPost(f.replace(".mdx", ""))!)
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
