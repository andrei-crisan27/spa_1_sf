import { Menu, Phone } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SCROLL } from '@/config/constants';
import { primaryOwner, site } from '@/config/site';
import { uiText } from '@/content/common';
import { formatPhoneForDisplay, toTelHref } from '@/features/contact/services/phone';
import { HEADER_SELECTOR } from '@/hooks/headerOffset';
import { useActiveNav } from '@/hooks/useActiveNav';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { NavLinkItem } from './NavLinkItem';
import { ThemeToggle } from './ThemeToggle';

const MOBILE_MENU_ID = 'meniu-mobil';
const headerDataAttribute = { [HEADER_SELECTOR.slice(1, -1)]: '' };

/** Sticky header that condenses on scroll. */
export function Header() {
  const condensed = useScrolled(SCROLL.condenseThreshold);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { isActive } = useActiveNav();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  return (
    <header
      {...headerDataAttribute}
      className={cn(
        'sticky top-0 z-header bg-header/95 text-header-fg backdrop-blur transition-shadow duration-300',
        condensed && 'shadow-lift',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-300',
          condensed ? 'h-header-condensed' : 'h-header',
        )}
      >
        <Logo condensed={condensed} />

        <nav aria-label={uiText.header.navLabel} className="hidden xl:block">
          <ul className="flex items-center gap-0.5 2xl:gap-2">
            {site.nav.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.label}>
                  <NavLinkItem
                    item={item}
                    active={active}
                    className={cn(
                      'relative block whitespace-nowrap rounded-full px-2.5 py-2 text-sm transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 2xl:px-3',
                      active
                        ? 'text-accent after:scale-x-100'
                        : 'text-header-fg/85 after:scale-x-0 hover:text-header-fg hover:after:scale-x-100',
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={toTelHref(primaryOwner.phone)}
            aria-label={uiText.header.callAria(formatPhoneForDisplay(primaryOwner.phone))}
            className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-3 py-2 text-xs font-semibold text-accent-fg shadow-soft transition-colors hover:bg-on-image-accent sm:px-4 sm:text-sm"
          >
            <Phone
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:rotate-12"
            />
            <span className="uppercase tracking-wider">{uiText.header.nonStop}</span>
            <span className="hidden font-medium sm:inline xl:hidden 2xl:inline">
              {formatPhoneForDisplay(primaryOwner.phone)}
            </span>
          </a>
          <ThemeToggle className="hidden sm:flex" />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={uiText.header.openMenu}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-header-fg/20 transition-colors hover:border-accent hover:text-accent xl:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </Container>
      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
