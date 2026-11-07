import { describe, expect, it } from 'vitest';
import { buildWhatsAppChatLink, buildWhatsAppLink, buildWhatsAppMessage } from './whatsapp';

const TEMPLATE = 'Bună ziua, sunt {nume}. Număr de telefon: {telefon}.\n{mesaj}';

describe('buildWhatsAppMessage', () => {
  it('fills the template with trimmed, formatted values', () => {
    const text = buildWhatsAppMessage({
      name: '  Ion Popescu ',
      phone: '0722 123 456',
      message: ' Aș dori informații. ',
      template: TEMPLATE,
    });
    expect(text).toBe(
      'Bună ziua, sunt Ion Popescu. Număr de telefon: +40 722 123 456.\nAș dori informații.',
    );
  });
});

describe('buildWhatsAppLink', () => {
  it('targets the owner number as digits only', () => {
    const link = buildWhatsAppLink({
      to: '+40700000001',
      name: 'A',
      phone: '0722123456',
      message: 'x',
      template: TEMPLATE,
    });
    expect(link.startsWith('https://wa.me/40700000001?text=')).toBe(true);
  });

  it('normalizes a national owner number with a leading 0', () => {
    const link = buildWhatsAppLink({
      to: '0700 000 002',
      name: 'A',
      phone: '0722123456',
      message: 'x',
      template: TEMPLATE,
    });
    expect(link.startsWith('https://wa.me/40700000002?')).toBe(true);
  });

  it('URL-encodes the message so it round-trips exactly', () => {
    const input = {
      to: '+40700000001',
      name: 'Ana & Maria',
      phone: '+40 722 123 456',
      message: 'Întrebare? 100% #urgent',
      template: TEMPLATE,
    };
    const link = buildWhatsAppLink(input);
    const text = new URL(link).searchParams.get('text');
    expect(text).toBe(buildWhatsAppMessage(input));
    expect(link).not.toContain(' ');
    expect(link).toContain('%0A');
  });
});

describe('buildWhatsAppChatLink', () => {
  it('builds a bare chat link', () => {
    expect(buildWhatsAppChatLink('+40 700 000 001')).toBe('https://wa.me/40700000001');
  });
});
