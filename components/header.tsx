"use client";

import { ThemeToggle } from "./theme-toggle";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start mb-8">
      {children}
      <ThemeToggle />
    </div>
  );
}

