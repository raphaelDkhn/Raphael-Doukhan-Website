"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function ArticleHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Link
        href="/"
        className="text-[var(--foreground)] text-sm hover:opacity-80 inline-block"
      >
        ← Back
      </Link>
      <ThemeToggle />
    </div>
  );
}


