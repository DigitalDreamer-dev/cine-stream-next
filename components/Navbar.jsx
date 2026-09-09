"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        🎬 JuzzWatch
      </Link>

      <div className="nav-links">
        <Link href="/browse">Home</Link>

        <Link href="/favorites">❤️ Favorites</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
