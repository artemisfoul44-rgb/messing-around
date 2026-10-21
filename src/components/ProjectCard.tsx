import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/db';
import { GithubIcon } from '@/components/Icons';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
      <div>
        {/* Project Thumbnail Image */}
        {project.coverImage && (
          <Link href={`/projects/${project.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {project.category && (
              <span className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-950/70 backdrop-blur-md text-white font-medium">
                {project.category}
              </span>
            )}
          </Link>
        )}

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed line-clamp-2">
            {project.tagline || project.description}
          </p>

          {project.metrics && (
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg mb-4">
              <strong>Impact:</strong> {project.metrics}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-zinc-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer link row */}
      <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-1 transition-colors"
        >
          View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              title="GitHub Repo"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              title="Live Link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
