import { uiText } from '@/content/common';
import type { ArticleSection } from '@/content/randuieli';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import { cn } from '@/lib/cn';

/** Sticky in-page navigation with scroll-spy highlighting. */
export function TableOfContents({ sections }: { sections: readonly ArticleSection[] }) {
  const ids = sections.map((section) => section.id);
  const active = useScrollSpy(ids) ?? ids[0];
  const { scrollToId } = useScrollToAnchor();

  return (
    <nav aria-label={uiText.toc} className="sticky top-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
        {uiText.toc}
      </p>
      <ol className="space-y-1 border-l border-border">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  window.history.replaceState(window.history.state, '', `#${section.id}`);
                  scrollToId(section.id, { focus: true });
                }}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors',
                  current
                    ? 'border-accent font-medium text-heading'
                    : 'border-transparent text-muted hover:text-heading',
                )}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
