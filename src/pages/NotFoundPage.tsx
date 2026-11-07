import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { ROUTES } from '@/config/constants';
import { uiText } from '@/content/common';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function NotFoundPage() {
  const { notFound } = uiText;
  useDocumentTitle(notFound.title);
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="w-40 overflow-hidden rounded-full border border-accent/50">
        <PlaceholderImage alt="" motif="dove" tone="stone" ratio="1/1" />
      </div>
      <p className="font-serif text-7xl font-semibold text-accent-strong">{notFound.code}</p>
      <h1 className="text-4xl">{notFound.title}</h1>
      <p className="max-w-md text-muted">{notFound.body}</p>
      <Button to={ROUTES.home} leadingIcon={<Home className="h-4 w-4" />}>
        {notFound.cta}
      </Button>
    </Container>
  );
}
