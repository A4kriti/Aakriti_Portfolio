"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero photo mathi (scroll agadi): safed text. Scroll pachi: theme colors.
  const linkColor = scrolled
    ? "text-muted hover:text-pink"
    : "text-white/80 hover:text-pink";
  const iconColor = scrolled ? "text-ink" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-panel/90 backdrop-blur border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex h-16 items-center justify-between">
          <div />

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-sm transition-colors ${linkColor}`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className={iconColor}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-panel md:hidden">
          <nav className="flex flex-col gap-4 px-5 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted transition-colors hover:text-pink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}