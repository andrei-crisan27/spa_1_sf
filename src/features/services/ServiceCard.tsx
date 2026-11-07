import { Card } from '@/components/ui/Card';
import type { ServiceItem } from '@/content/services';
import { SERVICE_ICONS } from './serviceIcons';

export function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <Card interactive className="group flex h-full flex-col gap-4">
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-sage text-sage-strong transition-colors duration-300 group-hover:bg-primary group-hover:text-accent">
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <span aria-hidden="true" className="font-serif text-2xl tabular-nums text-accent/60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="text-xl leading-snug">{service.title}</h3>
      <p className="text-sm text-muted">{service.description}</p>
    </Card>
  );
}
