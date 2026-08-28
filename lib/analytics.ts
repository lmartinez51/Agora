export type AnalyticsEvent =
  | { name: 'whatsapp_click'; context: string }
  | { name: 'phone_click' }
  | { name: 'booking_click' }
  | { name: 'booking_view' }
  | { name: 'contact_submit' }
  | { name: 'practice_view'; practiceSlug: string }
  | { name: 'article_view'; articleSlug: string }
  | { name: 'ai_open' };

export function trackEvent(event: AnalyticsEvent): void {
  // Safe analytics abstraction; no confidential case or user info is ever transmitted
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[Analytics Event]:', event);
  }
}
