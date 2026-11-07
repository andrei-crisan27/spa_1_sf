import { ZoomIn } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { uiText } from '@/content/common';
import type { GalleryImage } from '@/content/gallery';

/** Clickable gallery image that opens the lightbox. */
export function GalleryTile({
  image,
  onOpen,
  square = false,
}: {
  image: GalleryImage;
  onOpen: () => void;
  square?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={uiText.lightbox.open(image.alt)}
      className="group relative block w-full overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <PlaceholderImage
        alt={image.alt}
        motif={image.motif}
        tone={image.tone}
        ratio={square ? '1/1' : image.ratio}
        className="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-scrim/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="text-left text-sm text-on-image">{image.caption}</span>
        <ZoomIn className="h-5 w-5 shrink-0 text-on-image-accent" />
      </span>
    </button>
  );
}
