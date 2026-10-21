import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { reader } from '@/lib/keystatic';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await reader.singletons.profile.read();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        name={profile?.name ?? 'Alex Morales'}
        availabilityStatus={profile?.availabilityStatus ?? 'Available for work'}
      />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {children}
      </main>
      <SiteFooter
        email={profile?.email}
        githubUrl={profile?.githubUrl ?? undefined}
        linkedinUrl={profile?.linkedinUrl ?? undefined}
        twitterUrl={profile?.twitterUrl ?? undefined}
      />
    </div>
  );
}
