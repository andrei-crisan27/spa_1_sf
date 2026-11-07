import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  /** Extra content aligned right of the label (e.g. a character counter). */
  aside?: ReactNode;
  children: ReactNode;
}

export const fieldIds = (id: string) => ({ hint: `${id}-hint`, error: `${id}-error` });

/** Describes a control by its hint and error ids. */
export function describedBy(id: string, hint: boolean, error: boolean): string | undefined {
  const ids = fieldIds(id);
  const parts = [hint && ids.hint, error && ids.error].filter(Boolean);
  return parts.length ? parts.join(' ') : undefined;
}

/** Label + control + hint + animated error message. */
export function FieldShell({ id, label, required, hint, error, aside, children }: FieldShellProps) {
  const ids = fieldIds(id);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-heading">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-accent-strong">
              *
            </span>
          )}
        </label>
        {aside}
      </div>
      {children}
      {hint && (
        <p id={ids.hint} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={ids.error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"
          >
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const CONTROL =
  'w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-0';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
}

export function InputField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(hint), Boolean(error))}
        className={cn(CONTROL, error ? 'border-danger' : 'border-border', className)}
        {...rest}
      />
    </FieldShell>
  );
}

interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  counter?: ReactNode;
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  counter,
  required,
  className,
  ...rest
}: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} aside={counter}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(hint), Boolean(error))}
        className={cn(
          CONTROL,
          'min-h-32 resize-y',
          error ? 'border-danger' : 'border-border',
          className,
        )}
        {...rest}
      />
    </FieldShell>
  );
}
