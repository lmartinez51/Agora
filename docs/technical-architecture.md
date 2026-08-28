# AGORA, ABOGADOS — Technical Architecture & Implementation Plan v1.0

## 1. Directory Structure (Enforced within `AGORA/`)
```text
AGORA/
├── docs/
│   ├── AGORA_PROJECT_SPEC.md
│   ├── visual-constitution.md
│   ├── design-system.md
│   ├── component-page-specification.md
│   └── technical-architecture.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── practicas/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── personas/page.tsx
│   ├── empresas/page.tsx
│   ├── extranjeros/page.tsx
│   ├── la-firma/page.tsx
│   ├── equipo/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── conocimiento/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── agenda/page.tsx
│   ├── contacto/page.tsx
│   └── aviso-de-privacidad/page.tsx
├── components/
│   ├── layout/       (Header, Footer, Container, Section)
│   ├── navigation/   (DesktopNav, MobileMenu, MobileStickyBar)
│   ├── ui/           (Button, CTAButton, Card, Badge, Accordion, Modal)
│   ├── practice/     (PracticeCard, PracticeGrid, PracticeHero)
│   ├── booking/      (BookingEmbed, BookingFallback, BookingProvider)
│   ├── contact/      (ContactForm, QuickContact)
│   ├── knowledge/    (ArticleCard, ArticleHeader, ArticleContent)
│   └── ai/           (AIAssistantBoundaryModal)
├── content/
│   ├── site.ts       (Authoritative business config)
│   ├── practices.ts  (5 structured practice records)
│   ├── audiences.ts  (Personas, Empresas, Extranjeros content)
│   ├── team.ts       (Verified stats, placeholders for names/bios)
│   ├── faqs.ts       (Frequently asked questions per practice)
│   └── articles/     (MDX or structured TypeScript articles)
├── lib/
│   ├── utils.ts      (Tailwind clsx / cn helper)
│   ├── whatsapp.ts   (Contextual WhatsApp URL generator)
│   ├── content.ts    (Data access abstraction: getPractices, getArticles, etc.)
│   └── analytics.ts  (Event tracking abstractions)
├── public/
│   └── images/
├── types/
│   └── index.ts      (TypeScript interfaces for content and domain models)
└── tests/
    ├── e2e/          (Playwright end-to-end flows)
    └── unit/         (Component & utility tests)
```

---

## 2. Rendering Model & Boundaries
- **Default:** Next.js Server Components (`RSC`) for maximum performance, minimal client bundle, instant SEO indexing, and zero-JS content delivery.
- **Client Components (`"use client"`):**
  - `MobileMenu.tsx` (stateful keyboard/toggle drawer)
  - `MobileStickyBar.tsx` (scroll threshold detection)
  - `Accordion.tsx` (interactive collapsible states)
  - `ContactForm.tsx` (client-side form handling with server action validation)
  - `BookingEmbed.tsx` (dynamic iframe / configuration detector)
  - `AIAssistantBoundaryModal.tsx` (interactive UI placeholder modal)

---

## 3. Business Configuration Model (`content/site.ts`)
```typescript
export interface FirmConfig {
  name: string;
  descriptor: string;
  location: {
    city: string;
    state: string;
    country: string;
    address: string; // PENDING CLIENT DATA
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    email: string; // PENDING CLIENT DATA
    hours: string;
    operatingDays: string; // PENDING CLIENT DATA
  };
  metrics: {
    yearsExperience: number;
    lawyersCount: number;
    partnersCount: number;
  };
  languages: string[];
}
```

---

## 4. WhatsApp Contextual Routing Utility (`lib/whatsapp.ts`)
```typescript
export type WhatsAppContext =
  | 'general'
  | 'practice'
  | 'foreigners'
  | 'business'
  | 'article'
  | 'booking-fallback';

export interface WhatsAppOptions {
  context: WhatsAppContext;
  detail?: string;
}

export function createWhatsAppLink(options: WhatsAppOptions): string {
  const phone = "526563502916";
  const messages: Record<WhatsAppContext, (d?: string) => string> = {
    general: () => "Hola, me gustaría solicitar una consulta jurídica con AGORA, ABOGADOS.",
    practice: (practice) => `Hola, deseo consultar sobre un asunto de ${practice || 'asesoría legal'} con AGORA, ABOGADOS.`,
    foreigners: () => "Hello / Hola, I need legal guidance regarding a legal matter in Mexico.",
    business: () => "Hola, represento a una empresa y requiero asesoría legal corporativa/mercantil.",
    article: (title) => `Hola, leí su artículo "${title}" y quisiera asesoría legal sobre este tema.`,
    'booking-fallback': () => "Hola, deseo agendar una consulta inicial directamente por WhatsApp."
  };
  const text = encodeURIComponent(messages[options.context](options.detail));
  return `https://wa.me/${phone}?text=${text}`;
}
```

---

## 5. Booking Abstraction (`BookingProvider` / `BookingEmbed`)
- Config key: `process.env.NEXT_PUBLIC_BOOKING_URL`.
- If key is present and non-empty: Renders responsive Google Calendar Appointment Schedule iframe.
- If key is missing or invalid: Renders fallback card with clear message and direct `createWhatsAppLink({ context: 'booking-fallback' })`.

---

## 6. Content Access Abstraction (Future CMS Readiness)
All components fetch content through clean data access layer:
- `getPractices(): Promise<Practice[]>`
- `getPracticeBySlug(slug: string): Promise<Practice | null>`
- `getArticles(): Promise<Article[]>`
- `getArticleBySlug(slug: string): Promise<Article | null>`
- `getTeam(): Promise<TeamMember[]>`

---

## 7. Quality Gates & Testing Strategy
- **Unit & Integration:** Validate `createWhatsAppLink`, content loaders, SEO metadata generators, and form sanitizers.
- **E2E (Playwright):**
  - WhatsApp CTA trigger across contexts.
  - Booking embed and fallback states.
  - Mobile menu interaction & keyboard accessibility.
  - Practice pages and audience routing.
  - 404 / error states.
- **Audits:** WCAG 2.2 AA compliance, Lighthouse Core Web Vitals target (>95 on Performance, Accessibility, Best Practices, SEO).
