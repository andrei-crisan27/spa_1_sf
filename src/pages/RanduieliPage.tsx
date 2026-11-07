import { randuieliContent } from '@/content/randuieli';
import { RanduieliArticle } from '@/features/randuieli/RanduieliArticle';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/layout/PageHeader';

export default function RanduieliPage() {
  useDocumentTitle(randuieliContent.title);
  return (
    <>
      <PageHeader
        eyebrow={randuieliContent.eyebrow}
        title={randuieliContent.title}
        lead={randuieliContent.lead}
      />
      <RanduieliArticle />
    </>
  );
}
