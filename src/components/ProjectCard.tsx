import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeframe: string;
  technologies: readonly string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  whatWentWrong?: string | null;
  featured?: boolean;
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group-hover:underline underline-offset-4"
          >
            {project.title.replace(/-/g, ' ')}
          </Link>

          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-primary)] p-1 rounded transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-primary)] p-1 rounded transition-colors"
                title="View Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
          {project.tagline}
        </p>

        {project.whatWentWrong && (
          <div className="text-xs text-[var(--text-muted)] border-l-2 border-amber-500/50 pl-3 py-1 mb-4 italic">
            <span className="font-semibold text-amber-600 dark:text-amber-400 not-italic mr-1">
              Obstacle:
            </span>
            {project.whatWentWrong.length > 130
              ? `${project.whatWentWrong.slice(0, 130)}...`
              : project.whatWentWrong}
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
          <span>{project.role}</span>
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] flex items-center gap-0.5 hover:underline"
          >
            Read Story <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
