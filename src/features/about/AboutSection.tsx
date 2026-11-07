import { Check } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SECTION_IDS } from '@/config/constants';
import { aboutContent } from '@/content/home';
import { StatCounter } from './StatCounter';

export function AboutSection() {
  const { image } = aboutContent;
  return (
    <Section
      id={SECTION_IDS.about}
      eyebrow={aboutContent.eyebrow}
      heading={aboutContent.heading}
      tone="default"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-card border-l border-t border-accent"
          />
          <PlaceholderImage
            alt={image.alt}
            motif={image.motif}
            tone={image.tone}
            ratio={image.ratio}
            className="rounded-card shadow-lift"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg text-muted">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {aboutContent.values.map((value) => (
              <li key={value} className="flex items-center gap-3 text-fg">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-sage text-sage-strong"
                >
                  <Check className="h-4 w-4" />
                </span>
                {value}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {aboutContent.stats.map((stat) => (
              <StatCounter key={stat.id} stat={stat} />
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
