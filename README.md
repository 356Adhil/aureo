# Aureo

An immersive, animation-rich marketing site for **Aureo** — a modern digital studio covering marketing, design, video, web, software and app development.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`)
- **GSAP + ScrollTrigger** for scroll-pinned scenes
- **Lenis** for smooth scroll
- **Framer Motion** for in-view / gesture animations
- **React Three Fiber + drei** for the 3D hero
- **React Hook Form + Zod** for the contact form
- **Resend** for transactional email
- **Plausible** for analytics (optional)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in Resend / Plausible as needed
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

```bash
pnpm dev      # dev server
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint
```

## Structure

```
src/
  app/                  App Router routes
  app/api/contact/      POST handler that sends mail via Resend
  components/
    layout/             Header, Footer
    providers/          LenisProvider, CustomCursor, PageTransition, Noise
    motion/             Reveal, SplitText, Magnetic, MarqueeRow
    sections/home/      Home page sections
    three/              React Three Fiber scenes
    ui/                 Button, SectionHeader, Tag, GridLines
    forms/              ContactForm
  lib/                  Content data + helpers
```

## Deployment

Designed for **Vercel**. Push to a Git repo, connect on Vercel, add the env vars from `.env.example`, and deploy.

## Notes

- The studio is new, so `/work` is populated with concept placeholders — replace `src/lib/work.ts` as real case studies ship.
- `next/font` loads **Inter**, **Space Grotesk** and **JetBrains Mono** — no external font requests.
- The 3D hero is lazy-loaded with `next/dynamic({ ssr:false })`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
