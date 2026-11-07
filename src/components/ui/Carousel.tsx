import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import { CAROUSEL } from '@/config/constants';
import { uiText } from '@/content/common';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { DURATION, EASE_GENTLE } from '@/lib/motion/variants';

interface CarouselProps<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  renderSlide: (item: T, index: number) => ReactNode;
  label: string;
  className?: string;
}

/**
 * Accessible fading carousel: auto-advances (paused on hover/focus, disabled for
 * reduced motion), supports arrows, dots, keyboard and touch swipe.
 */
export function Carousel<T>({ items, getKey, renderSlide, label, className }: CarouselProps<T>) {
  const id = useId();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const count = items.length;
  const playing = !reduced && !userPaused && !hovered && !focused && count > 1;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => go(index + 1), CAROUSEL.autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [playing, index, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe =
      Math.abs(info.offset.x) > CAROUSEL.swipeThresholdPx ||
      Math.abs(info.velocity.x) > CAROUSEL.swipeVelocity;
    if (!swipe) return;
    go(info.offset.x < 0 ? index + 1 : index - 1);
  };

  /** Arrow keys on any control move between slides. */
  const onControlKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') go(index + 1);
    if (event.key === 'ArrowLeft') go(index - 1);
  };

  const current = items[index];
  const controlClass =
    'flex h-11 w-11 items-center justify-center rounded-full bg-surface/80 text-heading shadow-soft backdrop-blur transition-colors hover:bg-surface hover:text-accent-strong';

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('relative', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div
        id={`${id}-slides`}
        aria-live={playing ? 'off' : 'polite'}
        className="relative h-full overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {current && (
            <motion.div
              key={getKey(current)}
              role="group"
              aria-roledescription="slide"
              aria-label={uiText.carousel.slideLabel(index + 1, count)}
              className="absolute inset-0 touch-pan-y"
              initial={reduced ? false : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE_GENTLE }}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
            >
              {renderSlide(current, index)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-3 px-4">
          <button
            type="button"
            className={controlClass}
            onClick={() => go(index - 1)}
            onKeyDown={onControlKeyDown}
            aria-controls={`${id}-slides`}
            aria-label={uiText.carousel.previous}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-1 rounded-full bg-surface/80 px-2 py-1 shadow-soft backdrop-blur sm:flex">
            {/* Dots hidden on small screens; swipe and arrows remain. */}
            {items.map((item, dotIndex) => (
              <button
                key={getKey(item)}
                type="button"
                onClick={() => go(dotIndex)}
                onKeyDown={onControlKeyDown}
                aria-label={uiText.carousel.goTo(dotIndex + 1)}
                aria-current={dotIndex === index ? 'true' : undefined}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    dotIndex === index ? 'w-5 bg-accent' : 'w-1.5 bg-muted/50',
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={controlClass}
            onClick={() => go(index + 1)}
            onKeyDown={onControlKeyDown}
            aria-controls={`${id}-slides`}
            aria-label={uiText.carousel.next}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
          {!reduced && (
            <button
              type="button"
              className={controlClass}
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={userPaused ? uiText.carousel.play : uiText.carousel.pause}
            >
              {userPaused ? (
                <Play aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Pause aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
