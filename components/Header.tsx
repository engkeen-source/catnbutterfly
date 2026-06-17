"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Inspirations" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-cream border-b border-brand-brown/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-brand-brown hover:opacity-75 transition-opacity"
        >
          The Cat And Butterfly
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="nav-link text-brand-brown hover:text-brand-brown transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-[1px] bg-brand-brown transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`block w-6 h-[1px] bg-brand-brown transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[1px] bg-brand-brown transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-brand-cream border-t border-brand-brown/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="nav-link text-brand-brown text-sm"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
