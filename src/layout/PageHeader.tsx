import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, motionSafe, staggerContainer } from '@/lib/motion/variants';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
}

/** Banner with the page's single <h1>, used by subpages. */
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  const reduced = useReducedMotion();
  return (
    <div className="relative overflow-hidden bg-header text-header-fg">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute -right-10 -top-10 h-72 w-72 text-accent/15"
      >
        <path
          d="M100 20v160M60 60h80"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <Container className="relative py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.p
              variants={motionSafe(fadeUp, reduced)}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={motionSafe(fadeUp, reduced)}
            className="text-4xl text-header-fg sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.div
            variants={motionSafe(fadeUp, reduced)}
            aria-hidden="true"
            className="mt-5 h-px w-16 bg-accent"
          />
          {lead && (
            <motion.p
              variants={motionSafe(fadeUp, reduced)}
              className="mt-5 text-lg text-header-fg/80"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
