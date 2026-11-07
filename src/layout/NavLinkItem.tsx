import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA, ROUTES } from '@/config/constants';
import type { NavItem } from '@/config/site';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';

interface NavLinkItemProps {
  item: NavItem;
  active: boolean;
  className: string;
  onNavigate?: () => void;
  children?: ReactNode;
}

/** Renders a route link or an anchor link that scrolls (navigating home first if needed). */
export function NavLinkItem({ item, active, className, onNavigate, children }: NavLinkItemProps) {
  const { goToSection } = useScrollToAnchor();
  const label = children ?? item.label;

  if (item.kind === 'route') {
    return (
      <Link
        to={item.to}
        aria-current={active ? 'page' : undefined}
        className={className}
        onClick={() => {
          onNavigate?.();
          if (item.to === ROUTES.home && window.location.pathname === ROUTES.home) {
            const reduced = window.matchMedia(MEDIA.reducedMotion).matches;
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }
        }}
      >
        {label}
      </Link>
    );
  }

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    goToSection(item.sectionId);
  };

  return (
    <a
      href={`${ROUTES.home}#${item.sectionId}`}
      aria-current={active ? 'location' : undefined}
      className={className}
      onClick={onClick}
    >
      {label}
    </a>
  );
}
