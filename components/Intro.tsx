
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const lines = ["Welcome to", "Aakriti Bastola", "Portfolio"];

export default function Intro() {
  const wrap = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const element = wrap.current;

    if (!element) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      // Background zoom and fade in
      timeline.fromTo(
        ".intro-bg",
        {
          scale: 1.12,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        }
      );

      // Animate letters one by one
      timeline.fromTo(
        ".intro-letter",
        {
          y: 40,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.025,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      );

      // Text exit
      timeline.to(".intro-letter", {
        y: -40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.01,
        ease: "power2.in",
        delay: 1.2,
      });

      // Slide intro up to reveal portfolio
      timeline.to(element, {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
      });
    }, element);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrap}
      className="fixed inset-0 z-[100] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Full-screen background image */}
      <div
        className="intro-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
        style={{
          backgroundImage: "url('/IMG.jpeg')I",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Responsive animated heading */}
      <h1
        className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-3 text-center font-bold leading-tight text-white sm:gap-4 sm:px-6"
        style={{
          perspective: 600,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={line}
            className={`flex max-w-full flex-wrap justify-center ${
              i === 0
                ? "text-[clamp(1.75rem,6vw,4.5rem)]"
                : i === 1
                  ? "text-[clamp(1.8rem,7vw,6rem)] text-cyan-300"
                  : "text-[clamp(1.5rem,5vw,3.75rem)]"
            }`}
          >
            {line.split(" ").map((word, w) => (
              <span
                key={`${line}-${w}`}
                className="mr-2 inline-block whitespace-nowrap sm:mr-3 md:mr-5"
              >
                {word.split("").map((char, c) => (
                  <span
                    key={`${word}-${c}`}
                    className="intro-letter inline-block opacity-0"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
        ))}
      </h1>
    </div>
  );
}
