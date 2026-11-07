import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import type { Owner } from '@/config/site';
import { contactContent } from '@/content/home';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motionSafe, scaleFade } from '@/lib/motion/variants';

interface SentConfirmationProps {
  link: string;
  owner: Owner;
  onReset: () => void;
}

const { success } = contactContent.form;

/** Animated "opening WhatsApp" state with a manual fallback link. */
export function SentConfirmation({ link, owner, onReset }: SentConfirmationProps) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      role="status"
      variants={motionSafe(scaleFade, reduced)}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-4 rounded-card bg-surface-sage px-6 py-10 text-center"
    >
      <motion.span
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-success shadow-soft"
      >
        <CheckCircle2 aria-hidden="true" className="h-8 w-8" />
      </motion.span>
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
        {success.title}
      </h3>
      <p className="max-w-sm text-muted">
        {success.body} <span className="font-medium text-fg">({owner.name})</span>
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="whatsapp"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          leadingIcon={<ExternalLink className="h-4 w-4" />}
        >
          {success.fallback}
        </Button>
        <Button variant="outline" onClick={onReset} leadingIcon={<RotateCcw className="h-4 w-4" />}>
          {success.reset}
        </Button>
      </div>
    </motion.div>
  );
}
