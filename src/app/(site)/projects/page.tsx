import { getProjects } from '@/lib/db';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const allProjects = getProjects();

  return (
    <div className="space-y-12">
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
          Portfolio Archive
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Selected Projects
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          A showcase of web applications, commercial storefronts, and developer platforms I have engineered from concept to production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
