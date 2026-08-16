"use client";

import { useState } from "react";
import { Mail, Linkedin, Terminal, Send } from "lucide-react";

const CONTACTS = [
  { icon: Mail, label: "krtbastola@gmail.com", href: "mailto:krtbastola@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/aakritibastola", href: "https://www.linkedin.com/in/aakritibastola/" },
  { icon: Terminal, label: "TryHackMe", href: "https://tryhackme.com/p/A4kriTi" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields first.");
      return;
    }
    setError("");
    window.location.href = `mailto:krtbastola@gmail.com?subject=Portfolio contact from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
  }

  return (
    <section id="contact" className="relative py-28 border-t border-line">
      <div className="mx-auto max-w-6xl px-5">
        <p className="section-num mb-3"></p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-6">
          Let&apos;s{" "}
          <span className="font-serif italic font-medium text-accent">
            connect.
          </span>
        </h2>
        <p className="text-muted max-w-xl leading-relaxed mb-12">
          Whether you&apos;re a recruiter, a fellow researcher, or someone who
          just wants to chat about security — I&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            {CONTACTS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-panel border border-line rounded-lg px-5 py-4 hover:border-accent/40 transition-colors"
              >
                <Icon className="text-accent shrink-0" size={18} strokeWidth={1.75} />
                <span className="text-sm text-ink group-hover:text-accent transition-colors truncate">
                  {label}
                </span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-panel border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-panel border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50"
            />
            <textarea
              placeholder="Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-panel border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent/50 resize-none"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-base font-medium rounded hover:bg-accent-dim transition-colors font-mono text-sm"
            >
              SEND_ENCRYPTED <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
