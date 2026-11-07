import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  narrow?: boolean;
  children: ReactNode;
}

/** Centered, padded content width. */
export function Container({
  as: Tag = 'div',
  narrow = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-3xl' : 'max-w-container',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
