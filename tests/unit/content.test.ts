import { describe, it, expect } from 'vitest';
import { getPractices, getAudiences, getTeam, getSiteConfig } from '@/lib/content';

describe('Content Architecture & Data Integrity', () => {
  it('loads exactly the 5 confirmed practice areas', async () => {
    const practices = await getPractices();
    expect(practices).toHaveLength(5);
    const slugs = practices.map((p) => p.slug);
    expect(slugs).toEqual([
      'derecho-civil',
      'derecho-mercantil',
      'derecho-familiar',
      'derecho-penal',
      'amparo',
    ]);
  });

  it('loads the 3 target audiences with foreigners track present', async () => {
    const audiences = await getAudiences();
    expect(audiences).toHaveLength(3);
    const slugs = audiences.map((a) => a.slug);
    expect(slugs).toContain('personas');
    expect(slugs).toContain('empresas');
    expect(slugs).toContain('extranjeros');
  });

  it('verifies team structure matches verified counts and enforces placeholder policy', async () => {
    const team = await getTeam();
    expect(team).toHaveLength(7); // 7 lawyers in total
    const partners = team.filter((m) => m.role === 'partner');
    const associates = team.filter((m) => m.role === 'associate');
    expect(partners).toHaveLength(2); // 2 partners
    expect(associates).toHaveLength(5);

    // Verify all unconfirmed bios/names are explicit placeholders
    team.forEach((member) => {
      expect(member.isPlaceholder).toBe(true);
      expect(member.name).toContain('PENDIENTE');
      expect(member.bio).toContain('PENDIENTE');
    });
  });

  it('verifies site configuration verified business attributes', async () => {
    const config = await getSiteConfig();
    expect(config.name).toBe('AGORA, ABOGADOS');
    expect(config.descriptor).toBe('Consultoría Jurídica');
    expect(config.location.city).toBe('Ciudad Juárez');
    expect(config.location.state).toBe('Chihuahua');
    expect(config.contact.phoneDisplay).toBe('+52 656 350 2916');
    expect(config.metrics.yearsExperience).toBe(25);
    expect(config.metrics.lawyersCount).toBe(7);
    expect(config.metrics.partnersCount).toBe(2);
  });
});
