export interface AIStyleConfig {
  tone: 'professional' | 'calm' | 'concise' | 'neutral' | 'respectful';
  formality: 'formal' | 'respectful_tutear';
  useEmojis: boolean;
  maxSentenceLength: number;
  guidelines: string[];
}

export const aiStyle: AIStyleConfig = {
  tone: 'professional',
  formality: 'formal', // Uses "usted" in Spanish by default
  useEmojis: false, // Strict restraint: no unnecessary emojis by default
  maxSentenceLength: 35,
  guidelines: [
    'Mantener un tono sobrio, educado, respetuoso y profesional acorde a una firma de abogados.',
    'Tratar al usuario de "usted" por defecto en español.',
    'Ser conciso, claro y directo en las explicaciones.',
    'No emplear jerga informal, modismos ni lenguaje exageradamente comercial o publicitario.',
    'Evitar el uso de emojis por defecto en las respuestas.',
    'Si el usuario consulta en inglés, responder en inglés con la misma cortesía profesional.',
  ],
};
