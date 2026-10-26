"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// cat theme colors
const C = {
  plum: "#1A1424",
  cream: "#FFF3E4",
  pink: "#F4A9C0",
  lilac: "#B9A6F2",
  eye: "#7EC8F0",
};

// "Bastola" ko har akshar ko alag color
const bastolaColors = [C.pink, C.lilac, C.eye, C.pink, C.lilac, C.eye, C.pink];

function Letters({
  text,
  colors,
  className = "",
}: {
  text: string;
  colors?: string[];
  className?: string;
}) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="name-letter inline-block opacity-0"
          style={colors ? { color: colors[i % colors.length] } : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // background zoom + fade
      gsap.fromTo(
        ".hero-bg",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
      );

      if (calm) {
        gsap.set([".name-letter", ".hero-item", ".name-cat"], { opacity: 1 });
        return;
      }

      // Intro slide huney bela (~5s) pakhera suru huncha
      const tl = gsap.timeline({ delay: 4.6 });

      // 1) naam ko akshar haru ek ek gari udera aauchhan
      tl.fromTo(
        ".name-letter",
        { y: 90, opacity: 0, rotateX: -90, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "back.out(2)",
        }
      )
        // 2) biralo naam ko end ma jhyaulinchha
        .fromTo(
          ".name-cat",
          { scale: 0, rotation: -40, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(3)" },
          "-=0.3"
        )
        // 3) baki text
        .fromTo(
          ".hero-item",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
        );

      // 4) naam ma lagatar halka waves
      gsap.to(".name-letter", {
        y: -8,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, repeat: -1, yoyo: true },
        delay: 7,
      });

      // biralo ko kan jasto halka hallaune
      gsap.to(".name-cat", {
        rotation: 12,
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 7,
        transformOrigin: "50% 90%",
      });

      // naam ma hover garda akshar uchhalne
      const letters = gsap.utils.toArray<HTMLElement>(".name-letter");
      const onEnter = (e: Event) => {
        gsap.fromTo(
          e.currentTarget,
          { scale: 1 },
          {
            scale: 1.5,
            rotate: gsap.utils.random(-15, 15),
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          }
        );
      };
      letters.forEach((l) => l.addEventListener("mouseenter", onEnter));
      return () =>
        letters.forEach((l) => l.removeEventListener("mouseenter", onEnter));
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: C.plum }}
    >
      {/* background image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center opacity-0"
        style={{ backgroundImage: "url('/IMG_1589.jpeg')" }}
      />

      {/* plum overlay: left ma dherai gaadha, text padhna sajilo */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${C.plum}ee, ${C.plum}99 55%, ${C.plum}55)`,
        }}
      />

      {/* content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <h1
          className="text-5xl font-bold md:text-7xl"
          style={{ color: C.cream, perspective: 700 }}
          aria-label="Aakriti Bastola"
        >
          <Letters text="Aakriti" className="mr-4 md:mr-6" />
          <Letters text="Bastola" colors={bastolaColors} className="italic" />
          <span
            className="name-cat ml-3 inline-block text-4xl opacity-0 md:text-6xl"
            aria-hidden="true"
          >
            🐱
          </span>
        </h1>

        <p
          className="hero-item mt-6 text-lg font-medium opacity-0"
          style={{ color: C.cream }}
        >
          Aspiring ethical hacker and cybersecurity enthusiast.
        </p>

        <p
          className="hero-item mt-2 max-w-xl opacity-0"
          style={{ color: `${C.cream}b3` }}
        >
          Finding vulnerabilities before attackers do through penetration
          testing, web security, and GRC.
        </p>

        <div className="hero-item mt-8 flex gap-4 opacity-0">
          <a
            href="#projects"
            className="rounded-xl px-6 py-3 font-semibold transition hover:-translate-y-0.5"
            style={{ backgroundColor: C.pink, color: C.plum }}
          >
            View Projects 🐾
          </a>
          <a
            href="#contact"
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-white/10"
            style={{ borderColor: `${C.cream}66`, color: C.cream }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}