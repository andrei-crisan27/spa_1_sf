import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
  active: boolean;
  onEscape?: () => void;
  /** Lock page scroll while active. */
  lockScroll?: boolean;
}

/** Keeps keyboard focus inside `ref` while active, restores focus on close. */
export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T>,
  { active, onEscape, lockScroll = true }: FocusTrapOptions,
): void {
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));

    (getFocusable()[0] ?? container).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (lockScroll) document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [active, lockScroll, ref]);
}
