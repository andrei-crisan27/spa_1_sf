import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Carousel } from '@/components/ui/Carousel';
import { Container } from '@/components/ui/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SECTION_IDS } from '@/config/constants';
import { primaryOwner } from '@/config/site';
import { heroContent } from '@/content/home';
import { toTelHref } from '@/features/contact/services/phone';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import { fadeUp, motionSafe, staggerContainer } from '@/lib/motion/variants';

/** Photo carousel with a respectful tagline and the two main calls to action. */
export function HeroSection() {
  const reduced = useReducedMotion();
  const { scrollToId } = useScrollToAnchor();

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={heroContent.carouselLabel}
      className="relative bg-header"
    >
      <Carousel
        label={heroContent.carouselLabel}
        items={heroContent.slides}
        getKey={(slide) => slide.id}
        className="h-[72svh] max-h-[44rem] min-h-[28rem]"
        renderSlide={(slide) => (
          <PlaceholderImage
            fill
            alt={slide.alt}
            motif={slide.motif}
            tone={slide.tone}
            ratio={slide.ratio}
          />
        )}
      />
      {/* Readability scrim — sits above slides, below text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/45 to-scrim/20"
      />
      <div className="pointer-events-none absolute inset-0 flex items-end pb-24 sm:items-center sm:pb-0">
        <Container>
          <motion.div
            className="pointer-events-auto max-w-2xl text-on-image"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={motionSafe(fadeUp, reduced)}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-on-image-accent"
            >
              {heroContent.eyebrow}
            </motion.p>
            <motion.p
              variants={motionSafe(fadeUp, reduced)}
              className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            >
              {heroContent.tagline}
            </motion.p>
            <motion.p
              variants={motionSafe(fadeUp, reduced)}
              className="mt-4 max-w-xl text-base text-on-image/85 sm:text-lg"
            >
              {heroContent.subline}
            </motion.p>
            <motion.div
              variants={motionSafe(fadeUp, reduced)}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                variant="accent"
                size="lg"
                href={toTelHref(primaryOwner.phone)}
                leadingIcon={<Phone className="h-5 w-5" />}
                className="hover:bg-on-image-accent hover:text-accent-fg"
              >
                {heroContent.ctaCall}
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() => scrollToId(SECTION_IDS.contactForm, { focus: true })}
                leadingIcon={<MessageCircle className="h-5 w-5" />}
              >
                {heroContent.ctaWhatsApp}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
