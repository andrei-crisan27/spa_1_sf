/** Romanian country calling code. */
export const RO_COUNTRY_CODE = '40';

/** National significant number: 9 digits, starting with 2/3 (landline) or 7 (mobile). */
const RO_INTERNATIONAL_PATTERN = /^40[237]\d{8}$/;
/** Characters people commonly use to group digits. */
const SEPARATORS = /[\s\-()./]/g;
const INTERNATIONAL_PREFIX = '00';

/**
 * Normalizes a Romanian phone number to international digits only (e.g. "40722123456").
 * Strips separators and "+", converts "00" prefix, and replaces a leading "0" with "40".
 * Returns the cleaned digits even when invalid, so callers can validate separately.
 */
export function normalizePhoneNumber(input: string): string {
  let digits = input.trim().replace(SEPARATORS, '');
  if (digits.startsWith('+')) digits = digits.slice(1);
  else if (digits.startsWith(INTERNATIONAL_PREFIX))
    digits = digits.slice(INTERNATIONAL_PREFIX.length);
  else if (digits.startsWith('0')) digits = `${RO_COUNTRY_CODE}${digits.slice(1)}`;
  return digits;
}

/** True for valid Romanian numbers, e.g. "0722 123 456", "+40 722 123 456", "0040722123456". */
export function isValidRomanianPhone(input: string): boolean {
  if (/[^\d\s\-()./+]/.test(input.trim())) return false;
  return RO_INTERNATIONAL_PATTERN.test(normalizePhoneNumber(input));
}

/** Formats a valid number as "+40 7xx xxx xxx"; returns the trimmed input otherwise. */
export function formatPhoneForDisplay(input: string): string {
  const digits = normalizePhoneNumber(input);
  if (!RO_INTERNATIONAL_PATTERN.test(digits)) return input.trim();
  const national = digits.slice(RO_COUNTRY_CODE.length);
  return `+${RO_COUNTRY_CODE} ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
}

/** Builds a tel: href from any accepted format. */
export function toTelHref(input: string): string {
  return `tel:+${normalizePhoneNumber(input)}`;
}
