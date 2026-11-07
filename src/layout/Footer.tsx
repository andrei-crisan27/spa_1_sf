import {
  ArrowUp,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { MEDIA, SECTION_IDS } from '@/config/constants';
import { site, type SocialLink } from '@/config/site';
import { uiText } from '@/content/common';
import { formatPhoneForDisplay, toTelHref } from '@/features/contact/services/phone';
import { buildWhatsAppChatLink } from '@/features/contact/services/whatsapp';
import { Logo } from './Logo';

const SOCIAL_ICONS: Record<SocialLink['icon'], LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

const { footer } = uiText;
const linkClass = 'transition-colors hover:text-accent';

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const backToTop = () => {
    const reduced = window.matchMedia(MEDIA.reducedMotion).matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.getElementById(SECTION_IDS.top)?.focus({ preventScroll: true });
  };

  return (
    <footer className="bg-header text-header-fg/85">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm">{site.legalName}</p>
          <ul className="flex gap-2" aria-label={footer.social}>
            {site.social.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-header-fg/20 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <FooterHeading>{footer.contact}</FooterHeading>
          <ul className="space-y-3 text-sm">
            {site.owners.map((owner) => (
              <li key={owner.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href={toTelHref(owner.phone)} className={`flex items-center gap-2 ${linkClass}`}>
                  <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
                  {formatPhoneForDisplay(owner.phone)}
                </a>
                <a
                  href={buildWhatsAppChatLink(owner.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 text-xs ${linkClass}`}
                >
                  <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  WhatsApp <span className="sr-only">{owner.name}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.emails.primary}`}
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
                {site.emails.primary}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <address className="not-italic">{site.address.full}</address>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>{footer.hours}</FooterHeading>
          <dl className="space-y-2 text-sm">
            {site.workingHours.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 border-b border-header-fg/10 pb-2"
              >
                <dt>{row.label}</dt>
                <dd className="font-medium text-header-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <FooterHeading>{footer.legal}</FooterHeading>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-2">
              <dt>{footer.cui}:</dt>
              <dd>{site.cui}</dd>
            </div>
            <div className="flex gap-2">
              <dt>{footer.regCom}:</dt>
              <dd>{site.regCom}</dd>
            </div>
          </dl>
          <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {footer.consumer}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={site.anpc.sal}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-accent/40 underline-offset-4 ${linkClass}`}
              >
                {footer.sal}
              </a>
            </li>
            <li>
              <a
                href={site.anpc.sol}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline decoration-accent/40 underline-offset-4 ${linkClass}`}
              >
                {footer.sol}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-header-fg/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>{footer.rights(year, site.legalName)}</p>
          <button
            type="button"
            onClick={backToTop}
            className="flex items-center gap-2 rounded-full border border-header-fg/20 px-4 py-2 transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
            {footer.backToTop}
          </button>
        </Container>
      </div>
    </footer>
  );
}
