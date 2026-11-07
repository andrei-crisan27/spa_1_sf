import { describe, expect, it } from 'vitest';
import {
  formatPhoneForDisplay,
  isValidRomanianPhone,
  normalizePhoneNumber,
  toTelHref,
} from './phone';

describe('normalizePhoneNumber', () => {
  it.each([
    ['0722 123 456', '40722123456'],
    ['+40 722 123 456', '40722123456'],
    ['+40700000001', '40700000001'],
    ['0040-722-123-456', '40722123456'],
    ['(0722) 123.456', '40722123456'],
    ['  0259 123 456 ', '40259123456'],
  ])('normalizes %s -> %s', (input, expected) => {
    expect(normalizePhoneNumber(input)).toBe(expected);
  });
});

describe('isValidRomanianPhone', () => {
  it.each([
    '0722 123 456',
    '+40 722 123 456',
    '0722123456',
    '0040722123456',
    '0259 123 456',
    '+40700000002',
  ])('accepts %s', (input) => expect(isValidRomanianPhone(input)).toBe(true));

  it.each([
    '',
    '0722 123 45',
    '0722 123 4567',
    '0122 123 456',
    '+44 7700 900123',
    '07ab 123 456',
    '722123456',
  ])('rejects %s', (input) => expect(isValidRomanianPhone(input)).toBe(false));
});

describe('formatting helpers', () => {
  it('formats valid numbers in international style', () => {
    expect(formatPhoneForDisplay('0722123456')).toBe('+40 722 123 456');
  });

  it('leaves invalid numbers as typed', () => {
    expect(formatPhoneForDisplay(' 12345 ')).toBe('12345');
  });

  it('builds tel hrefs', () => {
    expect(toTelHref('0722 123 456')).toBe('tel:+40722123456');
  });
});
