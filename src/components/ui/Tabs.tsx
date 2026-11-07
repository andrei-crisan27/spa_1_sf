import { AnimatePresence, motion } from 'framer-motion';
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { fadeUp, motionSafe } from '@/lib/motion/variants';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: readonly TabItem[];
  label: string;
  defaultId?: string;
}

/** Tabs following the WAI-ARIA pattern: arrows/Home/End move between tabs. */
export function Tabs({ items, label, defaultId }: TabsProps) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id ?? '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  const focusTab = (index: number) => {
    const target = items[index];
    if (!target) return;
    setActiveId(target.id);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const keyMap: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = keyMap[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusTab(next);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="grid grid-cols-2 gap-2 rounded-card border border-border bg-surface p-2 lg:grid-cols-4"
      >
        {items.map((item, index) => {
          const selected = item.id === active?.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-${item.id}-tab`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-${item.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'relative rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                selected
                  ? 'text-primary-fg'
                  : 'text-muted hover:bg-surface-muted hover:text-heading',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={
                    reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 36 }
                  }
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {active && (
          <motion.div
            key={active.id}
            id={`${baseId}-${active.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${active.id}-tab`}
            tabIndex={0}
            variants={motionSafe(fadeUp, reduced)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-6 rounded-card"
          >
            {active.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
