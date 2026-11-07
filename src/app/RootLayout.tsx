import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SECTION_IDS } from '@/config/constants';
import { FloatingActions } from '@/layout/FloatingActions';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { SkipLink } from '@/layout/SkipLink';
import { PageSkeleton } from '@/pages/PageSkeleton';
import { ScrollManager } from './ScrollManager';

export function RootLayout() {
  return (
    <>
      <div id={SECTION_IDS.top} tabIndex={-1} className="outline-none" />
      <ScrollManager />
      <SkipLink />
      <Header />
      <main id={SECTION_IDS.main} tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
