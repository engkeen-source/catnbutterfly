import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Inspirations",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 px-6 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-brand-gray mb-3">
            The Cat And Butterfly
          </p>
          <h1 className="font-serif text-4xl text-brand-brown mb-3">Inspirations</h1>
          <span className="accent-rule" />
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              {post.cover && (
                <Link href={`/post/${post.slug}`} className="block overflow-hidden mb-4">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </Link>
              )}
              <div className="flex flex-col flex-1">
                {post.date && (
                  <p className="text-xs text-brand-gray tracking-widest uppercase mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <h2 className="font-serif text-xl text-brand-brown mb-2 group-hover:text-brand-teal transition-colors">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-brand-brown/65 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <Link
                  href={`/post/${post.slug}`}
                  className="mt-4 self-start text-xs tracking-widest uppercase text-brand-teal border-b border-transparent hover:border-brand-teal transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
