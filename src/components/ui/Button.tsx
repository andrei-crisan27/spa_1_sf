import {
  forwardRef,
  type Ref,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 select-none';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg shadow-soft hover:bg-primary-hover',
  accent:
    'bg-accent text-accent-fg shadow-soft hover:bg-accent-strong hover:text-primary-fg dark:hover:text-accent-fg',
  outline:
    'border border-border bg-surface/60 text-heading hover:border-accent hover:text-accent-strong',
  ghost: 'text-heading hover:bg-surface-muted',
  whatsapp: 'bg-whatsapp text-whatsapp-fg shadow-soft hover:bg-whatsapp-hover',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
  icon: 'h-11 w-11',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

type AsButton = StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; to?: never };
type AsAnchor = StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never };
type AsLink = StyleProps & Omit<LinkProps, 'className'> & { to: LinkProps['to']; href?: never };

export type ButtonProps = AsButton | AsAnchor | AsLink;

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

/** Button that renders as <button>, <a href> or router <Link to> with shared styling. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant, size, leadingIcon, children, className, ...rest } = props;
    const classes = buttonClasses(variant, size, className);
    const content = (
      <>
        {leadingIcon && (
          <span aria-hidden="true" className="shrink-0">
            {leadingIcon}
          </span>
        )}
        {children}
      </>
    );

    if ('to' in rest && rest.to !== undefined) {
      return (
        <Link ref={ref as Ref<HTMLAnchorElement>} className={classes} {...(rest as LinkProps)}>
          {content}
        </Link>
      );
    }
    if ('href' in rest && rest.href !== undefined) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);
