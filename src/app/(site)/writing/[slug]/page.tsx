import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { reader } from '@/lib/keystatic';
import { DocumentRenderer } from '@keystatic/core/renderer';

export async function generateStaticParams() {
  const writings = await reader.collections.writing.all();
  return writings.map(w => ({ slug: w.slug }));
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.writing.read(slug);

  if (!post) {
    notFound();
  }

  const content = await post.content();

  return (
    <article className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to writing
        </Link>
      </div>

      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          {post.title.replace(/-/g, ' ')}
        </h1>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-amber-500/40 pl-4 py-1">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose-human">
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
