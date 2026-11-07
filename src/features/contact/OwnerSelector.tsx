import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import { useId } from 'react';
import type { Owner } from '@/config/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { formatPhoneForDisplay } from './services/phone';

interface OwnerSelectorProps {
  label: string;
  owners: readonly Owner[];
  value: string;
  onChange: (ownerId: string) => void;
}

/** Segmented radio group for choosing which owner receives the message. */
export function OwnerSelector({ label, owners, value, onChange }: OwnerSelectorProps) {
  const groupId = useId();
  const reduced = useReducedMotion();
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-heading">{label}</legend>
      <div className="grid gap-2 rounded-2xl border border-border bg-surface-muted p-1.5 sm:grid-cols-2">
        {owners.map((owner) => {
          const checked = owner.id === value;
          const inputId = `${groupId}-${owner.id}`;
          return (
            <label
              key={owner.id}
              htmlFor={inputId}
              className={cn(
                'relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-accent',
                checked ? 'text-primary-fg' : 'text-fg hover:bg-surface',
              )}
            >
              {checked && (
                <motion.span
                  layoutId={`${groupId}-pill`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-primary shadow-soft"
                  transition={
                    reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 38 }
                  }
                />
              )}
              <input
                id={inputId}
                type="radio"
                name="ownerId"
                value={owner.id}
                checked={checked}
                onChange={() => onChange(owner.id)}
                className="sr-only"
              />
              <UserRound
                aria-hidden="true"
                className={cn('relative h-5 w-5 shrink-0', checked ? 'text-accent' : 'text-muted')}
              />
              <span className="relative flex flex-col leading-tight">
                <span className="font-medium">{owner.name}</span>
                <span className={cn('text-xs', checked ? 'text-primary-fg/80' : 'text-muted')}>
                  {formatPhoneForDisplay(owner.phone)}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
