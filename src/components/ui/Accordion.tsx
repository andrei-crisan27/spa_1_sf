import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { DURATION, EASE_GENTLE } from '@/lib/motion/variants';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** Id open by default. */
  defaultOpenId?: string;
  /** Allow several panels open at once. */
  multiple?: boolean;
}

/** Disclosure list following the WAI-ARIA accordion pattern. */
export function Accordion({ items, defaultOpenId, multiple = false }: AccordionProps) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : multiple ? [...current, id] : [id],
    );

  return (
    <div className="divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const buttonId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3 className="font-sans text-base font-semibold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-heading transition-colors hover:bg-surface-muted"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 text-accent transition-transform duration-300',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE_GENTLE }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-1">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
