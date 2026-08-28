import { AudienceTrack } from '@/types';

export const audiences: AudienceTrack[] = [
  {
    slug: 'personas',
    title: 'Particulares y Familias',
    subtitle: 'Protección integral de su patrimonio, derechos familiares e integridad jurídica.',
    description: 'Acompañamiento profesional y ético para resolver controversias civiles, patrimoniales, familiares o penales con absoluta confidencialidad.',
    highlights: [
      'Asesoría personalizada en Derecho Civil, Familiar y Sucesorio',
      'Defensa técnica en Derecho Penal y Juicio de Amparo',
      'Atención presencial en Ciudad Juárez y remota para todo México',
    ],
    ctaContext: 'general',
  },
  {
    slug: 'empresas',
    title: 'Empresas y Comercio',
    subtitle: 'Solidez jurídica, prevención de riesgos contractuales y resolución de litigios mercantiles.',
    description: 'Asesoría corporativa y litigiosa para empresas mexicanas y transnacionales que operan en la frontera norte y a nivel nacional.',
    highlights: [
      'Contratos mercantiles, societarios y cobranza ejecutiva',
      'Estructuración legal y prevención de contingencias procesales',
      'Comprensión del entorno comercial transfronterizo México–EE.UU.',
    ],
    ctaContext: 'business',
  },
  {
    slug: 'extranjeros',
    title: 'Consultoría Legal para Extranjeros',
    subtitle: 'Orientación jurídica remota para personas y empresas fuera de México con asuntos legales en territorio mexicano.',
    description: 'Facilitamos el acceso a la justicia y a la certeza legal en México mediante consultas virtuales en inglés y español, representación procesal y comunicación directa.',
    highlights: [
      'Consultas virtuales por Google Meet accesibles desde cualquier país',
      'Atención en idioma inglés y español con equipo radicado en Ciudad Juárez',
      'Asesoría y representación en litigios civiles, mercantiles y constitucionales en México',
    ],
    ctaContext: 'foreigners',
  },
];
