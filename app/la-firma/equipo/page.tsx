import { Metadata } from 'next';
import EquipoPage from '@/app/equipo/page';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Equipo Jurídico — Socios Directores y Abogados Asociados',
  description:
    'Estructura profesional de AGORA, ABOGADOS en Ciudad Juárez, Chihuahua. Socios directores y abogados asociados en cinco áreas del derecho mexicano.',
  path: '/equipo',
});

export default EquipoPage;
