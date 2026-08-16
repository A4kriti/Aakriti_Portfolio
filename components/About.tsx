export default function About() {
  return (
    <section id="about" className="relative py-28 border-t border-line">
      <div className="mx-auto max-w-6xl px-5">
        <p className="section-num mb-3"></p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-12 max-w-2xl">
          A bit{" "}
          <span className="font-serif italic font-medium text-accent">
            About me.
          </span>
        </h2>

        <div className="max-w-2xl space-y-5 text-muted leading-relaxed">
          <p>
            I&apos;m an undergraduate student of{" "}
            <span className="text-ink">Ethical Hacking and Cybersecurity</span>{" "}
            at Softwarica College of IT and E-commerce, passionate about
            securing digital systems and programming.
          </p>
          <p>
            I actively practice on platforms like TryHackMe and Hack The Box to build hands-on 
            skills in penetration testing, web security, Reverse Engineering, cryptography and programming.
          </p>
        </div>
      </div>
    </section>
  );
}
