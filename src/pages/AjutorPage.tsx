import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ROUTES, SECTION_IDS } from '@/config/constants';
import { ajutorContent } from '@/content/ajutor';
import { AidCategories } from '@/features/ajutor/AidCategories';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/layout/PageHeader';

export default function AjutorPage() {
  useDocumentTitle(ajutorContent.title);
  const { cta } = ajutorContent;
  return (
    <>
      <PageHeader
        eyebrow={ajutorContent.eyebrow}
        title={ajutorContent.title}
        lead={ajutorContent.lead}
      />
      <Container className="py-14 sm:py-20">
        <Reveal className="max-w-prose space-y-5 text-lg text-muted">
          {ajutorContent.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal className="mt-12">
          <h2 className="mb-6 text-3xl">{ajutorContent.categoriesHeading}</h2>
          <AidCategories />
        </Reveal>
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-card bg-header p-8 text-header-fg shadow-lift sm:p-12">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                >
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-3xl text-header-fg">{cta.title}</h2>
                  <p className="mt-2 max-w-xl text-header-fg/80">{cta.body}</p>
                </div>
              </div>
              <Button
                variant="accent"
                size="lg"
                to={{ pathname: ROUTES.home, hash: SECTION_IDS.contactForm }}
                leadingIcon={<ArrowRight className="h-5 w-5" />}
                className="shrink-0"
              >
                {cta.button}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
