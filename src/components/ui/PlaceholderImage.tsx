import { useId } from 'react';
import { PLACEHOLDER_MOTIFS, type PlaceholderMotif } from '@/assets/placeholders/motifs';
import { cn } from '@/lib/cn';

export type AspectRatio = '1/1' | '4/3' | '3/4' | '3/2' | '2/3' | '16/9' | '21/9';
export type PlaceholderTone = 'navy' | 'sage' | 'gold' | 'stone';

export interface PlaceholderImageData {
  id: string;
  alt: string;
  caption?: string;
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  ratio: AspectRatio;
}

interface PlaceholderImageProps {
  alt: string;
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  ratio: AspectRatio;
  /** Optional visible label (e.g. "Imagine 1"). */
  label?: string;
  className?: string;
  /** Fills the parent instead of reserving its own aspect ratio. */
  fill?: boolean;
}

/** Gradient stops per tone, expressed as theme token names. */
const TONE_STOPS: Record<PlaceholderTone, [string, string, string]> = {
  navy: ['--ph-navy-from', '--ph-navy-to', '--ph-ink-light'],
  sage: ['--ph-sage-from', '--ph-sage-to', '--ph-ink-light'],
  gold: ['--ph-gold-from', '--ph-gold-to', '--ph-ink-dark'],
  stone: ['--ph-stone-from', '--ph-stone-to', '--ph-ink-dark'],
};

const MOTIF_OPACITY = 0.55;
const MOTIF_STROKE_WIDTH = 1.6;
const MOTIF_SCALE = 0.42;

/**
 * Local SVG placeholder with a soft palette gradient and a respectful line motif.
 * Reserves space via aspect-ratio so nothing shifts when real images arrive.
 */
export function PlaceholderImage({
  alt,
  motif,
  tone,
  ratio,
  label,
  className,
  fill = false,
}: PlaceholderImageProps) {
  const gradientId = useId();
  const [from, to, ink] = TONE_STOPS[tone];
  const motifSize = 100 * MOTIF_SCALE;
  const motifOffset = (100 - motifSize) / 2;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-muted',
        fill && 'h-full w-full',
        className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <svg
        {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: `rgb(var(${from}))` }} />
            <stop offset="100%" style={{ stopColor: `rgb(var(${to}))` }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        <g
          transform={`translate(${motifOffset} ${motifOffset}) scale(${MOTIF_SCALE})`}
          fill="none"
          stroke={`rgb(var(${ink}))`}
          strokeWidth={MOTIF_STROKE_WIDTH / MOTIF_SCALE}
          opacity={MOTIF_OPACITY}
        >
          {PLACEHOLDER_MOTIFS[motif]}
        </g>
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-surface/85 px-2.5 py-0.5 text-xs font-medium text-muted backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
