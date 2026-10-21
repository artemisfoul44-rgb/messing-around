import Link from 'next/link';
import { Settings, Sparkles } from 'lucide-react';

export default function SiteHeader({
  name = 'Alex Morales',
  availabilityStatus = 'Available for work',
}: {
  name?: string;
  availabilityStatus?: string;
}) {
  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-semibold text-base tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="w-6 h-6 rounded-md bg-[var(--text-primary)] text-[var(--bg-main)] inline-flex items-center justify-center font-mono text-xs font-bold">
              {name.charAt(0)}
            </span>
            <span>{name}</span>
          </Link>

          {/* Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--badge-green-bg)] text-[var(--badge-green)] border border-[var(--badge-green)]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--badge-green)] animate-pulse" />
            <span className="truncate max-w-[200px]">{availabilityStatus}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-4 text-sm font-medium">
          <Link
            href="/projects"
            className="px-2.5 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]/50 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/writing"
            className="px-2.5 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]/50 transition-colors"
          >
            Writing
          </Link>
          <Link
            href="/now"
            className="px-2.5 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]/50 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            /now
          </Link>
          <Link
            href="/colophon"
            className="hidden md:inline-flex px-2.5 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]/50 transition-colors"
          >
            Colophon
          </Link>
          <Link
            href="/keystatic"
            className="ml-1 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-strong)] transition-all"
            title="Open Embedded Keystatic CMS Admin"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CMS</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
