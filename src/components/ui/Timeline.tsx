import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, motionSafe, staggerContainer } from '@/lib/motion/variants';

export interface TimelineEntry {
  id: string;
  label: string;
  description: string;
}

/** Vertical timeline with gold markers, revealed with a gentle stagger. */
export function Timeline({ entries, label }: { entries: readonly TimelineEntry[]; label: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.ol
      aria-label={label}
      className="relative ml-3 border-l border-accent/40"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {entries.map((entry) => (
        <motion.li
          key={entry.id}
          variants={motionSafe(fadeUp, reduced)}
          className="relative pb-8 pl-8 last:pb-0"
        >
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
          />
          <p className="font-serif text-xl font-semibold text-heading">{entry.label}</p>
          <p className="mt-1 text-muted">{entry.description}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
