const posts = [
  {
    title: "My First Cybersecurity Write-up",
    date: "Oct 2026",
    summary: "What I learned solving my first TryHackMe room.",
    link: "#",
  },
  {
    title: "Getting Started with Ethical Hacking",
    date: "Sep 2026",
    summary: "Tools, mindset, and resources for beginners.",
    link: "#",
  },
  {
    title: "Building My Portfolio with Next.js",
    date: "Aug 2026",
    summary: "How I built and deployed this site with Vercel.",
    link: "#",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="px-6 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-cyan-400 md:text-4xl">
        Blogs
      </h2>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.link}
            className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400"
          >
            <p className="text-sm text-amber-400">{post.date}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{post.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}