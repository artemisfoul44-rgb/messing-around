import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getProfile } from '@/lib/db';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = getProfile();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <SiteHeader
        name={profile.name}
        availability={profile.availability}
      />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
