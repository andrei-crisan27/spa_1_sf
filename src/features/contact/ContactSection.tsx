import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SECTION_IDS } from '@/config/constants';
import { contactContent } from '@/content/home';
import { ContactDetails } from './ContactDetails';
import { WhatsAppForm } from './WhatsAppForm';

export function ContactSection() {
  return (
    <Section
      id={SECTION_IDS.contact}
      eyebrow={contactContent.eyebrow}
      heading={contactContent.heading}
      intro={contactContent.intro}
      tone="muted"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <Reveal>
          <WhatsAppForm />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactDetails />
        </Reveal>
      </div>
    </Section>
  );
}
