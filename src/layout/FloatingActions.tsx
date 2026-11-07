import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { primaryOwner } from '@/config/site';
import { uiText } from '@/content/common';
import { toTelHref } from '@/features/contact/services/phone';
import { buildWhatsAppChatLink } from '@/features/contact/services/whatsapp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motionSafe, scaleFade, staggerContainer } from '@/lib/motion/variants';

const ACTION_CLASS =
  'flex h-14 w-14 items-center justify-center rounded-full shadow-lift transition-transform hover:scale-105';

/** Mobile-only quick actions (call + WhatsApp) fixed bottom-right. */
export function FloatingActions() {
  const reduced = useReducedMotion();
  return (
    <motion.nav
      aria-label={uiText.floating.label}
      className="fixed bottom-4 right-4 z-floating flex flex-col gap-3 md:hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.a
        variants={motionSafe(scaleFade, reduced)}
        href={buildWhatsAppChatLink(primaryOwner.phone)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={uiText.floating.whatsapp}
        className={`${ACTION_CLASS} bg-whatsapp text-whatsapp-fg`}
      >
        <MessageCircle aria-hidden="true" className="h-6 w-6" />
      </motion.a>
      <motion.a
        variants={motionSafe(scaleFade, reduced)}
        href={toTelHref(primaryOwner.phone)}
        aria-label={uiText.floating.call}
        className={`${ACTION_CLASS} bg-primary text-primary-fg ring-2 ring-accent/60`}
      >
        <Phone aria-hidden="true" className="h-6 w-6" />
      </motion.a>
    </motion.nav>
  );
}
