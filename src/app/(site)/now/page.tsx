import { reader } from '@/lib/keystatic';
import { Compass, BookOpen, Headphones, Cpu, Calendar } from 'lucide-react';
import { DocumentRenderer } from '@keystatic/core/renderer';

export default async function NowPage() {
  const now = await reader.singletons.now.read();

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>The /now Page</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          What I&apos;m Doing Right Now
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last updated: {now?.lastUpdated ?? 'Recently'}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] italic pt-1">
          This is a &ldquo;now page&rdquo; inspired by Derek Sivers. It serves as a public declaration of my current priorities, focus, and curiosity.
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Focus */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Primary Focus</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {now?.currentFocus ?? 'Building software tools and experimenting with new systems.'}
          </p>
        </div>

        {/* Reading List */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Reading & Researching</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {now?.readingList ?? 'Reading engineering papers and technical architecture breakdowns.'}
          </p>
        </div>

        {/* Audio */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <Headphones className="w-4 h-4 text-indigo-500" />
            <span>On Heavy Rotation</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {now?.listeningTo ?? 'Ambient electronic, focus synth playlists, and developer podcasts.'}
          </p>
        </div>

        {/* Experiments */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Active Tinkering & Lab Experiments</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {now?.experiments ?? 'Benchmarking memory footprints and testing browser storage APIs.'}
          </p>
        </div>
      </div>

      {/* Additional Log / Content */}
      {now?.content && (
        <div className="pt-6 border-t border-[var(--border-subtle)] prose-human">
          <DocumentRenderer document={await now.content()} />
        </div>
      )}
    </div>
  );
}
