"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // avoids a server/browser mismatch and layout shift
  if (!mounted) return <div className="h-9 w-[104px]" />;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-lg border border-line bg-panel p-1"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={`flex h-7 w-8 items-center justify-center rounded-md transition-colors ${
              active ? "bg-pink text-bg" : "text-muted hover:text-ink"
            }`}
          >
            <Icon size={15} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}