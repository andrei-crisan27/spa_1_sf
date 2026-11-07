import { Accordion } from '@/components/ui/Accordion';
import { Tabs } from '@/components/ui/Tabs';
import { MEDIA } from '@/config/constants';
import { ajutorContent } from '@/content/ajutor';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CategoryPanel } from './CategoryPanel';

/** Tabs on tablet/desktop, accordion on mobile — same content. */
export function AidCategories() {
  const isTablet = useMediaQuery(MEDIA.tablet);
  const { categories, categoriesLabel } = ajutorContent;
  const first = categories[0]?.id;

  if (isTablet) {
    return (
      <Tabs
        label={categoriesLabel}
        defaultId={first}
        items={categories.map((category) => ({
          id: category.id,
          label: category.label,
          content: <CategoryPanel category={category} />,
        }))}
      />
    );
  }

  return (
    <Accordion
      defaultOpenId={first}
      items={categories.map((category) => ({
        id: category.id,
        title: category.label,
        content: <CategoryPanel category={category} />,
      }))}
    />
  );
}
