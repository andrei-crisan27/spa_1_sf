import { useCallback, useState } from 'react';

/** Open/close/navigate state for a lightbox. */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);
  return { index, open, close, navigate: setIndex };
}
