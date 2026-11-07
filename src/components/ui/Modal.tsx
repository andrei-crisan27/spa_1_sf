import { AnimatePresence, motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { backdrop, motionSafe, scaleFade } from '@/lib/motion/variants';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
}

/** Accessible dialog rendered in a portal, with focus trap, Escape and backdrop close. */
export function Modal({ open, onClose, label, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useFocusTrap(panelRef, { active: open, onEscape: onClose });

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-modal flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={motionSafe(backdrop, reduced)}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-scrim/90" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            variants={motionSafe(scaleFade, reduced)}
            className={cn('relative z-10 outline-none', className)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
