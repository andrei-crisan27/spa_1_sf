import { useEffect, useState } from 'react';

/** Animates a number from 0 to `target` once `start` is true (eased, rAF-based). */
export function useCountUp(target: number, durationMs: number, start: boolean, instant = false) {
  const [value, setValue] = useState(instant ? target : 0);

  useEffect(() => {
    if (!start) return;
    if (instant) {
      setValue(target);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - begin) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, start, instant]);

  return value;
}
