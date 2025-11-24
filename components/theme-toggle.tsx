"use client";

import { useTheme } from "./theme-provider";
import { FaMoon, FaSun } from "react-icons/fa6";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-[var(--foreground)] hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
}

