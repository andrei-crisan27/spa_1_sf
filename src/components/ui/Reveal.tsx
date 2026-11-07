import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, motionSafe } from '@/lib/motion/variants';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

/** Gently fades content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={motionSafe(variants, reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
