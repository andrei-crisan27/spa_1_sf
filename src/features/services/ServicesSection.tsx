import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SECTION_IDS } from '@/config/constants';
import { servicesContent } from '@/content/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, motionSafe, staggerContainer } from '@/lib/motion/variants';
import { ServiceCard } from './ServiceCard';

export function ServicesSection() {
  const reduced = useReducedMotion();
  return (
    <Section
      id={SECTION_IDS.services}
      eyebrow={servicesContent.eyebrow}
      heading={servicesContent.heading}
      intro={servicesContent.intro}
      tone="sage"
    >
      <motion.ul
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {servicesContent.items.map((service, index) => (
          <motion.li key={service.id} variants={motionSafe(fadeUp, reduced)}>
            <ServiceCard service={service} index={index} />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
