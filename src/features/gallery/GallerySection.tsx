import { AnimatePresence, motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import { useId } from 'react';
import { Lightbox } from '@/components/ui/Lightbox';
import { Section, type SectionTone } from '@/components/ui/Section';
import type { GalleryFilter, GalleryImage } from '@/content/gallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE_GENTLE } from '@/lib/motion/variants';
import { GalleryFilters } from './GalleryFilters';
import { GalleryTile } from './GalleryTile';
import { useGalleryFilter } from './useGalleryFilter';
import { useLightbox } from './useLightbox';

interface GallerySectionProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  images: readonly GalleryImage[];
  tone?: SectionTone;
  /** When provided, shows filter chips and an animated grid instead of masonry. */
  filters?: { label: string; items: readonly GalleryFilter[]; emptyState: string };
}

/** Reusable gallery: masonry (default) or filterable grid, with a shared lightbox. */
export function GallerySection({
  id,
  eyebrow,
  heading,
  intro,
  images,
  tone,
  filters,
}: GallerySectionProps) {
  const gridId = useId();
  const reduced = useReducedMotion();
  const { activeFilter, setActiveFilter, visible } = useGalleryFilter(images);
  const lightbox = useLightbox();
  const shown = filters ? visible : images;

  return (
    <Section id={id} eyebrow={eyebrow} heading={heading} intro={intro} tone={tone}>
      {filters && (
        <GalleryFilters
          label={filters.label}
          filters={filters.items}
          active={activeFilter}
          onChange={(next) => {
            setActiveFilter(next);
            lightbox.close();
          }}
          controls={gridId}
        />
      )}

      {filters ? (
        <motion.ul
          id={gridId}
          layout={!reduced}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((image, index) => (
              <motion.li
                key={image.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: DURATION.base, ease: EASE_GENTLE }}
              >
                <GalleryTile image={image} square onOpen={() => lightbox.open(index)} />
              </motion.li>
            ))}
          </AnimatePresence>
          {shown.length === 0 && (
            <li className="col-span-full flex flex-col items-center gap-3 rounded-card border border-dashed border-border py-16 text-muted">
              <ImageOff aria-hidden="true" className="h-8 w-8 text-accent" />
              {filters.emptyState}
            </li>
          )}
        </motion.ul>
      ) : (
        <ul id={gridId} className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4">
          {shown.map((image, index) => (
            <li key={image.id} className="break-inside-avoid">
              <GalleryTile image={image} onOpen={() => lightbox.open(index)} />
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        images={shown}
        index={lightbox.index}
        onClose={lightbox.close}
        onNavigate={lightbox.navigate}
      />
    </Section>
  );
}
