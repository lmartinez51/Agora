import { siteConfig } from '@/content/site';
import { practices } from '@/content/practices';
import { audiences } from '@/content/audiences';
import { articles } from '@/content/articles';
import { generalFaqs } from '@/content/faqs';
import { aiIdentity } from '@/content/ai/identity';

export interface CompiledKnowledge {
  verifiedFacts: string[];
  pendingNotice: string[];
  practiceSummaries: { slug: string; title: string; summary: string; services: string[] }[];
  audienceSummaries: { slug: string; title: string; description: string; highlights: string[] }[];
  articleSummaries: { slug: string; title: string; excerpt: string; category: string }[];
  faqSummaries: { question: string; answer: string }[];
}

export function compileKnowledge(): CompiledKnowledge {
  return {
    verifiedFacts: [
      `Firma: ${siteConfig.name} (${siteConfig.descriptor})`,
      `Sede institucional: ${siteConfig.location.city}, ${siteConfig.location.state}, ${siteConfig.location.country}`,
      `Trayectoria: ${siteConfig.metrics.yearsExperience} años de experiencia en litigio y consultoría jurídica`,
      `Equipo profesional: ${siteConfig.metrics.lawyersCount} abogados en total (${siteConfig.metrics.partnersCount} socios directores y 5 abogados asociados)`,
      `Jurisdicción: Derecho mexicano (tribunales locales de Chihuahua y juzgados/tribunales federales en todo México)`,
      `Teléfono de contacto oficial: ${siteConfig.contact.phoneDisplay}`,
      `Canal WhatsApp oficial: Activo para orientación preliminar y recepción de consultas`,
      `Modalidades de atención: Consultas presenciales en Ciudad Juárez y sesiones virtuales vía Google Meet`,
    ],
    pendingNotice: [
      'Nombres y biografías individuales de abogados: En proceso de confirmación y publicación formal.',
      'Dirección física exacta de la oficina: En proceso de confirmación por la firma.',
      'Correo electrónico institucional: En proceso de confirmación por la firma.',
      'Días y horarios específicos de atención: Sujetos a confirmación previa con el equipo.',
      'Honorarios y costos de litigio: Se determinan de forma personalizada tras el análisis del expediente.',
    ],
    practiceSummaries: practices.map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.shortDescription,
      services: p.services,
    })),
    audienceSummaries: audiences.map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
      highlights: a.highlights,
    })),
    articleSummaries: articles.map((art) => ({
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt,
      category: art.category,
    })),
    faqSummaries: generalFaqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  };
}

export function getSystemPromptKnowledge(): string {
  const knowledge = compileKnowledge();

  return `
ERES: ${aiIdentity.name}, ${aiIdentity.role} para ${aiIdentity.organization}.
OBJETIVO: Orientar a los visitantes sobre los servicios, áreas de práctica y publicaciones de la firma.

=== REGLAS ABSOLUTAS DE SEGURIDAD Y CONDUCTA ===
1. NO eres abogado. NO des dictámenes jurídicos concluyentes. NO garantices resoluciones judiciales.
2. NO inventes nombres de abogados, credenciales, premios, casos de éxito ni domicilios físicos.
3. Si un dato está en la lista de PENDIENTES, indica con cortesía que la información se confirmará directamente al contactar a la firma.
4. Responde con tono profesional, sobrio, conciso y respetuoso (tratando de "usted").
5. Sugiere WhatsApp o agendar consulta (/agenda) cuando el usuario requiera atención personalizada.
6. NO atiendas temas ajenos a la firma; declina amablemente invitando a consultar sobre AGORA.
7. Si el usuario ingresa datos sensibles (CURP, RFC, contraseñas, tarjetas), pídele no compartirlos en el chat y llamar o escribir por WhatsApp.

=== DATOS VERIFICADOS DE AGORA, ABOGADOS ===
${knowledge.verifiedFacts.map((f) => `- ${f}`).join('\n')}

=== DATOS PENDIENTES DE CONFIRMACIÓN (NO INVENTAR) ===
${knowledge.pendingNotice.map((p) => `- ${p}`).join('\n')}

=== ÁREAS DE PRÁCTICA (5 CONFIRMADAS) ===
${knowledge.practiceSummaries
  .map(
    (p) =>
      `* ${p.title} (/practicas/${p.slug}): ${p.summary}\n  Servicios: ${p.services.slice(0, 3).join(', ')}`
  )
  .join('\n\n')}

=== GUÍAS LEGALES PUBLICADAS (CENTRO DE CONOCIMIENTO) ===
${knowledge.articleSummaries
  .map((a) => `* "${a.title}" (/conocimiento/${a.slug}): ${a.excerpt}`)
  .join('\n')}

=== PREGUNTAS FRECUENTES ===
${knowledge.faqSummaries.map((faq) => `P: ${faq.question}\nR: ${faq.answer}`).join('\n\n')}
`.trim();
}
