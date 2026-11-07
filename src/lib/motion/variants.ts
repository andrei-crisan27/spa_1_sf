import type { Transition, Variants } from 'framer-motion';

/** Calm, dignified easing — no bounce. */
export const EASE_GENTLE = [0.22, 0.61, 0.36, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

export const STAGGER = {
  children: 0.07,
} as const;

export const REVEAL_OFFSET_PX = 16;

export const transitionGentle: Transition = { duration: DURATION.base, ease: EASE_GENTLE };

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionGentle },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET_PX },
  visible: { opacity: 1, y: 0, transition: transitionGentle },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.children } },
};

export const drawer: Variants = {
  hidden: { x: '100%', opacity: 0.6 },
  visible: { x: 0, opacity: 1, transition: { duration: DURATION.base, ease: EASE_GENTLE } },
  exit: { x: '100%', opacity: 0.6, transition: { duration: DURATION.fast, ease: EASE_GENTLE } },
};

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transitionGentle },
  exit: { opacity: 0, scale: 0.97, transition: { duration: DURATION.fast } },
};

/** Used when the user prefers reduced motion: opacity only, instantly. */
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 1 },
};

/** Picks a variant set, falling back to no motion when reduced motion is requested. */
export function motionSafe(variants: Variants, reduced: boolean): Variants {
  return reduced ? noMotion : variants;
}
