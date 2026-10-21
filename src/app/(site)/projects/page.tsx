import { reader } from '@/lib/keystatic';
import ProjectCard from '@/components/ProjectCard';
import { Layers } from 'lucide-react';

export default async function ProjectsIndexPage() {
  const allProjects = await reader.collections.projects.all();

  return (
    <div className="space-y-10">
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Complete Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Projects & Case Studies
        </h1>
        <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Detailed breakdowns of systems, developer tooling, and web applications I have designed and built. Each project outlines the problem, the solution, and the messy mistakes made along the way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map(project => (
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
    </div>
  );
}
