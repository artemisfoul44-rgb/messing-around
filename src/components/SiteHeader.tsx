import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';

export default function SiteHeader({
  name = 'Alex Morales',
  availability = 'Available for projects',
}: {
  name?: string;
  availability?: string;
}) {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-bold text-base tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 inline-flex items-center justify-center font-mono text-xs font-bold shadow-sm">
              {name.charAt(0)}
            </span>
            <span className="text-zinc-900 dark:text-zinc-100">{name}</span>
          </Link>

          {availability && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[200px]">{availability}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-5 text-sm font-medium">
          <Link
            href="/projects"
            className="px-2.5 py-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Work
          </Link>
          <Link
            href="/writing"
            className="px-2.5 py-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Writing
          </Link>
          <Link
            href="/about"
            className="px-2.5 py-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/admin"
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-700/60"
            title="Open CMS Admin Dashboard"
          >
            <Lock className="w-3 h-3" />
            <span>CMS Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
