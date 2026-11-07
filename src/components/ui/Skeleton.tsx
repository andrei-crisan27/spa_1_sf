import { cn } from '@/lib/cn';

/** Neutral shimmer block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-lg bg-surface-muted', className)}
    />
  );
}
