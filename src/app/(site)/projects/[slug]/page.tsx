import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { GithubIcon } from '@/components/Icons';

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-12 max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
          <span>{project.category}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* Metadata pills & links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-5 text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> Client: {project.client}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Year: {project.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
              >
                Live Product <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 shadow-sm">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Metrics Banner */}
      {project.metrics && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-sm text-emerald-900 dark:text-emerald-300 font-medium">
            <strong>Key Results:</strong> {project.metrics}
          </div>
        </div>
      )}

      {/* Case Study Sections */}
      <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
        {project.description && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Overview
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
        )}

        {project.details?.challenge && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              The Challenge
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.details.challenge}
            </p>
          </div>
        )}

        {project.details?.solution && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Technical Architecture & Approach
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.details.solution}
            </p>
          </div>
        )}

        {project.details?.outcome && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Outcome & Impact
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.details.outcome}
            </p>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
