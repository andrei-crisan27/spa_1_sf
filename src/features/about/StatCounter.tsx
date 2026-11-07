import { COUNT_UP } from '@/config/constants';
import type { StatItem } from '@/content/home';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const NUMBER_LOCALE = 'ro-RO';

/** Highlighted figure that counts up the first time it scrolls into view. */
export function StatCounter({ stat }: { stat: StatItem }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const value = useCountUp(stat.value, COUNT_UP.durationMs, inView, reduced);
  const finalText =
    stat.display ?? `${stat.value.toLocaleString(NUMBER_LOCALE)}${stat.suffix ?? ''}`;
  const animatedText = stat.display ?? `${value.toLocaleString(NUMBER_LOCALE)}${stat.suffix ?? ''}`;

  return (
    <div
      ref={ref}
      className="flex flex-col-reverse rounded-card border border-border bg-surface p-5 text-center shadow-soft"
    >
      <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
      <dd className="font-serif text-4xl font-semibold tabular-nums text-heading">
        <span aria-hidden="true">{animatedText}</span>
        <span className="sr-only">{finalText}</span>
      </dd>
    </div>
  );
}
