import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { getHeaderOffset } from './headerOffset';
import { useReducedMotion } from './useReducedMotion';

/**
 * Smooth-scrolls to in-page sections, accounting for the sticky header.
 * From a subpage, it navigates home with the hash; the home page then scrolls on mount.
 */
export function useScrollToAnchor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  const scrollToId = useCallback(
    (id: string, { focus = false }: { focus?: boolean } = {}): boolean => {
      const element = document.getElementById(id);
      if (!element) return false;
      const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      if (focus) {
        if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }
      return true;
    },
    [reducedMotion],
  );

  const goToSection = useCallback(
    (id: string) => {
      if (pathname === ROUTES.home) {
        window.history.replaceState(window.history.state, '', `#${id}`);
        scrollToId(id, { focus: true });
      } else {
        navigate({ pathname: ROUTES.home, hash: id });
      }
    },
    [navigate, pathname, scrollToId],
  );

  return { goToSection, scrollToId };
}
