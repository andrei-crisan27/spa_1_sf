import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect } from 'react';
import { uiText } from '@/content/common';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeIn, motionSafe } from '@/lib/motion/variants';
import { Modal } from './Modal';
import { PlaceholderImage, type PlaceholderImageData } from './PlaceholderImage';

interface LightboxProps {
  images: readonly PlaceholderImageData[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Full-screen image viewer: arrow keys navigate, Escape closes. */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const reduced = useReducedMotion();
  const open = index !== null && images[index] !== undefined;
  const current = index !== null ? images[index] : undefined;
  const count = images.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNavigate((index + 1) % count);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, count, onNavigate]);

  const controlClass =
    'flex h-11 w-11 items-center justify-center rounded-full bg-on-image/10 text-on-image transition-colors hover:bg-on-image/20';

  return (
    <Modal open={open} onClose={onClose} label={uiText.lightbox.label} className="w-full max-w-4xl">
      {current && index !== null && (
        <figure className="flex flex-col items-center gap-4">
          <div className="relative w-full overflow-hidden rounded-card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                variants={motionSafe(fadeIn, reduced)}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <PlaceholderImage
                  alt={current.alt}
                  motif={current.motif}
                  tone={current.tone}
                  ratio="3/2"
                  className="max-h-[75vh]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <figcaption className="flex w-full items-center justify-between gap-4 text-sm text-on-image/85">
            <span>{current.caption ?? current.alt}</span>
            <span aria-live="polite" className="shrink-0 tabular-nums">
              {uiText.lightbox.counter(index + 1, count)}
            </span>
          </figcaption>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={controlClass}
              onClick={() => onNavigate((index - 1 + count) % count)}
              aria-label={uiText.lightbox.previous}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={controlClass}
              onClick={onClose}
              aria-label={uiText.lightbox.close}
            >
              <X aria-hidden="true" />
            </button>
            <button
              type="button"
              className={controlClass}
              onClick={() => onNavigate((index + 1) % count)}
              aria-label={uiText.lightbox.next}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </figure>
      )}
    </Modal>
  );
}
