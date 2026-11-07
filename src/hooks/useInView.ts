import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOptions {
  /** Stop observing after the first time the element becomes visible. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

const DEFAULT_THRESHOLD = 0.25;

/** Reports whether an element is in the viewport. */
export function useInView<T extends Element>({
  once = true,
  rootMargin = '0px',
  threshold = DEFAULT_THRESHOLD,
}: UseInViewOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
