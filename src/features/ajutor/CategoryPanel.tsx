import { AlertTriangle, CheckSquare, MapPin } from 'lucide-react';
import type { AidCategory } from '@/content/ajutor';

/** Documents checklist, where to apply and an IMPORTANT callout for one category. */
export function CategoryPanel({ category }: { category: AidCategory }) {
  return (
    <div className="grid gap-6 rounded-card border border-border bg-surface p-6 shadow-soft sm:p-8 md:grid-cols-2">
      <div>
        <h3 className="text-2xl">{category.documentsTitle}</h3>
        <ul className="mt-4 space-y-3">
          {category.documents.map((doc) => (
            <li key={doc} className="flex gap-3">
              <CheckSquare
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-sage-strong"
              />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-2xl">
            <MapPin aria-hidden="true" className="h-5 w-5 text-accent" />
            {category.whereTitle}
          </h3>
          <p className="mt-3 text-muted">{category.where}</p>
        </div>
        <aside
          aria-label={category.importantTitle}
          className="rounded-xl border-l-4 border-accent bg-accent/10 p-5"
        >
          <p className="flex items-center gap-2 font-sans text-sm font-bold tracking-[0.18em] text-accent-strong">
            <AlertTriangle aria-hidden="true" className="h-4 w-4" />
            {category.importantTitle}
          </p>
          <p className="mt-2 text-fg">{category.important}</p>
        </aside>
      </div>
    </div>
  );
}
