import { NextResponse } from 'next/server';
import { getArticles, createArticle } from '@/lib/db';

export async function GET() {
  try {
    const articles = getArticles();
    return NextResponse.json(articles);
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
    const newArticle = createArticle({
      slug: body.slug,
      title: body.title,
      category: body.category || 'Engineering',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      readingTime: body.readingTime || '4 min read',
      summary: body.summary || '',
      content: body.content || '',
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
