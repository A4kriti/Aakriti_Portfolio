"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-panel/90 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      {/* terminal window chrome */}
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
      
              
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/AakritiResume.pdf"
              download
              className="font-mono text-sm px-4 py-2 border border-accent/40 text-accent hover:bg-accent/10 transition-colors rounded"
            >
              cv
            </a>
          </nav>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-panel border-t border-line">
          <nav className="flex flex-col px-5 py-4 gap-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cv.pdf"
              download
              className="font-mono text-sm text-accent"
            >
              ./resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
