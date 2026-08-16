import { ArrowDown, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-5 w-full">
        <div>
          <p className="section-num mb-6"></p>

          <h1 className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-ink">
            Aakriti{" "}
            <span className="font-serif italic font-medium text-accent">
              Bastola
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            Aspiring ethical hacker and cybersecurity enthusiast.
          </p>
          <p className="mt-2 text-base text-muted/80 max-w-xl leading-relaxed">
            Finding vulnerabilities before attackers do through penetration
            testing, web security, and GRC.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-base font-medium rounded hover:bg-accent-dim transition-colors"
            >
              View Projects <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-line text-ink rounded hover:border-accent/50 hover:text-accent transition-colors"
            >
              <Mail size={16} /> Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
