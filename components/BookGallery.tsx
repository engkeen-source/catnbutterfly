"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { books } from "@/lib/books";

export default function BookGallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? null : (i - 1 + books.length) % books.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setOpen((i) => (i === null ? null : (i + 1) % books.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const book = open !== null ? books[open] : null;

  return (
    <>
      {/* ─── Gallery collage — natural aspect ratios, no crop ── */}
      {/*
        Flex split 68/32 makes the left book's height ≈ stacked-right height:
          left_h  = W × 0.68 × (1883/1249) ≈ 1.026 W
          right_h = W × 0.32 × (1760/1100) × 2 ≈ 1.024 W  ✓
      */}
      <div className="flex gap-2 sm:gap-3 max-w-3xl mx-auto">
        {/* Left: How Are You Doing Today? */}
        <button
          onClick={() => setOpen(0)}
          className="flex-[68] overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          aria-label={`View ${books[0].title}`}
        >
          <Image
            src={books[0].cover}
            alt={books[0].title}
            width={books[0].width}
            height={books[0].height}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
            sizes="(max-width: 640px) 65vw, 500px"
            priority
          />
        </button>

        {/* Right column: The Cat and Butterfly + Effortless Living */}
        <div className="flex-[32] flex flex-col gap-2 sm:gap-3">
          <button
            onClick={() => setOpen(1)}
            className="overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            aria-label={`View ${books[1].title}`}
          >
            <Image
              src={books[1].cover}
              alt={books[1].title}
              width={books[1].width}
              height={books[1].height}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
              sizes="(max-width: 640px) 35vw, 240px"
            />
          </button>
          <button
            onClick={() => setOpen(2)}
            className="overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            aria-label={`View ${books[2].title}`}
          >
            <Image
              src={books[2].cover}
              alt={books[2].title}
              width={books[2].width}
              height={books[2].height}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
              sizes="(max-width: 640px) 35vw, 240px"
            />
          </button>
        </div>
      </div>

      {/* ─── Lightbox — large near-full-screen expand modal ──── */}
      {book && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={close}
        >
          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous book"
            className="absolute left-3 sm:left-5 text-white/80 hover:text-white transition-colors text-6xl leading-none select-none z-10"
          >
            ‹
          </button>

          {/* Modal panel */}
          <div
            className="relative bg-brand-cream w-full max-w-6xl mx-14 sm:mx-20 flex flex-col sm:flex-row max-h-[90vh] sm:h-[88vh] overflow-y-auto sm:overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-brand-brown/60 hover:text-brand-brown transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            {/* Cover panel */}
            <div className="sm:w-[55%] flex-shrink-0 bg-brand-cream-alt flex items-center justify-center p-8 sm:p-14 overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                width={book.width}
                height={book.height}
                className="max-h-[45vh] sm:max-h-[78vh] w-auto object-contain"
                sizes="(max-width: 640px) 90vw, 700px"
                priority
              />
            </div>

            {/* Title + description panel */}
            <div className="sm:w-[45%] p-8 sm:p-14 flex flex-col justify-center">
              <h2 className="font-sans font-bold text-4xl sm:text-5xl text-brand-brown mb-6 leading-[1.05]">
                {book.title}
              </h2>
              <p className="text-brand-brown/70 text-base leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next book"
            className="absolute right-3 sm:right-5 text-white/80 hover:text-white transition-colors text-6xl leading-none select-none z-10"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
