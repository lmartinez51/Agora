# AGORA, ABOGADOS — Sitio Web Institucional

> Consultoría Jurídica · Ciudad Juárez, Chihuahua, México

Este repositorio contiene la plataforma digital y arquitectura web para la firma legal **AGORA, ABOGADOS**, orientada a la captación orgánica y conversión de clientes particulares, corporativos y extranjeros con asuntos jurídicos en México.

---

## Estado del Proyecto
- **Fase Actual:** `PHASE 5 — PRODUCTION DEPLOYMENT & INTEGRAL QA COMPLETED`
- **Ambiente de Ejecución:** Next.js 14 App Router / Vercel Production
- **Despliegue en Vivo:** [https://agora-alpha-mauve.vercel.app](https://agora-alpha-mauve.vercel.app)

---

## Pila Tecnológica (Tech Stack)
- **Framework:** Next.js 14 (App Router, React Server Components por defecto)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS con tokens de diseño semánticos
- **AI Engine:** Orientador Jurídico IA con arquitectura de guardrails, rate limiting en memoria y motor multi-proveedor desacoplado (Google Gemini y OpenAI Responses API, con fallback determinista local)
- **Testing:** Vitest (Pruebas unitarias, integración y evaluación del subsistema de IA)
- **Identidad Visual & Marca:** Logotipo vectorial SVG refinado, isotipo canónico integrado en shell y composición visual 3D cinematográfica en alta resolución (WebP)
- **Iconografía:** Lucide React (Vectorial, ligera y accesible)
- **SEO:** Generación nativa de metadatos dinámicos, iconos vectoriales canónicos, `sitemap.xml`, `robots.txt` y JSON-LD estructurado (`LegalService`)

---

## Estructura del Proyecto
```text
AGORA/
├── app/                  # Rutas App Router, API endpoints (/api/ai-chat), layouts, error boundaries, sitemap y robots
├── components/           # Componentes modulares (layout, ui, booking, ai-chat, contact, practice)
├── content/              # Fuentes de datos tipadas (site, practices, audiences, team, faqs, articles, ai)
├── docs/                 # Especificaciones maestras y constitución visual
├── lib/                  # Utilidades (ai, whatsapp, seo, analytics, data provider)
├── public/               # Recursos estáticos (imágenes, fuentes)
├── tests/                # Pruebas unitarias e integración
├── types/                # Definiciones de TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## Configuración y Variables de Entorno
Cree un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Variables disponibles:
- `NEXT_PUBLIC_SITE_URL`: URL base del sitio para canónicos y sitemaps (por defecto `http://localhost:3000`).
- `NEXT_PUBLIC_BOOKING_URL`: URL pública del Google Calendar Appointment Schedule. Si no se configura, el sistema activa automáticamente el componente de respaldo (*fallback*) con canalización directa a WhatsApp.
- `NEXT_PUBLIC_AI_CHAT_ENABLED`: Activa/desactiva la interfaz del chat con IA (`true` | `false`).
- `AI_CHAT_MODE`: Modo de operación del motor de IA (`disabled` | `private` | `client-pilot` | `public`).
- `AI_CHAT_PRIVATE_SECRET`: Secreto de servidor para autorización en modo `private` (vía cabecera `x-agora-ai-auth`).
- `AI_CHAT_PILOT_SECRET`: Secreto de servidor para firmas HMAC de sesiones de pilotaje temporal (`client-pilot`).
- `AI_PROVIDER`: Proveedor de inferencia (`local` | `gemini` | `openai` | `unavailable`).
- `GEMINI_API_KEY`: Clave de API de Google Gemini para respuestas generativas en vivo.
- `GEMINI_MODEL`: Identificador de modelo para Google Gemini (por defecto `gemini-flash-latest`).
- `OPENAI_API_KEY`: Clave de API de OpenAI para el proveedor OpenAI Responses API.
- `OPENAI_MODEL`: Identificador de modelo para OpenAI Responses API (por defecto `gpt-5.6-luna`).

---

## Scripts Disponibles
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Ejecutar pruebas unitarias
npm test

# Verificación de linter
npm run lint

# Compilación de producción
npm run build

# Iniciar servidor de producción
npm run start
```

---

## Información Pendiente de Confirmación por el Cliente (`PENDING CLIENT DATA`)
- Dirección física exacta en Ciudad Juárez.
- Correo electrónico de contacto oficial.
- Días específicos de operación y atención al público.
- Nombres, biografías y fotografías de los 7 abogados y 2 socios.
- Dominio final de producción.
- Duración específica de la consulta inicial gratuita.
