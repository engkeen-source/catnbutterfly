import Link from "next/link";
import type { Metadata } from "next";
import BookGallery from "@/components/BookGallery";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Home | The Cat And Butterfly",
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center bg-brand-cream">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <h1 className="font-serif text-4xl sm:text-5xl leading-snug text-brand-brown">
            Telling the Stories of Humanity
          </h1>
        </div>
      </section>

      {/* ─── Book Gallery ────────────────────────────────── */}
      <section className="pb-20 px-6 bg-brand-cream">
        <BookGallery />
      </section>

      {/* ─── Inspirations Preview ────────────────────────── */}
      <section className="py-20 px-6 bg-brand-cream text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-brown mb-10">
            Inspirations
          </h2>
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="block border border-brand-brown/30 px-8 py-7 text-left hover:border-brand-brown transition-colors duration-200 group"
              >
                <h2 className="font-serif text-xl text-brand-brown mb-2 group-hover:text-brand-teal transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-brand-brown/65 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/blog"
              className="text-xs tracking-widest uppercase text-brand-brown border-b border-brand-brown pb-0.5 hover:text-brand-teal hover:border-brand-teal transition-colors duration-200"
            >
              Show More
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
