"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Terminal, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// cat theme colors (Hero jastai)
const PINK = "#F4A9C0";
const LILAC = "#B9A6F2";
const EYE = "#7EC8F0";

const FOCUS = [
  "Penetration Testing",
  "Web Security",
  "Reverse Engineering",
  "Cryptography",
  "Programming",
  "GRC",
];

const FACTS = [
  {
    icon: GraduationCap,
    title: "Softwarica College",
    text: "Ethical Hacking and Cybersecurity, undergraduate",
    color: PINK,
  },
  {
    icon: Terminal,
    title: "TryHackMe & Hack The Box",
    text: "Regular hands-on practice",
    color: EYE,
  },
  {
    icon: ShieldCheck,
    title: "Goal",
    text: "Find vulnerabilities before attackers do",
    color: LILAC,
  },
];

export default function About() {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return;

    const ctx = gsap.context(() => {
      // scroll garera section dekhiyepachi ek patak matra chalcha
      gsap
        .timeline({
          scrollTrigger: { trigger: wrap.current, start: "top 70%", once: true },
        })
        .from(".about-title", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(
          ".about-p",
          { y: 24, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".about-chip",
          { scale: 0, opacity: 0, stagger: 0.07, duration: 0.5, ease: "back.out(2.5)" },
          "-=0.3"
        )
        .from(
          ".about-card",
          { x: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
          0.2
        )
        .from(
          ".about-fact",
          { x: 20, opacity: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      id="about"
      className="relative border-t border-line py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="about-title mb-12 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
          A bit{" "}
          <span
            className="font-serif font-medium italic"
            style={{ color: PINK }}
          >
            about me.
          </span>
        </h2>

        <div className="grid items-start gap-12 md:grid-cols-5">
          {/* left: text + focus areas */}
          <div className="md:col-span-3">
            <div className="max-w-2xl space-y-5 leading-relaxed text-muted">
              <p className="about-p">
                I&apos;m an undergraduate student of{" "}
                <span className="text-ink">
                  Ethical Hacking and Cybersecurity
                </span>{" "}
                at Softwarica College of IT and E-commerce, passionate about
                securing digital systems and programming.
              </p>
              <p className="about-p">
                I actively practice on platforms like TryHackMe and Hack The
                Box to build hands-on skills in penetration testing, web
                security, reverse engineering, cryptography and programming.
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {FOCUS.map((f, i) => (
                <li
                  key={f}
                  className="about-chip rounded-full border px-4 py-1.5 font-mono text-xs text-ink"
                  style={{
                    borderColor: `${[PINK, LILAC, EYE][i % 3]}66`,
                    backgroundColor: `${[PINK, LILAC, EYE][i % 3]}14`,
                  }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* right: quick facts */}
          <div className="about-card relative rounded-2xl border border-line bg-panel p-6 md:col-span-2">
            <ul className="space-y-4">
              {FACTS.map(({ icon: Icon, title, text, color }) => (
                <li key={title} className="about-fact flex gap-3">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}22`, color }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {title}
                    </span>
                    <span className="block text-sm text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}