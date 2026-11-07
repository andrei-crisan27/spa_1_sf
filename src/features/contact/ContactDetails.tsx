import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { site } from '@/config/site';
import { contactContent } from '@/content/home';
import { MapPlaceholder } from './MapPlaceholder';
import { formatPhoneForDisplay, toTelHref } from './services/phone';
import { buildWhatsAppChatLink } from './services/whatsapp';

const { details } = contactContent;

function DetailRow({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sage text-sage-strong"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
          {title}
        </h4>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

/** Owners' phones (call + WhatsApp), email, address, hours and map. */
export function ContactDetails() {
  return (
    <div className="space-y-6">
      <Card className="space-y-6 p-6 sm:p-8">
        <h3 className="text-2xl">{details.title}</h3>
        <DetailRow icon={<Phone className="h-5 w-5" />} title={details.phones}>
          <ul className="space-y-4">
            {site.owners.map((owner) => (
              <li key={owner.id}>
                <p className="font-medium text-heading">{owner.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    href={toTelHref(owner.phone)}
                    aria-label={details.call(owner.name)}
                    leadingIcon={<Phone className="h-4 w-4" />}
                  >
                    {formatPhoneForDisplay(owner.phone)}
                  </Button>
                  <Button
                    size="sm"
                    variant="whatsapp"
                    href={buildWhatsAppChatLink(owner.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    leadingIcon={<MessageCircle className="h-4 w-4" />}
                  >
                    {details.whatsapp(owner.name)}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </DetailRow>
        <DetailRow icon={<Mail className="h-5 w-5" />} title={details.email}>
          <a
            href={`mailto:${site.emails.primary}`}
            className="break-all text-heading underline decoration-accent/50 underline-offset-4 hover:text-accent-strong"
          >
            {site.emails.primary}
          </a>
        </DetailRow>
        <DetailRow icon={<MapPin className="h-5 w-5" />} title={details.address}>
          <address className="not-italic text-fg">{site.address.full}</address>
        </DetailRow>
        <DetailRow icon={<Clock className="h-5 w-5" />} title={details.hours}>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {site.workingHours.map((row) => (
              <div key={row.label} className="contents">
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-medium text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </DetailRow>
      </Card>
      <MapPlaceholder />
    </div>
  );
}
