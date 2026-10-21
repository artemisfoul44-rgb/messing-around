import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, UserCheck } from 'lucide-react';
import { reader } from '@/lib/keystatic';
import { DocumentRenderer } from '@keystatic/core/renderer';
import MessyMiddle from '@/components/MessyMiddle';
import { GithubIcon } from '@/components/Icons';

export async function generateStaticParams() {
  const projects = await reader.collections.projects.all();
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);

  if (!project) {
    notFound();
  }

  const content = await project.content();

  return (
    <article className="space-y-10 max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {project.title.replace(/-/g, ' ')}
        </h1>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          {project.tagline}
        </p>

        {/* Metadata pills & links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-[var(--text-muted)] font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {project.timeframe}
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> {project.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)]/40 text-[var(--text-primary)] font-medium transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-main)] font-medium hover:opacity-90 transition-opacity"
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* The Messy Middle */}
      {project.whatWentWrong && <MessyMiddle story={project.whatWentWrong} />}

      {/* Case Study Body */}
      <div className="prose-human">
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
