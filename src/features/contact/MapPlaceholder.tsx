import { MapPin } from 'lucide-react';
import { site } from '@/config/site';
import { contactContent } from '@/content/home';

/** Styled stand-in for a map embed (no external requests). */
export function MapPlaceholder() {
  return (
    <div
      role="img"
      aria-label={`${contactContent.details.mapLabel}: ${site.address.full}`}
      className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-card border border-border bg-surface-sage"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 225"
        className="absolute inset-0 h-full w-full text-sage/30"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <path d="M0 160 Q 160 80 400 130" stroke="currentColor" strokeWidth="10" fill="none" />
        <path d="M120 0 Q 150 120 110 225" stroke="currentColor" strokeWidth="6" fill="none" />
      </svg>
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-accent shadow-lift">
          <MapPin aria-hidden="true" className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-muted">
          {contactContent.details.mapNote}
        </span>
      </div>
    </div>
  );
}
