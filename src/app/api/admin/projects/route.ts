import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/db';

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }
    const newProject = createProject({
      slug: body.slug,
      title: body.title,
      category: body.category || 'Web Application',
      client: body.client || 'Personal Project',
      year: body.year || new Date().getFullYear().toString(),
      tagline: body.tagline || '',
      description: body.description || '',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      technologies: Array.isArray(body.technologies) ? body.technologies : (body.technologies ? body.technologies.split(',').map((t: string) => t.trim()) : []),
      liveUrl: body.liveUrl || '',
      repoUrl: body.repoUrl || '',
      featured: Boolean(body.featured),
      metrics: body.metrics || '',
      details: body.details || { challenge: '', solution: '', outcome: '' },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
