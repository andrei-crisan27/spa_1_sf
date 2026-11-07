import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { primaryOwner, site } from '@/config/site';
import { uiText } from '@/content/common';
import { formatPhoneForDisplay, toTelHref } from '@/features/contact/services/phone';
import { useActiveNav } from '@/hooks/useActiveNav';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { backdrop, drawer, fadeUp, motionSafe, staggerContainer } from '@/lib/motion/variants';
import { NavLinkItem } from './NavLinkItem';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

/** Slide-in drawer: focus trapped, closes on Escape, backdrop click and navigation. */
export function MobileMenu({ open, onClose, id }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isActive } = useActiveNav();
  useFocusTrap(panelRef, { active: open, onEscape: onClose });

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-drawer xl:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-scrim/60 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label={uiText.header.mobileMenuLabel}
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-header text-header-fg shadow-lift"
            variants={motionSafe(drawer, reduced)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between border-b border-header-fg/10 px-5 py-4">
              <span className="font-serif text-xl">{site.name}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={uiText.header.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-header-fg/20 transition-colors hover:border-accent hover:text-accent"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label={uiText.header.navLabel} className="flex-1 overflow-y-auto px-3 py-4">
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                {site.nav.map((item) => {
                  const active = isActive(item);
                  return (
                    <motion.li key={item.label} variants={motionSafe(fadeUp, reduced)}>
                      <NavLinkItem
                        item={item}
                        active={active}
                        onNavigate={onClose}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-3 text-lg transition-colors',
                          active
                            ? 'bg-header-fg/10 text-accent'
                            : 'hover:bg-header-fg/5 hover:text-accent',
                        )}
                      />
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>
            <div className="space-y-3 border-t border-header-fg/10 p-5">
              <Button
                variant="accent"
                href={toTelHref(primaryOwner.phone)}
                className="w-full"
                leadingIcon={<Phone className="h-4 w-4" />}
              >
                {uiText.header.nonStop} · {formatPhoneForDisplay(primaryOwner.phone)}
              </Button>
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
