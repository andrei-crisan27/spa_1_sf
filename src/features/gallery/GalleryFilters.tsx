import { motion } from 'framer-motion';
import { useId } from 'react';
import type { GalleryFilter } from '@/content/gallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface GalleryFiltersProps {
  label: string;
  filters: readonly GalleryFilter[];
  active: GalleryFilter['id'];
  onChange: (id: GalleryFilter['id']) => void;
  controls: string;
}

/** Filter chips (toggle buttons) for the gallery grid. */
export function GalleryFilters({
  label,
  filters,
  active,
  onChange,
  controls,
}: GalleryFiltersProps) {
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <div role="group" aria-label={label} className="mb-8 flex flex-wrap justify-center gap-2">
      {filters.map((filter) => {
        const selected = filter.id === active;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={selected}
            aria-controls={controls}
            onClick={() => onChange(filter.id)}
            className={cn(
              'relative rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              selected
                ? 'border-primary text-primary-fg'
                : 'border-border bg-surface text-muted hover:border-accent hover:text-heading',
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${id}-chip`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-primary"
                transition={
                  reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 36 }
                }
              />
            )}
            <span className="relative">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
