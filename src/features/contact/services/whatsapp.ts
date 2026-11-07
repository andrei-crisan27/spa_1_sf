import { formatPhoneForDisplay, normalizePhoneNumber } from './phone';

export const WHATSAPP_BASE_URL = 'https://wa.me/';

export interface WhatsAppMessageInput {
  /** Recipient (business owner) phone, any accepted format. */
  to: string;
  name: string;
  phone: string;
  message: string;
  /** Template with {nume}, {telefon}, {mesaj} placeholders. */
  template: string;
}

/** Fills the message template with trimmed sender details. */
export function buildWhatsAppMessage({
  name,
  phone,
  message,
  template,
}: Omit<WhatsAppMessageInput, 'to'>): string {
  const values: Record<string, string> = {
    nume: name.trim(),
    telefon: formatPhoneForDisplay(phone),
    mesaj: message.trim(),
  };
  return template.replace(/\{(nume|telefon|mesaj)\}/g, (_, key: string) => values[key] ?? '');
}

/** Direct chat link without a pre-filled message. */
export function buildWhatsAppChatLink(to: string): string {
  return `${WHATSAPP_BASE_URL}${normalizePhoneNumber(to)}`;
}

/** Pure builder for a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(input: WhatsAppMessageInput): string {
  const text = buildWhatsAppMessage(input);
  return `${buildWhatsAppChatLink(input.to)}?text=${encodeURIComponent(text)}`;
}
