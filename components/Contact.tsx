"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Terminal, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// cat theme colors (Hero jastai)
const PINK = "#F4A9C0";
const LILAC = "#B9A6F2";
const EYE = "#7EC8F0";

// LinkedIn logo: lucide ma depend nagarne gari seedhai SVG
function LinkedInIcon({
  size = 18,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CONTACTS = [
  {
    icon: Mail,
    label: "krtbastola@gmail.com",
    href: "mailto:krtbastola@gmail.com",
    color: PINK,
    external: false,
  },
  {
    icon: LinkedInIcon,
    label: "linkedin.com/in/aakritibastola",
    href: "https://www.linkedin.com/in/aakritibastola/",
    color: EYE,
    external: true,
  },
  {
    icon: Terminal,
    label: "TryHackMe",
    href: "https://tryhackme.com/p/A4kriTi",
    color: LILAC,
    external: true,
  },
];

const FIELD =
  "contact-field w-full rounded-lg border border-line bg-panel px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-[#F4A9C0]/70 focus:outline-none focus:ring-1 focus:ring-[#F4A9C0]/30";

export default function Contact() {
  const wrap = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: wrap.current, start: "top 70%", once: true },
        })
        .from(".contact-title", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(
          ".contact-intro",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".contact-card",
          { x: -40, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.2"
        )
        .from(
          ".contact-field",
          { y: 24, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.6"
        );
    }, wrap);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields first.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\nFrom: ${email}`;
    window.location.href = `mailto:krtbastola@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      ref={wrap}
      id="contact"
      className="relative border-t border-line py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="contact-title mb-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Let&apos;s{" "}
          <span
            className="font-serif font-medium italic"
            style={{ color: PINK }}
          >
            connect.
          </span>
        </h2>
        <p className="contact-intro mb-12 max-w-xl leading-relaxed text-muted">
          Whether you&apos;re a recruiter, a fellow researcher, or someone who
          just wants to chat about security, I&apos;d love to hear from you.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-3">
            {CONTACTS.map(({ icon: Icon, label, href, color, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="contact-card group flex items-center gap-3 rounded-lg border border-line bg-panel px-5 py-4 transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = `${color}88`)
                }
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="truncate text-sm text-ink">{label}</span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
              type="text"
              aria-label="Your name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FIELD}
            />
            <input
              type="email"
              aria-label="Your email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={FIELD}
            />
            <textarea
              aria-label="Your message"
              placeholder="Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${FIELD} resize-none`}
            />

            {error && (
              <p role="alert" className="text-xs text-red-400">
                {error}
              </p>
            )}
            {sent && !error && (
              <p role="status" className="text-xs" style={{ color: EYE }}>
                Opening your mail app. Just press send there.
              </p>
            )}

            <button
              type="submit"
              className="contact-field inline-flex items-center gap-2 rounded px-6 py-3 font-mono text-sm font-medium transition-colors hover:brightness-110"
              style={{ backgroundColor: PINK, color: "#1A1424" }}
            >
              SEND_ENCRYPTED <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}