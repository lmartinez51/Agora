import { practices } from '@/content/practices';
import { audiences } from '@/content/audiences';
import { teamMembers } from '@/content/team';
import { generalFaqs } from '@/content/faqs';
import { articles } from '@/content/articles';
import { siteConfig } from '@/content/site';
import { PracticeArea, AudienceTrack, TeamMember, FAQItem, Article, FirmConfig } from '@/types';

export async function getSiteConfig(): Promise<FirmConfig> {
  return siteConfig;
}

export async function getPractices(): Promise<PracticeArea[]> {
  return practices;
}

export async function getPracticeBySlug(slug: string): Promise<PracticeArea | null> {
  const found = practices.find((p) => p.slug === slug);
  return found || null;
}

export async function getAudiences(): Promise<AudienceTrack[]> {
  return audiences;
}

export async function getAudienceBySlug(slug: string): Promise<AudienceTrack | null> {
  const found = audiences.find((a) => a.slug === slug);
  return found || null;
}

export async function getTeam(): Promise<TeamMember[]> {
  return teamMembers;
}

export async function getGeneralFaqs(): Promise<FAQItem[]> {
  return generalFaqs;
}

export async function getArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const found = articles.find((a) => a.slug === slug);
  return found || null;
}
