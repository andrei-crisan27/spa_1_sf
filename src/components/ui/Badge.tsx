import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeTone = 'accent' | 'primary' | 'sage';

const TONES: Record<BadgeTone, string> = {
  accent: 'border-accent/50 bg-accent/10 text-accent-strong',
  primary: 'border-primary/20 bg-primary text-primary-fg',
  sage: 'border-sage/40 bg-surface-sage text-sage-strong',
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}

/** Small label pill, optionally with a calm "live" dot. */
export function Badge({ tone = 'accent', children, className, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        TONES[tone],
        className,
      )}
    >
      {pulse && (
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
