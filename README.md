# Servicii Funerare — schelet front-end (SPA)

Front-end skeleton for a funeral services business: React + TypeScript (strict) + Vite + Tailwind CSS (CSS-variable design tokens) + React Router + Framer Motion. **No backend.** All body text is lorem ipsum and lives in `src/content/`.

## Prerequisites

- Node.js **20+** and npm

## Install & run

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & preview

```bash
npm run build      # type-checks, then builds into dist/
npm run preview    # serves dist/ locally
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run format`, `npm test` (Vitest).

> Deploying: this is a SPA using the browser history API, so the host must rewrite unknown paths to `index.html` (e.g. Netlify `_redirects`: `/* /index.html 200`).

## Palette (light / dark)

| Role                                 | Light                                       | Dark                                                  |
| ------------------------------------ | ------------------------------------------- | ----------------------------------------------------- |
| Primary (header, headings, buttons)  | `#1F2A44` midnight navy                     | header `#161B27`; action color becomes gold `#C9A56E` |
| Accent (dividers, icons, hover, CTA) | `#B08D57` antique gold; text-safe `#846536` | `#C9A56E` / `#D4B47F`                                 |
| Background / surface                 | `#FAF8F4` ivory / `#FFFFFF`                 | `#11151F` / `#1A202E`                                 |
| Text / muted                         | `#21242B` charcoal / `#555E6C` slate        | `#EAE6DE` / `#A9B0BE`                                 |
| Supporting sage                      | `#6B7F6A`, tint `#EAEEE8`                   | `#8AA089`, tint `#1C2624`                             |
| WhatsApp (desaturated)               | `#2E704B`                                   | `#2E704B`                                             |

All text/background pairs are ≥ 4.5:1 in both themes. Tokens live in `src/styles/index.css` and are mapped to Tailwind in `tailwind.config.ts`. Fonts: Cormorant Garamond (headings) + Inter (body), self-hosted via Fontsource.

## Project structure

```
src/
  app/            App, router (lazy subpages), RootLayout, ScrollManager, ThemeProvider
  assets/placeholders/  SVG motifs (cross, flower, dove, candle, wreath)
  components/ui/  Button, Card, Section, Container, Badge, Accordion, Tabs, Modal,
                  Lightbox, Carousel, Timeline, PlaceholderImage, FormField, Reveal, Skeleton
  config/         site.ts (business data — single source of truth), constants.ts
  content/        common.ts, home.ts, services.ts, gallery.ts, randuieli.ts, ajutor.ts
  features/
    hero/         HeroSection (carousel + CTAs), IntroSection (H1 + NON-STOP)
    services/     ServicesSection, ServiceCard, icon map
    gallery/      GallerySection (masonry or filterable grid), tiles, filters, hooks
    about/        AboutSection, StatCounter (count-up)
    contact/      ContactSection, WhatsAppForm, OwnerSelector, ContactDetails, MapPlaceholder
      hooks/      useWhatsAppForm
      services/   phone.ts, whatsapp.ts (buildWhatsAppLink), validation.ts + tests
    randuieli/    RanduieliArticle, TableOfContents (sticky, scroll-spy)
    ajutor/       AidCategories (tabs ≥ md, accordion on mobile), CategoryPanel
  hooks/          useTheme, useScrollSpy, useScrollToAnchor, useInView, useReducedMotion,
                  useActiveNav, useMediaQuery, useFocusTrap, useCountUp, useScrolled, useDocumentTitle
  layout/         Header, MobileMenu, Footer, FloatingActions, SkipLink, ThemeToggle, Logo, PageHeader
  lib/            cn.ts, motion/variants.ts
  pages/          HomePage, RanduieliPage, AjutorPage, NotFoundPage, PageSkeleton
  styles/         index.css (tokens, base styles)
```

## How to replace the placeholder content

1. **Business data** — edit `src/config/site.ts`: name, city, legal name, CUI, Reg. Com., address, email, working hours, the two owners (name + phone in `+40…` format), social links, ANPC links, nav labels. Phone numbers, `tel:` links and WhatsApp links everywhere are derived from here.
2. **Text** — edit the modules in `src/content/`:
   - `home.ts` — hero, intro, about (stats), contact form labels/errors and the WhatsApp message template (`{nume}`, `{telefon}`, `{mesaj}`)
   - `services.ts` — the 11 service cards
   - `gallery.ts` — floral arrangements, wreaths and photo gallery (with filter categories)
   - `randuieli.ts` — Rânduieli creștine sections and memorial timeline
   - `ajutor.ts` — aid categories, documents, where to apply, IMPORTANT notes, CTA
   - `common.ts` — shared UI labels (menu, footer, 404, ARIA labels)
3. **Images** — each image entry has `alt`, `caption`, `ratio` and a placeholder `motif`/`tone`. To use real photos, add files under `src/assets/` and swap `PlaceholderImage` for an `<img>` with the same `aspect-ratio` (keeps layout stable).
4. **Map** — replace `features/contact/MapPlaceholder.tsx` with an embed when ready.

## WhatsApp form

`buildWhatsAppLink` (pure, unit-tested) normalizes the owner's number (strips spaces/`+`, `00` → ``, leading `0` → `40`) and returns `https://wa.me/<digits>?text=<encoded message>`. The form validates Romanian numbers (`07xx xxx xxx`, `+40 7xx xxx xxx`, landlines `02/03…`), opens WhatsApp in a new tab with `noopener,noreferrer`, then shows a confirmation with a manual fallback link.
