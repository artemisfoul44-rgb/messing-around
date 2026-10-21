import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alex Morales — Systems & Product Engineer',
  description:
    'A human-crafted engineering portfolio built with Next.js 15, Keystatic CMS, and Tailwind. Zero AI corporate fluff.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
