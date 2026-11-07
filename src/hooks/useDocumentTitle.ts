import { useEffect } from 'react';
import { site } from '@/config/site';

/** Sets `document.title` as "<page> | <site name>". */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${site.name}` : `${site.name} ${site.city}`;
  }, [pageTitle]);
}
