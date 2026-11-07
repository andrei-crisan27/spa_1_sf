/** Data attribute placed on the sticky header so scroll helpers can measure it. */
export const HEADER_SELECTOR = '[data-site-header]';

/** Current rendered height of the sticky header (0 if not mounted). */
export function getHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  return header?.offsetHeight ?? 0;
}
