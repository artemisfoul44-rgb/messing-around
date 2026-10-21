import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleBySlug, getArticles } from '@/lib/db';

export function generateStaticParams() {
  const articles = getArticles();
  return articles.map(a => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="space-y-10 max-w-2xl mx-auto">
      <div>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to writing
        </Link>
      </div>

      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readingTime}
          </span>
          <span>·</span>
          <span>{article.category}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
          {article.summary}
        </p>
      </div>

      <div className="prose-human">
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(i => i.trim());
            return (
              <ul key={index} className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 my-4 text-base">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          if (paragraph.match(/^\d\./)) {
            const items = paragraph.split('\n').filter(i => i.trim());
            return (
              <ol key={index} className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 my-4 text-base">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ol>
            );
          }
          return (
            <p key={index} className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 my-5">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
}
