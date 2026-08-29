import { describe, it, expect } from 'vitest';
import React from 'react';
import { getTeam, getTeamMemberBySlug } from '@/lib/content';
import { teamMembers } from '@/content/team';
import { siteConfig } from '@/content/site';
import { FirmHero } from '@/components/sections/firm/FirmHero';
import { FirmPhilosophy } from '@/components/sections/firm/FirmPhilosophy';
import { FirmMetricsOverview } from '@/components/sections/firm/FirmMetricsOverview';
import { FirmTeamPreview } from '@/components/sections/firm/FirmTeamPreview';
import { FirmCTA } from '@/components/sections/firm/FirmCTA';
import { TeamHero } from '@/components/sections/team/TeamHero';
import { TeamGrid } from '@/components/sections/team/TeamGrid';
import { TeamNotice } from '@/components/sections/team/TeamNotice';
import LaFirmaPage from '@/app/la-firma/page';
import EquipoPage from '@/app/equipo/page';

describe('La Firma & Team Architecture', () => {
  it('contains exactly 7 total lawyers matching verified metrics', async () => {
    const team = await getTeam();
    expect(team).toHaveLength(7);
    expect(siteConfig.metrics.lawyersCount).toBe(7);
  });

  it('contains exactly 2 partners and 5 associates', async () => {
    const team = await getTeam();
    const partners = team.filter((m) => m.role === 'partner');
    const associates = team.filter((m) => m.role === 'associate');
    expect(partners).toHaveLength(2);
    expect(associates).toHaveLength(5);
    expect(siteConfig.metrics.partnersCount).toBe(2);
  });

  it('enforces that all team members have placeholder status without fabricated identities', () => {
    teamMembers.forEach((member) => {
      expect(member.isPlaceholder).toBe(true);
      expect(member.name).toContain('PENDIENTE');
      expect(member.bio).toContain('PENDIENTE');
      expect(member.practiceAreas.length).toBeGreaterThan(0);
    });
  });

  it('resolves team members by slug', async () => {
    const partner = await getTeamMemberBySlug('socio-director-1');
    expect(partner).not.toBeNull();
    expect(partner?.role).toBe('partner');

    const invalid = await getTeamMemberBySlug('abogado-ficticio');
    expect(invalid).toBeNull();
  });

  it('creates React elements for all firm and team section components', () => {
    expect(React.createElement(FirmHero)).toBeDefined();
    expect(React.createElement(FirmPhilosophy)).toBeDefined();
    expect(React.createElement(FirmMetricsOverview)).toBeDefined();
    expect(React.createElement(FirmTeamPreview)).toBeDefined();
    expect(React.createElement(FirmCTA)).toBeDefined();
    expect(React.createElement(TeamHero)).toBeDefined();
    expect(React.createElement(TeamGrid)).toBeDefined();
    expect(React.createElement(TeamNotice)).toBeDefined();
    expect(React.createElement(LaFirmaPage)).toBeDefined();
    expect(React.createElement(EquipoPage)).toBeDefined();
  });
});
