import { FORM_RULES } from '@/config/constants';
import { contactContent } from '@/content/home';
import { isValidRomanianPhone } from './phone';

export interface WhatsAppFormValues {
  name: string;
  phone: string;
  message: string;
  ownerId: string;
}

export type WhatsAppFormField = Exclude<keyof WhatsAppFormValues, 'ownerId'>;
export type WhatsAppFormErrors = Partial<Record<WhatsAppFormField, string>>;

const { errors } = contactContent.form;

/** Validates one field; returns an error message or undefined. */
export function validateField(field: WhatsAppFormField, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case 'name':
      if (!trimmed) return errors.nameRequired;
      if (trimmed.length < FORM_RULES.nameMinLength)
        return errors.nameTooShort(FORM_RULES.nameMinLength);
      return undefined;
    case 'phone':
      if (!trimmed) return errors.phoneRequired;
      return isValidRomanianPhone(trimmed) ? undefined : errors.phoneInvalid;
    case 'message':
      if (!trimmed) return errors.messageRequired;
      if (trimmed.length < FORM_RULES.messageMinLength)
        return errors.messageTooShort(FORM_RULES.messageMinLength);
      if (trimmed.length > FORM_RULES.messageMaxLength)
        return errors.messageTooLong(FORM_RULES.messageMaxLength);
      return undefined;
  }
}

export const VALIDATED_FIELDS: readonly WhatsAppFormField[] = ['name', 'phone', 'message'];

export function validateForm(values: WhatsAppFormValues): WhatsAppFormErrors {
  const result: WhatsAppFormErrors = {};
  for (const field of VALIDATED_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) result[field] = error;
  }
  return result;
}
