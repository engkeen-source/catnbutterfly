import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.cover ? { images: [{ url: post.cover }] } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="py-16 px-6 bg-brand-cream min-h-screen">
      <article className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-brand-gray hover:text-brand-brown transition-colors mb-10"
        >
          ← Inspirations
        </Link>

        {/* Cover image */}
        {post.cover && (
          <div className="relative aspect-[16/9] mb-10 overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </div>
        )}

        {/* Meta */}
        {post.date && (
          <p className="text-xs text-brand-gray tracking-widest uppercase mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <h1 className="font-serif text-4xl text-brand-brown mb-4 leading-snug">
          {post.title}
        </h1>
        <span className="accent-rule" style={{ margin: "1.5rem 0" }} />

        {/* Body */}
        <div className="prose prose-lg max-w-none mt-8">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer link */}
        <div className="mt-14 pt-8 border-t border-brand-brown/10 text-center">
          <p className="text-sm text-brand-brown/60 mb-4">
            Adapted from{" "}
            <Link
              href="/howareyoudoing"
              className="text-brand-teal underline underline-offset-2 hover:text-brand-teal/80"
            >
              How Are You Doing Today?
            </Link>
          </p>
          <Link
            href="/blog"
            className="text-xs tracking-widest uppercase text-brand-teal border-b border-transparent hover:border-brand-teal transition-colors"
          >
            ← Back to Inspirations
          </Link>
        </div>
      </article>
    </div>
  );
}
