import { MEDIA } from '@/config/constants';
import { useMediaQuery } from './useMediaQuery';

/** True when the visitor asked the OS to minimise motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery(MEDIA.reducedMotion);
}
