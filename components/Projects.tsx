import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    category: "Malware Analysis",
    title: "Keylogger",
    desc: "Developed a Python-based keylogger for educational purposes to understand malware behavior and detection techniques.",
    tags: ["Python", "Malware Analysis"],
  },
  {
    category: "Web Security",
    title: "Web Vulnerability Scanner",
    desc: "Built a tool to automatically scan web applications for common vulnerabilities like XSS, SQL injection, and misconfigurations.",
    tags: ["Python", "OWASP", "Web Security"],
  },
  {
    category: "SOC / Detection",
    title: "Network Intrusion Detection System",
    desc: "Implemented a basic NIDS using Snort to detect and analyze network-based attacks and suspicious traffic patterns.",
    tags: ["Snort", "Network Security"],
  },
  {
    category: "CTF & Research",
    title: "CTF Practice",
    desc: "Active participation in TryHackMe and HackTheBox challenges covering web exploitation, cryptography, forensics, and reverse engineering.",
    tags: ["TryHackMe", "HackTheBox"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 border-t border-line">
      <div className="mx-auto max-w-6xl px-5">
        <p className="section-num mb-3"></p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-12">
          Selected{" "}
          <span className="font-serif italic font-medium text-accent">
            projects.
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map(({ category, title, desc, tags }) => (
            <div
              key={title}
              className="group bg-panel border border-line rounded-lg p-7 hover:border-accent/40 transition-colors"
            >
              <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
                {category}
              </p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-medium text-ink text-lg mb-2">
                  {title}
                </h3>
                <ArrowUpRight
                  className="shrink-0 text-muted group-hover:text-accent transition-colors mt-1"
                  size={18}
                />
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                {desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-muted bg-base border border-line rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}