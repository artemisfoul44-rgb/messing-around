import { AlertTriangle, Wrench } from 'lucide-react';

export default function MessyMiddle({
  story,
}: {
  story: string;
}) {
  if (!story) return null;

  return (
    <div className="my-8 p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-2">
        <Wrench className="w-4 h-4" />
        <span>The Messy Middle (What Went Wrong & What We Learned)</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
        "{story}"
      </p>
    </div>
  );
}
