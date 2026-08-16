const TECHNICAL = [
  {
    emoji: "🌐",
    title: "Web Application Security Testing",
    desc: "Identifying and exploiting vulnerabilities in web applications using OWASP methodologies and security testing frameworks.",
    tags: ["OWASP", "Burp Suite", "OWASP ZAP", "SQLMap", "XSS"],
  },
  
  {
    emoji: "📡",
    title: "Networking Fundamentals",
    desc: "Understanding network protocols, architecture, and security principles essential for cybersecurity operations.",
    tags: ["TCP/IP", "DNS", "HTTP/HTTPS", "Firewalls", "Routing"],
  },
  {
    emoji: "💻",
    title: "Linux (Kali Linux)",
    desc: "Proficient in Linux command line, system administration, and utilizing Kali Linux tools for security testing.",
    tags: ["Kali Linux", "Bash", "Command Line", "System Admin"],
  },
  
  {
    emoji: "🔐",
    title: "Cryptography Basics",
    desc: "Understanding encryption algorithms, hashing techniques, and cryptographic protocols for data security.",
    tags: ["AES", "RSA", "Hashing", "SSL/TLS", "PKI"],
  },
  {
    emoji: "🧩",
    title: "Reverse Engineering",
    desc: "Analyzing malware and compiled binaries to understand their behavior, structure, and intent.",
    tags: ["Ghidra", "dnSpy", "x64dbg", "PE Analysis"],
  },
  {
    emoji: "🖥️",
    title: "Programming",
    desc: "Writing scripts and tools to automate security tasks, analyze data, and understand vulnerable code.",
    tags: ["Python", "Bash", "C", "JavaScript"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 border-t border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-5">
        <p className="section-num mb-3"></p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-12">
          Skills &{" "}
          <span className="font-serif italic font-medium text-accent">
            tools I work with.
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNICAL.map(({ emoji, title, desc, tags }) => (
            <div
              key={title}
              className="bg-panel border border-line rounded-lg p-6 hover:border-accent/40 transition-colors"
            >
              <span className="text-2xl mb-4 block">{emoji}</span>
              <h3 className="font-display font-medium text-ink text-base mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-accent bg-accent/5 border border-accent/20 rounded px-2 py-0.5"
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