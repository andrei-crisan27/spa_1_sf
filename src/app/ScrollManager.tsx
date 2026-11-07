import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on route change (unless a hash is present — the page handles that). */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}
