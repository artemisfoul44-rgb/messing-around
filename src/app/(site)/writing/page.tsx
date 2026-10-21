import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { BookOpen } from 'lucide-react';

export default async function WritingIndexPage() {
  const allWriting = await reader.collections.writing.all();

  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Field Notes & Essays</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Writing & Architecture Notes
        </h1>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Unfiltered notes on software systems, web development, trade-offs, and why simpler solutions almost always beat complex abstractions.
        </p>
      </div>

      <div className="space-y-6">
        {allWriting.map(post => (
          <article
            key={post.slug}
            className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-all"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
              <span>{post.entry.publishedAt}</span>
              <span>{post.entry.readingTime}</span>
            </div>

            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              <Link
                href={`/writing/${post.slug}`}
                className="group-hover:text-[var(--accent)] transition-colors group-hover:underline underline-offset-4"
              >
                {post.entry.title.replace(/-/g, ' ')}
              </Link>
            </h2>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {post.entry.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.entry.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
