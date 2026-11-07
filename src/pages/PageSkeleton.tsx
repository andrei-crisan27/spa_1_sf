import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';
import { uiText } from '@/content/common';

const LINE_WIDTHS = ['w-full', 'w-11/12', 'w-10/12', 'w-full', 'w-9/12'] as const;

/** Suspense fallback for lazily-loaded pages. */
export function PageSkeleton() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{uiText.loading}</span>
      <div className="bg-header py-16 sm:py-20">
        <Container>
          <Skeleton className="h-4 w-32 bg-header-fg/10" />
          <Skeleton className="mt-4 h-12 w-2/3 bg-header-fg/10" />
          <Skeleton className="mt-5 h-5 w-1/2 bg-header-fg/10" />
        </Container>
      </div>
      <Container className="space-y-4 py-14">
        {LINE_WIDTHS.map((width, index) => (
          <Skeleton key={`${width}-${index}`} className={`h-5 ${width}`} />
        ))}
      </Container>
    </div>
  );
}
