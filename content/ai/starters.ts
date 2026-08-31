export interface AIStarterPrompt {
  id: string;
  label: string;
  query: string;
  category: 'practices' | 'booking' | 'foreigners' | 'amparo' | 'contact';
}

export const aiStarterPrompts: AIStarterPrompt[] = [
  {
    id: 'starter-practices',
    label: '¿Qué materias jurídicas atienden?',
    query: '¿Cuáles son las áreas de práctica y especialidades de AGORA, ABOGADOS?',
    category: 'practices',
  },
  {
    id: 'starter-booking',
    label: '¿Cómo agendar una consulta?',
    query: '¿Cómo funciona la consulta inicial y cómo puedo programar una cita?',
    category: 'booking',
  },
  {
    id: 'starter-foreigners',
    label: '¿Atienden asuntos internacionales?',
    query: '¿Ofrecen consultoría legal para personas extranjeras o empresas con operaciones en México?',
    category: 'foreigners',
  },
  {
    id: 'starter-amparo',
    label: '¿Qué es el Juicio de Amparo?',
    query: '¿En qué casos procede el juicio de amparo y qué tipo de protección brinda?',
    category: 'amparo',
  },
  {
    id: 'starter-contact',
    label: '¿Cómo contactar por WhatsApp?',
    query: '¿Cuáles son los canales directos de atención y teléfono de la firma?',
    category: 'contact',
  },
];
