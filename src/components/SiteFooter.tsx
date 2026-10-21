import Link from 'next/link';
import { ArrowUpRight, Heart } from 'lucide-react';

export default function SiteFooter({
  email = 'alex@morales.dev',
  githubUrl = 'https://github.com',
  linkedinUrl = 'https://linkedin.com',
  twitterUrl = 'https://twitter.com',
}: {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}) {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-24 py-12 text-sm text-[var(--text-secondary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-medium text-[var(--text-primary)]">
            Built with human taste & zero corporate boilerplate.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Next.js 15, Keystatic CMS, Tailwind CSS. Hosted on Vercel Edge.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 flex items-center gap-0.5"
            >
              Email <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 flex items-center gap-0.5"
            >
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 flex items-center gap-0.5"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <Link
            href="/colophon"
            className="hover:text-[var(--text-primary)] hover:underline underline-offset-4"
          >
            Colophon & Anti-AI
          </Link>
        </div>
      </div>
    </footer>
  );
}
