import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/ui/Timeline';
import { randuieliContent } from '@/content/randuieli';
import { TableOfContents } from './TableOfContents';

/** Readable article column with a sticky table of contents on desktop. */
export function RanduieliArticle() {
  const { sections, timeline, timelineLabel } = randuieliContent;
  const lastIndex = sections.length - 1;

  return (
    <Container className="py-14 sm:py-20">
      <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <TableOfContents sections={sections} />
        </aside>
        <article className="max-w-prose">
          {sections.map((section, index) => (
            <Reveal key={section.id} className="pb-12 last:pb-0">
              <section
                id={section.id}
                aria-labelledby={`${section.id}-titlu`}
                className="scroll-mt-header"
              >
                <h2 id={`${section.id}-titlu`} className="text-3xl">
                  {section.heading}
                </h2>
                <div aria-hidden="true" className="mt-4 h-px w-12 bg-accent" />
                <div className="mt-6 space-y-5 text-lg leading-8 text-fg/90">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
                {index === lastIndex && (
                  <div className="mt-10 rounded-card border border-border bg-surface p-6 sm:p-8">
                    <h3 className="mb-6 text-2xl">{timelineLabel}</h3>
                    <Timeline entries={timeline} label={timelineLabel} />
                  </div>
                )}
              </section>
            </Reveal>
          ))}
        </article>
      </div>
    </Container>
  );
}
