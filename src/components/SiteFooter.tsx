import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Profile } from '@/lib/db';

export default function SiteFooter({ profile }: { profile?: Profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 mt-28 py-14 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            {profile?.name || 'Alex Morales'}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            Product Engineer & Designer. Built with Next.js, Tailwind, and integrated CMS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-0.5"
            >
              Email <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-0.5"
            >
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {profile?.twitter && (
            <a
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-0.5"
            >
              Twitter <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-0.5"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <Link
            href="/admin"
            className="hover:text-amber-500 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
