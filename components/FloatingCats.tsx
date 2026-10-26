"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Item = {
  id: number;
  left: number; // %
  top: number; // %
  size: number; // px
  opacity: number;
};

export default function FloatingCats({ count = 16 }: { count?: number }) {
  const layer = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([]);

  // random positions browser ma matra banaune (hydration error nahos bhanera)
  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, id) => ({
        id,
        left: gsap.utils.random(2, 94),
        top: gsap.utils.random(4, 90),
        size: gsap.utils.random(36, 80),
        opacity: gsap.utils.random(0.45, 0.8),
      }))
    );
  }, [count]);

  useEffect(() => {
    if (!items.length) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cats = gsap.utils.toArray<HTMLElement>(".cat-float");

      // Intro slide sakiyepachi ek ek gari pop-in
      gsap.fromTo(
        cats,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(2)",
          delay: calm ? 0 : 5.5,
        }
      );

      if (calm) return;

      // sabai cat aafno speed ma tairinchhan
      cats.forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-35, 35),
          y: gsap.utils.random(-50, 50),
          rotation: gsap.utils.random(-18, 18),
          duration: gsap.utils.random(4, 8),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 3),
        });
      });
    }, layer);

    return () => ctx.revert();
  }, [items]);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {items.map((it) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={it.id}
          src="/cat.png"
          alt=""
          draggable={false}
          className="cat-float absolute select-none"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            transform: "scale(0)",
          }}
        />
      ))}
    </div>
  );
}
