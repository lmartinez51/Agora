# AGORA, ABOGADOS — Component & Page Specification v1.0

## 1. Global Shell & Navigation

### Global Header
- **Desktop View:**
  - Brand identity: AGORA Logo / Wordmark + Descriptor (*Consultoría Jurídica*)
  - Navigation Links: Prácticas, Personas, Empresas, Extranjeros, La Firma, Conocimiento, Contacto
  - Quick Conversion CTA: *Consultar por WhatsApp* (or *Agendar Consulta*)
- **Mobile View:**
  - Brand Wordmark
  - Keyboard-accessible hamburger menu toggle (`aria-expanded`, focus-trapped modal overlay)
  - Direct WhatsApp shortcut button

### Mobile Sticky Conversion Bar
- Affixed to viewport bottom on screens `< 768px`.
- High-contrast actions:
  - Button 1: *WhatsApp* (contextualized direct link)
  - Button 2: *Agendar* (`/agenda`)
- Layering: Must never obscure cookie/privacy notices, interactive modals, or form submission buttons (`z-40`, with appropriate bottom padding on main layout).

### Global Footer
- Section 1: Firm descriptor, 25 years experience, Ciudad Juárez, Chihuahua, México.
- Section 2: Navigation columns (Prácticas, Audiencias, Institucional, Conocimiento).
- Section 3: Verified Contact Info (`+52 656 350 2916`, 8:00 AM – 6:00 PM, Operating Days `PENDING CLIENT DATA`).
- Section 4: Legal & Privacy links (`/aviso-de-privacidad`), Copyright notice.
- *Strict Rule: No invented social media or external client links.*

---

## 2. Page Specifications & Section Sequences

### 2.1 Home Page (`/`)
*Strict Section Sequence:*
1. **Hero Section:**
   - H1: Authoritative value proposition for individuals, businesses, and international clients.
   - Lead paragraph emphasizing Ciudad Juárez base, nationwide Mexican jurisdiction, and cross-border capabilities.
   - Primary Action: *Consultar por WhatsApp* | Secondary Action: *Agendar Consulta Online*.
2. **Authority & Metrics Grid:**
   - 25 Años de Experiencia
   - 7 Abogados Especializados
   - 2 Socios Directores
   - Ciudad Juárez, Chihuahua, México
3. **Practice Areas Overview (`/practicas`):**
   - 5 structured cards: Derecho Civil, Derecho Mercantil, Derecho Familiar, Derecho Penal, Amparo.
   - Distinctive descriptions and direct links to `/practicas/[slug]`.
4. **Target Audiences Navigator (`/personas`, `/empresas`, `/extranjeros`):**
   - Clear tri-pillar breakdown routing users to their specific legal context.
5. **International / Cross-Border Spotlight (`/extranjeros`):**
   - Dedicated editorial feature: Online legal consultations for foreign citizens and international companies with legal affairs in Mexico.
   - Clarity on English-language support, online consultation via Google Meet, and remote legal representation.
6. **Editorial Trust & Methodology:**
   - Restrained explanation of AGORA's legal philosophy, procedural rigor, and ethical commitment.
7. **Knowledge Center Highlights (`/conocimiento`):**
   - Featured legal articles explaining rights, obligations, and legal procedures in Mexico.
8. **Final Conversion Anchor:**
   - High-prominence CTA to initiate a WhatsApp consultation or schedule an appointment online.

---

### 2.2 Practice Area Template (`/practicas/[slug]`)
Single structured template generating:
- Hero with practice title, subtitle, and breadcrumbs.
- Key sub-specialties and legal services offered under this area.
- Process & methodology for handling cases in this discipline.
- Frequently Asked Questions (FAQ schema accordion).
- Contextual WhatsApp conversion trigger (`context="practice"`, `practiceSlug=slug`).
- Related practice links.

---

### 2.3 Audience Pages
- **/personas:** Legal protection for individuals and families (Civil, Familiar, Penal, Amparo).
- **/empresas:** Corporate advisory, contracts, commercial litigation, compliance, and cross-border commercial context.
- **/extranjeros (High Priority):**
  - Guidance for foreigners residing in or outside Mexico.
  - Remote legal representation and consultation mechanisms.
  - Bilingual communication availability.
  - Clear statement of Ciudad Juárez location and Mexico legal jurisdiction.

---

### 2.4 Firm & Team Pages (`/la-firma`, `/equipo`)
- **/la-firma:** Institutional history (25 years), philosophy of practice, Ciudad Juárez roots.
- **/equipo:** Overview of 7 lawyers and 2 partners.
- **Rule:** Uses structured placeholder cards (`PENDING CLIENT DATA`) until verified lawyer names and biographies are formally provided.

---

### 2.5 Online Booking Page (`/agenda`)
- Component: `BookingEmbed`
- Displays Google Appointment Schedule interface if `NEXT_PUBLIC_BOOKING_URL` is set.
- Graceful Fallback: If URL is unconfigured, renders an elegant status card stating online calendar integration is being finalized, immediately offering direct WhatsApp booking.

---

### 2.6 Knowledge Center (`/conocimiento`, `/conocimiento/[slug]`)
- Articles with clear legal topics, reading time, author, date, category tag.
- Internal links to relevant practice areas.
- Contextual WhatsApp consultation trigger on every article.

---

### 2.7 Contact & Legal (`/contacto`, `/aviso-de-privacidad`)
- Minimal contact form (Nombre, Email, Teléfono, Mensaje) with server-side validation.
- Direct phone and WhatsApp quick links.
- Privacy notice referencing data protection in compliance with Mexican law (LFPDPPP).
