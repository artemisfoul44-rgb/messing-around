import Link from 'next/link';
import { getArticles } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

export default function WritingPage() {
  const articles = getArticles();

  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
          Articles & Field Notes
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Writing
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Essays and practical notes on software architecture, interface design, performance, and engineering leadership.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map(article => (
          <article
            key={article.slug}
            className="group p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
              <span>{article.publishedAt}</span>
              <span>{article.readingTime}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
              <Link
                href={`/writing/${article.slug}`}
                className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
              >
                {article.title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {article.summary}
            </p>

            <Link
              href={`/writing/${article.slug}`}
              className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
            >
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
