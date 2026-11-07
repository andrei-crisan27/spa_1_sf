import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField, TextareaField } from '@/components/ui/FormField';
import { FORM_RULES, SECTION_IDS } from '@/config/constants';
import { site } from '@/config/site';
import { contactContent } from '@/content/home';
import { cn } from '@/lib/cn';
import { useWhatsAppForm } from './hooks/useWhatsAppForm';
import { OwnerSelector } from './OwnerSelector';
import { SentConfirmation } from './SentConfirmation';

const { form } = contactContent;
const COUNTER_WARNING_RATIO = 0.9;

/** Contact form that composes a WhatsApp message to the chosen owner. */
export function WhatsAppForm() {
  const { values, errors, status, onChange, onBlur, onSubmit, setOwner, reset } = useWhatsAppForm();
  const messageLength = values.message.trim().length;
  const nearLimit = messageLength >= FORM_RULES.messageMaxLength * COUNTER_WARNING_RATIO;

  return (
    <Card className="p-6 sm:p-8">
      <h3
        id={SECTION_IDS.contactForm}
        tabIndex={-1}
        className="mb-6 scroll-mt-header text-2xl outline-none"
      >
        {form.title}
      </h3>
      <AnimatePresence mode="wait" initial={false}>
        {status.kind === 'sent' ? (
          <SentConfirmation key="sent" link={status.link} owner={status.owner} onReset={reset} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0 }}
            className="space-y-5"
            aria-labelledby={SECTION_IDS.contactForm}
          >
            <InputField
              id="contact-name"
              name="name"
              label={form.nameLabel}
              placeholder={form.namePlaceholder}
              autoComplete="name"
              required
              value={values.name}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name}
            />
            <InputField
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              label={form.phoneLabel}
              placeholder={form.phonePlaceholder}
              hint={form.phoneHint}
              autoComplete="tel"
              required
              value={values.phone}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.phone}
            />
            <TextareaField
              id="contact-message"
              name="message"
              label={form.messageLabel}
              placeholder={form.messagePlaceholder}
              required
              rows={5}
              maxLength={FORM_RULES.messageMaxLength}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.message}
              counter={
                <span
                  aria-live="polite"
                  className={cn(
                    'text-xs tabular-nums',
                    nearLimit ? 'text-accent-strong' : 'text-muted',
                  )}
                >
                  {form.counter(messageLength, FORM_RULES.messageMaxLength)}
                </span>
              }
            />
            <OwnerSelector
              label={form.recipientLabel}
              owners={site.owners}
              value={values.ownerId}
              onChange={setOwner}
            />
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              className="w-full"
              leadingIcon={<MessageCircle className="h-5 w-5" />}
            >
              {form.submit}
            </Button>
            <p className="text-sm text-muted">{form.responseNote}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}
