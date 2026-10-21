# Human-Centric CMS Portfolio

An authentic, human-first developer & designer portfolio built with **Next.js 15 (App Router)**, **Keystatic CMS**, and **Tailwind CSS**, designed for zero-config deployment to **Vercel**.

---

## Features

- **Embedded Keystatic CMS (`/keystatic`)**: Full visual dashboard to add and edit projects, blog posts, and your `/now` page. No database needed—everything is committed to Git!
- **Strict Anti-AI Rules**: Completely free of LLM buzzwords (*"delve"*, *"tapestry"*, *"beacon"*, *"seamless"*), fake corporate speak, and neon gradient clichés.
- **The "Messy Middle"**: Built-in post-mortem callouts on case studies highlighting what broke, architecture tradeoffs, and lessons learned.
- **The `/now` Page**: Dedicated live status inspired by Derek Sivers.
- **Site Colophon**: Transparently documents fonts, tools, and the anti-AI manifesto.
- **Lighthouse 100 & CLS 0**: Pre-rendered static pages with Server Components.

---

## Quick Start

### 1. Run Locally

```bash
npm run dev
```

- Public website: [http://localhost:3000](http://localhost:3000)
- Visual CMS Admin: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

### 2. Manage Content

Visit [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to:
- Edit your **Bio, Name, and Status** in the *Profile* singleton.
- Update your **Current Focus & Reading List** in the *Now Page* singleton.
- Create or modify **Projects** with case study narratives and obstacles.
- Write new **Field Notes & Articles**.

---

## Deploying to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Create a repository on GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Open [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset will automatically detect **Next.js**. Click **Deploy**!

### Option 2: Live Editing in Production (Keystatic Cloud)

To edit content directly on your live Vercel URL from any phone, tablet, or browser:
1. Register your repository for free at [keystatic.cloud](https://keystatic.cloud).
2. In your Vercel project settings, set:
   - `KEYSTATIC_SECRET` (generate a random 32-character string)
   - `NEXT_PUBLIC_KEYSTATIC_PROJECT_NAME` (your Keystatic Cloud team/project name)
3. In `keystatic.config.ts`, change `storage.kind` to `'github'` or `'cloud'` when in production.
