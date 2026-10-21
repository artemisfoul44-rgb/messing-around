'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  User,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Check,
  ArrowUpRight,
  Sparkles,
  Save,
  X,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Project, Article, Profile } from '@/lib/db';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'articles' | 'profile'>('overview');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit / Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, artRes, profRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/articles'),
        fetch('/api/admin/profile')
      ]);
      const [projData, artData, profData] = await Promise.all([
        projRes.json(),
        artRes.json(),
        profRes.json()
      ]);
      setProjects(projData);
      setArticles(artData);
      setProfile(profData);
    } catch (err) {
      console.error('Failed to load CMS data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) {
      alert('Please provide a Title and Slug.');
      return;
    }

    const isEdit = projects.some(p => p.slug === editingProject.slug);
    const url = isEdit ? `/api/admin/projects/${editingProject.slug}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      });
      if (!res.ok) throw new Error('Failed to save project');
      showToast(isEdit ? 'Project updated successfully' : 'Project created successfully');
      setIsProjectModalOpen(false);
      setEditingProject(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Project
  const handleDeleteProject = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      showToast('Project deleted');
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.slug) {
      alert('Please provide a Title and Slug.');
      return;
    }

    const isEdit = articles.some(a => a.slug === editingArticle.slug);
    const url = isEdit ? `/api/admin/articles/${editingArticle.slug}` : '/api/admin/articles';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle)
      });
      if (!res.ok) throw new Error('Failed to save article');
      showToast(isEdit ? 'Article updated' : 'Article created');
      setIsArticleModalOpen(false);
      setEditingArticle(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      showToast('Article deleted');
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      showToast('Profile settings saved');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-sm shadow-xl animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Branding */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-zinc-950 font-bold font-mono text-sm">
                CMS
              </div>
              <div>
                <h1 className="font-semibold text-sm leading-tight text-zinc-100">Content Studio</h1>
                <p className="text-[11px] text-zinc-400">Integrated CMS</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-amber-400'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-zinc-800 text-amber-400'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'articles'
                  ? 'bg-zinc-800 text-amber-400'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Articles</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-zinc-800 text-amber-400'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Bio & Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom public link */}
        <div className="p-4 border-t border-zinc-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <span>View Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-zinc-950 p-8">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-amber-500 animate-spin" />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'projects' && 'Project Management'}
                  {activeTab === 'articles' && 'Writing & Field Notes'}
                  {activeTab === 'profile' && 'Profile & Site Settings'}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Changes save directly to your repository and are instantly reflected on your live site.
                </p>
              </div>

              {activeTab === 'projects' && (
                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      slug: '',
                      category: 'Web Application',
                      client: '',
                      year: new Date().getFullYear().toString(),
                      tagline: '',
                      description: '',
                      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
                      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                      liveUrl: '',
                      repoUrl: '',
                      featured: true,
                      metrics: '',
                      details: { challenge: '', solution: '', outcome: '' }
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
                >
                  <Plus className="w-4 h-4" /> New Project
                </button>
              )}

              {activeTab === 'articles' && (
                <button
                  onClick={() => {
                    setEditingArticle({
                      title: '',
                      slug: '',
                      category: 'Engineering',
                      publishedAt: new Date().toISOString().split('T')[0],
                      readingTime: '4 min read',
                      summary: '',
                      content: ''
                    });
                    setIsArticleModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors"
                >
                  <Plus className="w-4 h-4" /> New Article
                </button>
              )}
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                    <span className="text-xs font-mono text-zinc-400">Total Projects</span>
                    <p className="text-3xl font-bold text-white mt-1">{projects.length}</p>
                    <span className="text-xs text-amber-400/80 mt-1 inline-block">
                      {projects.filter(p => p.featured).length} featured on homepage
                    </span>
                  </div>

                  <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                    <span className="text-xs font-mono text-zinc-400">Total Articles</span>
                    <p className="text-3xl font-bold text-white mt-1">{articles.length}</p>
                    <span className="text-xs text-zinc-500 mt-1 inline-block">
                      Published field notes
                    </span>
                  </div>

                  <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                    <span className="text-xs font-mono text-zinc-400">Current Status</span>
                    <p className="text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {profile?.availability ?? 'Active'}
                    </p>
                    <span className="text-xs text-zinc-500 mt-1 inline-block truncate max-w-full">
                      {profile?.role}
                    </span>
                  </div>
                </div>

                {/* Recent Projects Snippet */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-200">Recent Projects</h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      View all ({projects.length}) →
                    </button>
                  </div>
                  <div className="divide-y divide-zinc-800/60">
                    {projects.slice(0, 3).map(p => (
                      <div key={p.slug} className="p-4 flex items-center justify-between hover:bg-zinc-800/30">
                        <div>
                          <h4 className="text-sm font-medium text-white">{p.title}</h4>
                          <p className="text-xs text-zinc-400">{p.client} · {p.year}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden divide-y divide-zinc-800">
                  {projects.map(project => (
                    <div
                      key={project.slug}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-white">{project.title}</h3>
                          {project.featured && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Featured
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                          {project.tagline}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono pt-1">
                          <span>{project.client}</span>
                          <span>·</span>
                          <span>{project.year}</span>
                          <span>·</span>
                          <span>{project.technologies.slice(0, 3).join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                          title="Preview Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.slug)}
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ARTICLES */}
            {activeTab === 'articles' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden divide-y divide-zinc-800">
                  {articles.map(article => (
                    <div
                      key={article.slug}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-white">{article.title}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                          {article.summary}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono pt-1">
                          <span>{article.publishedAt}</span>
                          <span>·</span>
                          <span>{article.readingTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/writing/${article.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                          title="Preview Article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingArticle(article);
                            setIsArticleModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.slug)}
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROFILE & SETTINGS */}
            {activeTab === 'profile' && profile && (
              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-2xl">
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Personal Identity</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Role / Headline</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={e => setProfile({ ...profile, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Location & Timezone</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={e => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Availability Status</label>
                      <input
                        type="text"
                        value={profile.availability}
                        onChange={e => setProfile({ ...profile, availability: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">First-Person Bio</label>
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={e => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Contact & Social Links</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        value={profile.github}
                        onChange={e => setProfile({ ...profile, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Twitter / X URL</label>
                      <input
                        type="url"
                        value={profile.twitter}
                        onChange={e => setProfile({ ...profile, twitter: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={profile.linkedin}
                        onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors"
                >
                  <Save className="w-4 h-4" /> Save Profile Settings
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      {/* PROJECT MODAL / DRAWER */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900/90 backdrop-blur z-10">
              <h3 className="font-bold text-white text-base">
                {editingProject.slug && projects.some(p => p.slug === editingProject.slug) ? 'Edit Project' : 'Create Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={e => {
                      const title = e.target.value;
                      const slug = editingProject.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setEditingProject({ ...editingProject, title, slug });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Slug (URL parameter) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Client / Context</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={e => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Tagline (One-line description)</label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Live URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub / Repo URL</label>
                  <input
                    type="url"
                    value={editingProject.repoUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingProject.coverImage || ''}
                  onChange={e => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                  onChange={e => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                />
              </div>

              {/* Case Study Details */}
              <div className="pt-2 border-t border-zinc-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Case Study Narrative</span>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">The Challenge</label>
                  <textarea
                    rows={2}
                    value={editingProject.details?.challenge || ''}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      details: { ...(editingProject.details || { challenge: '', solution: '', outcome: '' }), challenge: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">The Technical Approach / Solution</label>
                  <textarea
                    rows={2}
                    value={editingProject.details?.solution || ''}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      details: { ...(editingProject.details || { challenge: '', solution: '', outcome: '' }), solution: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Outcome & Measured Impact</label>
                  <textarea
                    rows={2}
                    value={editingProject.details?.outcome || ''}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      details: { ...(editingProject.details || { challenge: '', solution: '', outcome: '' }), outcome: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={Boolean(editingProject.featured)}
                  onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                />
                <label htmlFor="featuredCheck" className="text-sm text-zinc-300">
                  Feature on Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE MODAL */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900/90 backdrop-blur z-10">
              <h3 className="font-bold text-white text-base">
                {editingArticle.slug && articles.some(a => a.slug === editingArticle.slug) ? 'Edit Article' : 'Create Article'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={e => {
                      const title = e.target.value;
                      const slug = editingArticle.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setEditingArticle({ ...editingArticle, title, slug });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={editingArticle.publishedAt || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={editingArticle.readingTime || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, readingTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Teaser / Summary</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Article Body (Markdown supported)</label>
                <textarea
                  rows={8}
                  value={editingArticle.content || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-amber-500 outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
