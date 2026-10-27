"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Terminal, Send, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// cat theme colors (Hero jastai)
const PINK = "#F4A9C0";
const LILAC = "#B9A6F2";
const EYE = "#7EC8F0";

const CONTACT_EMAIL = "krtbastola@gmail.com";
const COOLDOWN_MS = 30_000;
const TIMEOUT_MS = 10_000;

// LinkedIn logo: lucide ma depend nagarne gari seedhai SVG
function LinkedInIcon({ size = 18 }: { size?: number }) {
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
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
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
  "contact-field w-full rounded-lg border border-line bg-panel px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-[#F4A9C0]/70 focus:outline-none focus:ring-1 focus:ring-[#F4A9C0]/30 aria-[invalid=true]:border-red-400/70";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function Contact() {
  const wrap = useRef<HTMLElement>(null);
  const botcheck = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [cooldown, setCooldown] = useState(false);

  // Entrance animation (runs once)
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

  // Cooldown timer (cleaned up on unmount)
  useEffect(() => {
    if (!cooldown) return;
    const t = setTimeout(() => setCooldown(false), COOLDOWN_MS);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Clear stale messages as soon as the user edits a field
  function onChange(
    field: keyof FieldErrors,
    setter: (v: string) => void
  ) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setter(e.target.value);
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (status === "error") {
        setStatus("idle");
        setFormError("");
      }
    };
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) errs.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!message.trim()) errs.message = "Please write a message.";
    else if (message.trim().length < 10)
      errs.message = "Message should be at least 10 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || cooldown) return;

    // Honeypot: bots tick this hidden checkbox, humans never see it
    if (botcheck.current?.checked) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setFormError("");
      setStatus("idle");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setFormError(
        `Contact form isn't configured. Please email me at ${CONTACT_EMAIL}.`
      );
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setFormError("");
    setStatus("sending");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${name.trim()}`,
          from_name: "Portfolio Contact Form",
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        setCooldown(true);
      } else {
        setFormError(
          data.message ||
            `Couldn't send your message. You can email me at ${CONTACT_EMAIL}.`
        );
        setStatus("error");
      }
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      setFormError(
        timedOut
          ? `The request timed out. Please try again or email me at ${CONTACT_EMAIL}.`
          : `Couldn't send right now. You can email me directly at ${CONTACT_EMAIL}.`
      );
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  function resetForm() {
    setStatus("idle");
    setFormError("");
    setFieldErrors({});
  }

  const sending = status === "sending";

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

          <div>
            {status === "sent" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-4 rounded-lg border border-line bg-panel px-6 py-8"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${EYE}22`, color: EYE }}
                >
                  <CheckCircle2 size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    Message sent
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Thanks for reaching out. I&apos;ll reply to your email soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={cooldown}
                  className="rounded border border-line px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-[#F4A9C0]/70 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cooldown ? "Wait a moment to send another" : "Send another message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                aria-busy={sending}
              >
                {/* Honeypot (hidden from humans) */}
                <input
                  ref={botcheck}
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <input
                    type="text"
                    aria-label="Your name"
                    placeholder="Your Name"
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={onChange("name", setName)}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "err-name" : undefined}
                    disabled={sending}
                    className={FIELD}
                  />
                  {fieldErrors.name && (
                    <p id="err-name" className="mt-1.5 text-xs text-red-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    aria-label="Your email"
                    placeholder="Email"
                    maxLength={150}
                    autoComplete="email"
                    value={email}
                    onChange={onChange("email", setEmail)}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "err-email" : undefined}
                    disabled={sending}
                    className={FIELD}
                  />
                  {fieldErrors.email && (
                    <p id="err-email" className="mt-1.5 text-xs text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    aria-label="Your message"
                    placeholder="Message"
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={onChange("message", setMessage)}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "err-message" : undefined}
                    disabled={sending}
                    className={`${FIELD} resize-none`}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    {fieldErrors.message ? (
                      <p id="err-message" className="text-xs text-red-400">
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="shrink-0 text-xs text-muted">
                      {message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Announced to screen readers when it changes */}
                <div aria-live="polite">
                  {status === "error" && formError && (
                    <p role="alert" className="text-xs text-red-400">
                      {formError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending || cooldown}
                  className="contact-field inline-flex items-center gap-2 rounded px-6 py-3 font-mono text-sm font-medium transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: PINK, color: "#1A1424" }}
                >
                  {sending ? "SENDING..." : "SEND_ENCRYPTED"} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}