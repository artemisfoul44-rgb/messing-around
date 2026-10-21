import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { getProfile, getProjects, getArticles } from '@/lib/db';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const profile = getProfile();
  const allProjects = getProjects();
  const allArticles = getArticles();

  const featuredProjects = allProjects.filter(p => p.featured);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="space-y-6 pt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{profile.location}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
            Building software products that solve real problems.
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            Explore Work <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Selected Work
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Commercial applications, design systems, and client platforms shipped to production.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 hover:underline"
          >
            All projects ({allProjects.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Writing / Insights */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Writing & Engineering Notes
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Thoughts on software architecture, interface design, and product engineering.
            </p>
          </div>
          <Link
            href="/writing"
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 hover:underline"
          >
            All articles ({allArticles.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allArticles.map(article => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>{article.category}</span>
                <span>{article.readingTime}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {article.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Callout */}
      <section className="p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100/80 to-white dark:from-zinc-900/80 dark:to-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Have a project in mind?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            I&apos;m currently taking on select freelance contracts, advisory work, and full-time product roles. Let&apos;s build something great.
          </p>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="shrink-0 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span>Say Hello</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
