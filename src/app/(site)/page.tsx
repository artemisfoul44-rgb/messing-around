import Link from 'next/link';
import { ArrowRight, MapPin, Compass, Flame, BookOpen } from 'lucide-react';
import { reader } from '@/lib/keystatic';
import ProjectCard from '@/components/ProjectCard';

export default async function HomePage() {
  const profile = await reader.singletons.profile.read();
  const now = await reader.singletons.now.read();
  const allProjects = await reader.collections.projects.all();
  const allWriting = await reader.collections.writing.all();

  const featuredProjects = allProjects.filter(p => p.entry.featured);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-6 pt-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{profile?.location ?? 'Remote Worldwide'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            I build software systems that feel fast and make sense.
          </h1>
        </div>

        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {profile?.bio ??
            "I write code, debug distributed queries, and design software without hiding behind corporate jargon. Here you'll find real case studies, architecture trade-offs, and what went wrong during production builds."}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-main)] font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/now"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] font-medium text-sm hover:bg-[var(--border-subtle)]/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            See what I&apos;m doing now
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Selected Engineering Case Studies
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Real projects with explicit post-mortems and measurable outcomes.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline flex items-center gap-1"
          >
            All projects ({allProjects.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <ProjectCard
              key={project.slug}
              project={{
                slug: project.slug,
                title: project.entry.title,
                tagline: project.entry.tagline,
                role: project.entry.role,
                timeframe: project.entry.timeframe,
                technologies: project.entry.technologies,
                liveUrl: project.entry.liveUrl,
                repoUrl: project.entry.repoUrl,
                whatWentWrong: project.entry.whatWentWrong,
                featured: project.entry.featured,
              }}
            />
          ))}
        </div>
      </section>

      {/* The "/now" Snapshot */}
      {now && (
        <section className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Current Radar (/now)</span>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Updated {now.lastUpdated}
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {now.currentFocus}
          </p>

          <div className="flex items-center justify-between pt-2 text-xs border-t border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] italic">
              Reading: {now.readingList}
            </span>
            <Link
              href="/now"
              className="font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              Full /now page <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Writing Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Field Notes & Articles
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Honest thoughts on database architectures, user experience, and engineering craft.
            </p>
          </div>
          <Link
            href="/writing"
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline flex items-center gap-1"
          >
            All articles ({allWriting.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {allWriting.map(post => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {post.entry.title.replace(/-/g, ' ')}
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                  {post.entry.publishedAt} · {post.entry.readingTime}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {post.entry.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Anti-AI Pledge / Colophon Snippet */}
      <section className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            A Note on Human Craft
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl">
            This portfolio was deliberately constructed without synthetic AI clichés, stock purple blobs, or generic templates. Every line of copy reflects honest work.
          </p>
        </div>
        <Link
          href="/colophon"
          className="shrink-0 text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--border-strong)] hover:bg-[var(--bg-card)] transition-colors"
        >
          Read the Colophon →
        </Link>
      </section>
    </div>
  );
}
