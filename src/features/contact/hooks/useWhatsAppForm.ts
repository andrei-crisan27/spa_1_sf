import { useCallback, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { site, type Owner } from '@/config/site';
import { contactContent } from '@/content/home';
import {
  validateField,
  validateForm,
  VALIDATED_FIELDS,
  type WhatsAppFormErrors,
  type WhatsAppFormField,
  type WhatsAppFormValues,
} from '../services/validation';
import { buildWhatsAppLink } from '../services/whatsapp';

type Status = { kind: 'idle' } | { kind: 'sent'; link: string; owner: Owner };

const INITIAL_VALUES: WhatsAppFormValues = {
  name: '',
  phone: '',
  message: '',
  ownerId: site.owners[0].id,
};

/** Form state, validation and submission (opens WhatsApp in a new tab). */
export function useWhatsAppForm() {
  const [values, setValues] = useState<WhatsAppFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<WhatsAppFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<WhatsAppFormField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setValues((current) => ({ ...current, [name]: value }));
      if (
        (VALIDATED_FIELDS as readonly string[]).includes(name) &&
        touched[name as WhatsAppFormField]
      ) {
        setErrors((current) => ({
          ...current,
          [name]: validateField(name as WhatsAppFormField, value),
        }));
      }
    },
    [touched],
  );

  const onBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as WhatsAppFormField;
    if (!(VALIDATED_FIELDS as readonly string[]).includes(field)) return;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value) }));
  }, []);

  const setOwner = useCallback(
    (ownerId: string) => setValues((current) => ({ ...current, ownerId })),
    [],
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const nextErrors = validateForm(values);
      setErrors(nextErrors);
      setTouched({ name: true, phone: true, message: true });
      const firstInvalid = VALIDATED_FIELDS.find((field) => nextErrors[field]);
      if (firstInvalid) {
        event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
        return;
      }
      const owner = site.owners.find((item) => item.id === values.ownerId) ?? site.owners[0];
      const link = buildWhatsAppLink({
        to: owner.phone,
        name: values.name,
        phone: values.phone,
        message: values.message,
        template: contactContent.whatsAppTemplate,
      });
      window.open(link, '_blank', 'noopener,noreferrer');
      setStatus({ kind: 'sent', link, owner });
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setStatus({ kind: 'idle' });
  }, []);

  return { values, errors, status, onChange, onBlur, onSubmit, setOwner, reset };
}
