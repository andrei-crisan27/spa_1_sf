import { useEffect, useState } from 'react';
import { SCROLL } from '@/config/constants';
import { getHeaderOffset } from './headerOffset';

/**
 * Returns the id of the section currently being read, or null when above all of them.
 * A section is "active" once its top passes a line slightly below the sticky header.
 */
export function useScrollSpy(sectionIds: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join('|');

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }
    const ids = idsKey.split('|').filter(Boolean);
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = getHeaderOffset() + window.innerHeight * SCROLL.spyViewportRatio;
      let current: string | null = null;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && ids.length > 0) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idsKey, enabled]);

  return activeId;
}
