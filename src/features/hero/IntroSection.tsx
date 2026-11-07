import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SECTION_IDS } from '@/config/constants';
import { site } from '@/config/site';
import { introContent } from '@/content/home';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';

/** H1 + short introduction with the NON-STOP badge. */
export function IntroSection() {
  const { goToSection } = useScrollToAnchor();
  return (
    <section aria-labelledby="intro-titlu" className="bg-bg py-16 sm:py-20">
      <Container narrow className="text-center">
        <Reveal>
          <Badge tone="accent" pulse className="mb-6">
            {introContent.badge}
          </Badge>
          <h1 id="intro-titlu" className="text-4xl leading-tight sm:text-5xl">
            {introContent.headingPrefix} {site.city}
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-accent-strong">
            {introContent.badgeNote}
          </p>
          <div aria-hidden="true" className="gold-rule mt-6" />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 space-y-5 text-lg text-muted">
          {introContent.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-4">
          <p className="font-serif text-2xl italic text-heading">{introContent.closing}</p>
          <Button
            variant="primary"
            onClick={() => goToSection(SECTION_IDS.contact)}
            leadingIcon={<ArrowRight className="h-4 w-4" />}
          >
            {introContent.closingCta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
