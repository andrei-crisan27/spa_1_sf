import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Reveal } from './Reveal';

export type SectionTone = 'default' | 'muted' | 'sage';

interface SectionProps {
  id?: string;
  heading?: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  tone?: SectionTone;
  headingLevel?: 'h1' | 'h2';
  align?: 'center' | 'left';
  className?: string;
  children?: ReactNode;
}

const TONES: Record<SectionTone, string> = {
  default: 'bg-bg',
  muted: 'bg-surface-muted',
  sage: 'bg-surface-sage',
};

/** Page section with optional anchor id, heading and intro. */
export function Section({
  id,
  heading,
  eyebrow,
  intro,
  tone = 'default',
  headingLevel: Heading = 'h2',
  align = 'center',
  className,
  children,
}: SectionProps) {
  const headingId = id ? `${id}-titlu` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={heading ? headingId : undefined}
      className={cn('scroll-mt-header py-16 sm:py-20 lg:py-24', TONES[tone], className)}
    >
      <Container>
        {(heading || intro) && (
          <Reveal
            className={cn(
              'mb-10 sm:mb-14',
              align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                {eyebrow}
              </p>
            )}
            {heading && (
              <Heading
                id={headingId}
                className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
              >
                {heading}
              </Heading>
            )}
            <div
              aria-hidden="true"
              className={cn('mt-5 h-px w-16 bg-accent', align === 'center' && 'mx-auto')}
            />
            {intro && <div className="mt-5 text-lg text-muted">{intro}</div>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
