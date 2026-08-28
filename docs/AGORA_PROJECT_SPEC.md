# AGORA, ABOGADOS — Project Specification & Master Plan v1.0

## 1. Project Identity & Positioning
- **Firm Name:** AGORA, ABOGADOS
- **Descriptor:** Consultoría Jurídica
- **Location:** Ciudad Juárez, Chihuahua, México
- **Experience:** 25 years
- **Lawyers:** 7
- **Partners:** 2
- **Languages:** Spanish (Primary / MVP) | English (Architecture-ready for future implementation)
- **Practice Areas (5 Confirmed):**
  1. Derecho Civil (`/practicas/derecho-civil`)
  2. Derecho Mercantil (`/practicas/derecho-mercantil`)
  3. Derecho Familiar (`/practicas/derecho-familiar`)
  4. Derecho Penal (`/practicas/derecho-penal`)
  5. Amparo (`/practicas/amparo`)
- **Target Audiences:**
  - Personas (`/personas`)
  - Empresas (`/empresas`)
  - Extranjeros (`/extranjeros`)
- **Strategic Focus & Positioning:**
  - Online legal consultations for foreigners who have legal matters or problems within Mexico.
  - Experience / relationship involving U.S. companies, cross-border commerce, and Mexico–United States context (without exaggerating or inventing scope).

---

## 2. Verified Business & Contact Configuration
- **Phone:** `+52 656 350 2916` (`tel:+526563502916`)
- **WhatsApp:** `+52 656 350 2916`
- **Business Hours:** 8:00 AM – 6:00 PM
- **Operating Days:** `PENDING CLIENT DATA`
- **Physical Address:** `PENDING CLIENT DATA`
- **Email:** `PENDING CLIENT DATA`
- **Domain:** `PENDING`
- **Logo:** `PENDING` (Text / SVG placeholder until provided)
- **Photography:** `PENDING` (Curated local/architectural imagery & Mexicanidad X reference)

---

## 3. Conversion Architecture & Hierarchy
- **Primary Conversion:** WhatsApp (`Consultar por WhatsApp`)
- **Secondary Conversion:** Online Consultation (`/agenda` — Google Calendar Appointment Schedule -> Google Meet)
- **Tertiary Conversion:** Phone (`+52 656 350 2916`)

### Reusable Contextual WhatsApp Links
Contexts supported:
- `general`
- `practice`
- `foreigners`
- `business`
- `article`
- `booking-fallback`

### Online Consultation & Booking Fallback Policy
- Consultation Type: Initial Free Consultation (*Consulta inicial gratuita*).
- Duration: `PENDING CLIENT DATA` (Do not invent duration).
- Provider Abstraction: `BookingProvider` / `BookingEmbed`.
- Fallback: If `NEXT_PUBLIC_BOOKING_URL` is undefined/unconfigured, display a graceful notice that online scheduling is in preparation and provide direct WhatsApp consultation CTA. Never show broken iframes.

---

## 4. Strict No-Invention Policy
Under no circumstances may the following be invented or fabricated:
- Lawyer or Partner names
- Professional credentials / degrees / bar admissions
- Testimonials / reviews
- Awards / certifications / associations
- Client names / case studies / legal victories / logos
- Physical address / email / operating days / social media links
- Statistics beyond those explicitly verified

All missing data MUST be explicitly marked `PENDING CLIENT DATA`.

---

## 5. Technology Stack
- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with centralized token definitions
- **Content:** Structured TypeScript data & MDX (Knowledge Center)
- **Testing:** Unit, Integration, and Playwright for E2E
- **Rendering Model:** Server Components default; Client Components restricted to interactive controls (mobile menu, accordions, interactive booking/form states).

---

## 6. Information Architecture & Routes
```text
/
├── /practicas
│   ├── /practicas/derecho-civil
│   ├── /practicas/derecho-mercantil
│   ├── /practicas/derecho-familiar
│   ├── /practicas/derecho-penal
│   └── /practicas/amparo
├── /personas
├── /empresas
├── /extranjeros
├── /la-firma
├── /equipo
│   └── /equipo/[slug]
├── /conocimiento
│   └── /conocimiento/[slug]
├── /agenda
├── /contacto
├── /aviso-de-privacidad
├── /sitemap.xml (app/sitemap.ts)
└── /robots.txt (app/robots.ts)
```
