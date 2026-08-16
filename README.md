# Aakriti Bastola — Portfolio (Next.js + React + Tailwind)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before deploying
1. Add your real `logo.png` and `cv.pdf` inside `/public`
2. Update the real links in `components/Contact.tsx` (email, LinkedIn, GitHub, TryHackMe)
3. Update `components/Navbar.tsx` if you rename the resume file

## Structure
- `app/layout.tsx` — fonts + global metadata
- `app/page.tsx` — assembles all sections
- `components/` — one file per section (Navbar, Hero, About, Skills, Projects, Blogs, Contact, Footer)
- `tailwind.config.ts` — color tokens (cyan/amber accents, panel/base backgrounds)

## Deploy
Push to GitHub, then import the repo on vercel.com — zero config needed.
