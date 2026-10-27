const PINK = "#F4A9C0";
const SUMMARY = "#A7B0C0";

const posts = [
  {
    title: "From Code to Cloud: How I Deployed My Portfolio with a Custom Domain, GitHub Collaboration & CI/CD",
    summary:
      "A walkthrough of taking my portfolio from local code to a live site, covering custom domain setup, collaborating through GitHub, and automating deployments with CI/CD.",
    link: "https://medium.com/@krtbastola/from-code-to-cloud-how-i-deployed-my-portfolio-with-a-custom-domain-github-collaboration-ci-cd-ce7fd2e6b31b",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="relative border-t border-line py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-10 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Blogs
        </h2>

        <div className="grid gap-6">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-panel p-6 text-left transition-colors hover:border-[#F4A9C0]/60 md:p-8"
            >
              <h3 className="text-lg font-semibold text-ink md:text-xl">
                {post.title}
              </h3>
              <p
                className="mt-3 max-w-3xl text-sm leading-relaxed md:text-base"
                style={{ color: SUMMARY }}
              >
                {post.summary}
              </p>
              <span
                className="mt-5 inline-block text-sm"
                style={{ color: PINK }}
              >
                Read Article →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}