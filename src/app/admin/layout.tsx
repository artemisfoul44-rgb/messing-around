import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Management System (CMS) — Admin',
  description: 'Manage your projects, articles, and profile.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black">
      {children}
    </div>
  );
}
