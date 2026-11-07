import {
  Building2,
  ClipboardList,
  Cross,
  FileText,
  Flower2,
  Landmark,
  Shirt,
  Truck,
  UtensilsCrossed,
  Wheat,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceIcon } from '@/content/services';

export const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  consult: Users,
  coffin: Cross,
  flowers: Flower2,
  transport: Truck,
  memorial: ClipboardList,
  bread: Wheat,
  catering: UtensilsCrossed,
  dressing: Shirt,
  chapel: Building2,
  documents: FileText,
  pension: Landmark,
};
