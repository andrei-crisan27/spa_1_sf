import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { site } from '@/config/site';
import { uiText } from '@/content/common';
import { cn } from '@/lib/cn';

/** Cross mark + business name placeholder. */
export function Logo({
  condensed = false,
  onNavigate,
}: {
  condensed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={ROUTES.home}
      onClick={onNavigate}
      aria-label={uiText.header.homeAria}
      className="group flex min-w-0 items-center gap-2 rounded-lg sm:gap-3"
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full border border-accent/70 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-fg',
          condensed ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-9 w-9 sm:h-11 sm:w-11',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M12 3v18M7 8h10" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'whitespace-nowrap font-serif font-semibold text-header-fg transition-all duration-300',
            condensed ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl',
          )}
        >
          {site.name}
        </span>
        <span className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-accent">
          {site.city}
        </span>
      </span>
    </Link>
  );
}
