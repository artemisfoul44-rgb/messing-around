import fs from 'fs';
import path from 'path';

export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
  bio: string;
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
}

export interface ProjectDetails {
  challenge: string;
  solution: string;
  outcome: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  tagline: string;
  description: string;
  coverImage: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  metrics?: string;
  details: ProjectDetails;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  summary: string;
  content: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  articles: Article[];
}

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export function getPortfolioData(): PortfolioData {
  try {
    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Data file not found at ${dataFilePath}`);
    }
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    throw error;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing portfolio data:', error);
    throw error;
  }
}

// Profile
export function getProfile(): Profile {
  return getPortfolioData().profile;
}

export function updateProfile(updated: Partial<Profile>): Profile {
  const data = getPortfolioData();
  data.profile = { ...data.profile, ...updated };
  savePortfolioData(data);
  return data.profile;
}

// Projects
export function getProjects(): Project[] {
  return getPortfolioData().projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPortfolioData().projects.find(p => p.slug === slug);
}

export function createProject(projectData: Omit<Project, 'id'>): Project {
  const data = getPortfolioData();
  const id = projectData.slug || `project-${Date.now()}`;
  const newProject: Project = { ...projectData, id };
  data.projects.unshift(newProject);
  savePortfolioData(data);
  return newProject;
}

export function updateProject(slug: string, updated: Partial<Project>): Project {
  const data = getPortfolioData();
  const index = data.projects.findIndex(p => p.slug === slug);
  if (index === -1) {
    throw new Error(`Project with slug ${slug} not found`);
  }
  data.projects[index] = { ...data.projects[index], ...updated };
  savePortfolioData(data);
  return data.projects[index];
}

export function deleteProject(slug: string): boolean {
  const data = getPortfolioData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter(p => p.slug !== slug);
  if (data.projects.length !== initialLength) {
    savePortfolioData(data);
    return true;
  }
  return false;
}

// Articles
export function getArticles(): Article[] {
  return getPortfolioData().articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPortfolioData().articles.find(a => a.slug === slug);
}

export function createArticle(articleData: Omit<Article, 'id'>): Article {
  const data = getPortfolioData();
  const id = articleData.slug || `article-${Date.now()}`;
  const newArticle: Article = { ...articleData, id };
  data.articles.unshift(newArticle);
  savePortfolioData(data);
  return newArticle;
}

export function updateArticle(slug: string, updated: Partial<Article>): Article {
  const data = getPortfolioData();
  const index = data.articles.findIndex(a => a.slug === slug);
  if (index === -1) {
    throw new Error(`Article with slug ${slug} not found`);
  }
  data.articles[index] = { ...data.articles[index], ...updated };
  savePortfolioData(data);
  return data.articles[index];
}

export function deleteArticle(slug: string): boolean {
  const data = getPortfolioData();
  const initialLength = data.articles.length;
  data.articles = data.articles.filter(a => a.slug !== slug);
  if (data.articles.length !== initialLength) {
    savePortfolioData(data);
    return true;
  }
  return false;
}
