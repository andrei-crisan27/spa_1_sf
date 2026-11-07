import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTION_IDS } from '@/config/constants';
import { floralContent, photoGalleryContent, wreathsContent } from '@/content/gallery';
import { AboutSection } from '@/features/about/AboutSection';
import { ContactSection } from '@/features/contact/ContactSection';
import { GallerySection } from '@/features/gallery/GallerySection';
import { HeroSection } from '@/features/hero/HeroSection';
import { IntroSection } from '@/features/hero/IntroSection';
import { ServicesSection } from '@/features/services/ServicesSection';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';

export function HomePage() {
  useDocumentTitle();
  const { hash } = useLocation();
  const { scrollToId } = useScrollToAnchor();

  // Arriving from a subpage with "/#section": scroll once the sections are mounted.
  useEffect(() => {
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => scrollToId(decodeURIComponent(hash.slice(1))));
    return () => window.cancelAnimationFrame(frame);
  }, [hash, scrollToId]);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <GallerySection {...floralContent} tone="default" />
      <GallerySection {...wreathsContent} tone="muted" />
      <GallerySection
        id={SECTION_IDS.gallery}
        eyebrow={photoGalleryContent.eyebrow}
        heading={photoGalleryContent.heading}
        intro={photoGalleryContent.intro}
        images={photoGalleryContent.images}
        tone="sage"
        filters={{
          label: photoGalleryContent.filterLabel,
          items: photoGalleryContent.filters,
          emptyState: photoGalleryContent.emptyState,
        }}
      />
      <AboutSection />
      <ContactSection />
    </>
  );
}
