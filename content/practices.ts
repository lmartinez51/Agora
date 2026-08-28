import { PracticeArea } from '@/types';

export const practices: PracticeArea[] = [
  {
    slug: 'derecho-civil',
    title: 'Derecho Civil',
    shortDescription: 'Asesoría y litigio en contratos, bienes raíces, sucesiones, obligaciones y responsabilidad civil con estricto apego al marco legal mexicano.',
    fullDescription: 'Nuestra práctica de Derecho Civil brinda certeza patrimonial y contractual a particulares y empresas. Atendemos disputas sobre propiedad, arrendamientos, formalización de contratos y resolución de controversias civiles ante tribunales locales y federales.',
    services: [
      'Contratos civiles y resolución de incumplimientos',
      'Regularización de inmuebles y derechos de propiedad',
      'Juicios sucesorios, herencias y testamentos',
      'Responsabilidad civil contractual y extracontractual',
      'Cobranza judicial y recuperación de cartera civil',
    ],
    faqs: [
      {
        question: '¿Puedo resolver un conflicto contractual civil sin llegar a juicio?',
        answer: 'Sí. AGORA prioriza la negociación estratégica y los medios alternativos de solución de controversias antes de iniciar acciones procesales contenciosas.',
      },
      {
        question: '¿Cómo atienden litigios civiles si resido fuera de Ciudad Juárez?',
        answer: 'Podemos gestionar consultas de orientación inicial vía videollamada y estructurar representación legal formal mediante poderes adecuados según la legislación mexicana.',
      },
    ],
  },
  {
    slug: 'derecho-mercantil',
    title: 'Derecho Mercantil',
    shortDescription: 'Estructuración societaria, contratos comerciales, cobranza ejecutiva mercantil y litigio corporativo en el entorno fronterizo y nacional.',
    fullDescription: 'Brindamos respaldo legal a empresas mexicanas y extranjeras que operan en México y la región fronteriza. Abordamos controversias comerciales, títulos de crédito, operaciones corporativas y resolución de disputas mercantiles complejas.',
    services: [
      'Juicios ejecutivos y ordinarios mercantiles',
      'Contratos comerciales nacionales e internacionales',
      'Cobranza de pagarés, cheques y títulos de crédito',
      'Gobierno corporativo y actas de asamblea',
      'Resolución de disputas entre socios o accionistas',
    ],
    faqs: [
      {
        question: '¿Asesoran a empresas estadounidenses con operaciones o clientes en México?',
        answer: 'Sí. Contamos con experiencia en el contexto transfronterizo México–Estados Unidos, facilitando la comprensión y cumplimiento de las normativas comerciales mexicanas.',
      },
    ],
  },
  {
    slug: 'derecho-familiar',
    title: 'Derecho Familiar',
    shortDescription: 'Atención jurídica ética y discreta en divorcios, pensiones alimenticias, custodia, patria potestad y sucesiones familiares.',
    fullDescription: 'El Derecho Familiar exige sensibilidad humana combinada con firmeza procesal. En AGORA protegemos los derechos de los integrantes de la familia y el interés superior de la niñez mediante procesos ordenados y transparentes.',
    services: [
      'Divorcios incausados, voluntarios y contenciosos',
      'Determinación y aseguramiento de pensión alimenticia',
      'Guarda, custodia y régimen de visitas',
      'Pérdida o suspensión de patria potestad',
      'Juicios de interdicción y tutela',
    ],
    faqs: [
      {
        question: '¿Qué se requiere para tramitar un divorcio en Chihuahua?',
        answer: 'Bajo el marco procesal de Chihuahua, se puede solicitar la disolución del vínculo matrimonial sin necesidad de acreditar causal, estableciendo una propuesta de convenio regulador respecto a hijos y bienes.',
      },
    ],
  },
  {
    slug: 'derecho-penal',
    title: 'Derecho Penal',
    shortDescription: 'Defensa técnica especializada y representación coadyuvante de víctimas dentro del Sistema de Justicia Penal Acusatorio.',
    fullDescription: 'Ofrecemos defensa penal rigurosa y fundamentada, garantizando el respeto al debido proceso y los derechos fundamentales en etapas de investigación, audiencia inicial, juicio oral y recursos penales.',
    services: [
      'Defensa técnica en audiencias ante jueces de control',
      'Asesoría y representación jurídica de víctimas y ofendidos',
      'Interposición de recursos procesales y apelaciones',
      'Orientación inmediata en detenciones y carpetas de investigación',
      'Estrategias de salidas alternas y acuerdos reparatorios',
    ],
    faqs: [
      {
        question: '¿Cómo actuar ante una detención o citatorio ministerial?',
        answer: 'Es indispensable contar con asesoría legal profesional antes de rendir cualquier declaración. Puede comunicarse de inmediato con AGORA para recibir orientación procesal.',
      },
    ],
  },
  {
    slug: 'amparo',
    title: 'Amparo',
    shortDescription: 'Protección constitucional frente a actos u omisiones de autoridades que vulneren derechos humanos y garantías individuales.',
    fullDescription: 'El Juicio de Amparo es el máximo recurso de control constitucional en México. Nuestro equipo cuenta con sólida preparación técnica para promover demandas de amparo directo e indirecto y solicitar la suspensión del acto reclamado.',
    services: [
      'Amparo Indirecto contra actos de autoridades administrativas o judiciales',
      'Amparo Directo contra sentencias definitivas y laudos',
      'Solicitud y tramitación de suspensión provisional y definitiva',
      'Recursos de queja, revisión e inconformidad en materia de amparo',
      'Litigio constitucional estratégico',
    ],
    faqs: [
      {
        question: '¿Cuándo procede interponer una demanda de amparo?',
        answer: 'Procede cuando una autoridad de cualquier nivel de gobierno emite un acto, norma general u omisión que viole derechos fundamentales reconocidos en la Constitución Política de los Estados Unidos Mexicanos o en tratados internacionales.',
      },
    ],
  },
];
