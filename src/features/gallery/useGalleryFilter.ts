import { useMemo, useState } from 'react';
import type { GalleryFilter, GalleryImage } from '@/content/gallery';

export const ALL_FILTER_ID: GalleryFilter['id'] = 'toate';

/** Filters gallery images by category ("toate" shows everything). */
export function useGalleryFilter(images: readonly GalleryImage[]) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter['id']>(ALL_FILTER_ID);
  const visible = useMemo(
    () =>
      activeFilter === ALL_FILTER_ID
        ? images
        : images.filter((image) => image.category === activeFilter),
    [images, activeFilter],
  );
  return { activeFilter, setActiveFilter, visible };
}
