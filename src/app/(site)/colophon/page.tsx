import { ShieldCheck, CheckCircle2, Terminal, Layers, Globe } from 'lucide-react';

export default function ColophonPage() {
  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Site Colophon & Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Colophon & Anti-AI Manifesto
        </h1>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          An intentional breakdown of the typography, tools, infrastructure, and human-first writing rules that govern this website.
        </p>
      </div>

      {/* The Anti-AI Filter */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          The Anti-AI Copywriting Rules
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          The internet is drowning in synthetic text generated from the same handful of prompts. To ensure every sentence here communicates genuine human thought, this site strictly follows these editorial rules:
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wide">
              Blacklisted AI Vocabulary
            </span>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Zero usage of: <em>delve, tapestry, beacon, testament, unleash, elevate, revolutionize, seamless, robust, cutting-edge, fast-paced landscape, at its core</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wide">
              No Rule of Three (Tricolons)
            </span>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              AI text habitually groups adjectives into predictable triplets (e.g. <em>&ldquo;intuitive, scalable, and impactful&rdquo;</em>). Real engineers write in asymmetric, rhythmic sentences.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wide">
              Mandatory &ldquo;Messy Middle&rdquo;
            </span>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Every case study must document the dead ends, architectural trade-offs, and bugs that occurred during development—not just tidy success metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Software & Infrastructure
        </h2>
        <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Framework:</strong> Next.js 15 (React 19, App Router, Server Components).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>CMS:</strong> Keystatic CMS running locally and committing versioned content directly into Git. Zero database fees.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Styling:</strong> Tailwind CSS with custom design tokens for warm, readable contrast in light and dark modes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Hosting:</strong> Deployed on Vercel with automatic edge caching and git-triggered builds.
            </span>
          </li>
        </ul>
      </section>

      {/* Typography & Design */}
      <section className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          Typography & Visual Ethos
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Typefaces are set using system UI grotesques and monospace fonts for instantaneous rendering with zero layout shift (CLS: 0). The layout avoids sterile SaaS templates and instead borrows inspiration from physical print editorial design and UNIX manuals.
        </p>
      </section>
    </div>
  );
}
