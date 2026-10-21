import { getProfile } from '@/lib/db';
import { Mail, MapPin, Terminal, Layers, ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  const profile = getProfile();

  return (
    <div className="space-y-16 max-w-3xl">
      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
          About Me
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Designing for humans, engineering for scale.
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{profile.location}</span>
          <span>·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{profile.availability}</span>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="space-y-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p>
          I&apos;m {profile.name}, a {profile.role.toLowerCase()} specializing in building responsive web applications, design systems, and resilient backend services.
        </p>

        <p>
          Over the past 6 years, I have worked across the entire product lifecycle—from early whiteboard sketches and prototype validation to production deployments supporting tens of thousands of daily active users.
        </p>

        <p>
          My philosophy is simple: software should feel fast, look intentional, and never get in the user&apos;s way. I prefer clean abstractions, small bundle sizes, and thoughtful UX micro-interactions over heavy enterprise bloat.
        </p>
      </div>

      {/* Daily Tooling & Stack */}
      <div className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-500" />
          Everyday Toolkit & Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Frontend & Interface</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              TypeScript, React 19, Next.js (App Router), Tailwind CSS, Framer Motion, Radix UI, Figma.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Backend & Data</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Node.js, PostgreSQL, Redis, Supabase, WebSockets, REST & GraphQL APIs, Docker.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Testing & Tooling</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Vitest, Playwright, Git, Turborepo, ESLint, Postman, Vercel CI/CD.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-2">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Principles</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Zero CLS, sub-100ms interaction latency, keyboard accessibility, semantic HTML.
            </p>
          </div>
        </div>
      </div>

      {/* Connect Banner */}
      <div className="p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Let&apos;s Connect
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Whether you have a specific project inquiry, want to talk about system architecture, or just want to say hi, feel free to drop me an email.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <Mail className="w-3.5 h-3.5" /> {profile.email}
          </a>
        </div>
      </div>
    </div>
  );
}
