import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children: ReactNode;
}

/** Surface container with soft border and shadow. */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-border bg-surface p-6 shadow-soft',
        interactive &&
          'transition duration-300 focus-within:border-accent/60 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lift',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
