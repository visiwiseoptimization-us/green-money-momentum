"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/weekly-notes", label: "Weekly Notes" },
  { href: "/chat", label: "Chat Room" },
  { href: "/merch", label: "Merch" },
  { href: "/extension", label: "Extension" },
];

const YOUTUBE_URL = "https://www.youtube.com/@GreenMoneyMomentum";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-green to-brand-green-deep text-sm font-bold text-background">
            G
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="brand-gradient-text">Green Money Momentum</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand-green-bright"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Subscribe
          </a>
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-brand-green-bright">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-background-elevated hover:text-brand-green-bright"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-full bg-brand-green px-4 py-2 text-center text-sm font-semibold text-background"
          >
            Subscribe
          </a>
        </nav>
      )}
    </header>
  );
}
