import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES, SECTION_IDS } from '@/config/constants';
import { site, type NavItem } from '@/config/site';
import { useScrollSpy } from './useScrollSpy';

/** Section ids in page order, as they appear on the home page. */
const HOME_SECTION_ORDER: readonly string[] = [
  SECTION_IDS.services,
  SECTION_IDS.gallery,
  SECTION_IDS.about,
  SECTION_IDS.contact,
];

/**
 * Decides which nav item is active: route items by pathname, anchor items by
 * scroll-spy on the home page ("Prima pagină" is active above the first section).
 */
export function useActiveNav() {
  const { pathname } = useLocation();
  const onHome = pathname === ROUTES.home;
  const anchorIds = useMemo(() => {
    const navAnchors = new Set<string>(
      site.nav.flatMap((item) => (item.kind === 'anchor' ? [item.sectionId] : [])),
    );
    return HOME_SECTION_ORDER.filter((id) => navAnchors.has(id));
  }, []);
  const activeSection = useScrollSpy(anchorIds, onHome);

  const isActive = useCallback(
    (item: NavItem): boolean => {
      if (item.kind === 'anchor') return onHome && activeSection === item.sectionId;
      if (item.to === ROUTES.home) return onHome && activeSection === null;
      return pathname.startsWith(item.to);
    },
    [activeSection, onHome, pathname],
  );

  return { isActive };
}
