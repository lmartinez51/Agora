import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BookingEmbed, getSafeBookingUrl } from '@/components/booking/BookingEmbed';
import fs from 'fs';
import path from 'path';

describe('BookingEmbed & Virtual Agenda Integration', () => {
  const originalBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
  });

  afterEach(() => {
    if (originalBookingUrl !== undefined) {
      process.env.NEXT_PUBLIC_BOOKING_URL = originalBookingUrl;
    } else {
      delete process.env.NEXT_PUBLIC_BOOKING_URL;
    }
  });

  // ==========================================================================
  // 1. URL Safety & Validation
  // ==========================================================================
  describe('1. URL Safety & Validation (getSafeBookingUrl)', () => {
    it('accepts valid https Google Calendar Appointment Schedule URLs', () => {
      const url = 'https://calendar.app.google/rPk5Bbhidj5ZiFXX6';
      expect(getSafeBookingUrl(url)).toBe(url);
    });

    it('accepts generic valid https URLs', () => {
      const url = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2q';
      expect(getSafeBookingUrl(url)).toBe(url);
    });

    it('rejects insecure http URLs', () => {
      expect(getSafeBookingUrl('http://calendar.app.google/rPk5Bbhidj5ZiFXX6')).toBeNull();
    });

    it('rejects dangerous javascript: protocols', () => {
      expect(getSafeBookingUrl('javascript:alert("XSS")')).toBeNull();
      expect(getSafeBookingUrl('javascript://calendar.app.google')).toBeNull();
    });

    it('rejects data: and vbscript: protocols', () => {
      expect(getSafeBookingUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
      expect(getSafeBookingUrl('vbscript:msgbox(1)')).toBeNull();
    });

    it('rejects empty, null, undefined, or whitespace-only values', () => {
      expect(getSafeBookingUrl(undefined)).toBeNull();
      expect(getSafeBookingUrl('')).toBeNull();
      expect(getSafeBookingUrl('   ')).toBeNull();
      expect(getSafeBookingUrl(null as unknown as string)).toBeNull();
    });

    it('rejects malformed URLs', () => {
      expect(getSafeBookingUrl('https://')).toBeNull();
      expect(getSafeBookingUrl('https:// not a valid url')).toBeNull();
    });
  });

  // ==========================================================================
  // 2. Component Rendering with Valid Booking URL
  // ==========================================================================
  describe('2. Component Rendering with Configured Booking URL', () => {
    const testUrl = 'https://calendar.app.google/rPk5Bbhidj5ZiFXX6';

    it('renders branded booking card and does NOT render an iframe', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: testUrl }));

      expect(html).toContain('Calendario de Citas en Línea');
      expect(html).toContain('Google Calendar');
      expect(html).not.toContain('<iframe');
    });

    it('renders prominent primary CTA linking to the configured booking URL with secure target and rel attributes', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: testUrl }));

      expect(html).toContain(`href="${testUrl}"`);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain('Abrir calendario y seleccionar horario');
    });

    it('reads booking URL from process.env.NEXT_PUBLIC_BOOKING_URL when not passed as prop', () => {
      process.env.NEXT_PUBLIC_BOOKING_URL = testUrl;
      const html = renderToStaticMarkup(React.createElement(BookingEmbed));

      expect(html).toContain(`href="${testUrl}"`);
      expect(html).toContain('Abrir calendario y seleccionar horario');
    });

    it('includes user transparency copy explaining Google Calendar booking', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: testUrl }));

      expect(html).toContain('Seleccione una fecha y horario disponible. La reservación se realizará mediante Google Calendar');
    });

    it('includes secondary WhatsApp and phone assistance options using centralized contact data', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: testUrl }));

      expect(html).toContain('Solicitar por WhatsApp');
      expect(html).toContain('Llamar al');
      expect(html).toContain('526563502916');
      expect(html).toContain('+52 656 350 2916');
    });
  });

  // ==========================================================================
  // 3. Fallback Triggering on Missing or Unsafe URL
  // ==========================================================================
  describe('3. Fallback Triggering', () => {
    it('renders BookingFallback when booking URL is undefined/unset', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed));

      expect(html).toContain('Agenda Digital en Preparación');
      expect(html).toContain('Solicitar Consulta por WhatsApp');
      expect(html).not.toContain('Abrir calendario y seleccionar horario');
      expect(html).not.toContain('<iframe');
    });

    it('renders BookingFallback when booking URL is empty string', () => {
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: '' }));

      expect(html).toContain('Agenda Digital en Preparación');
    });

    it('renders BookingFallback when booking URL is insecure or unsafe', () => {
      const htmlHttp = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: 'http://insecure.example.com' }));
      expect(htmlHttp).toContain('Agenda Digital en Preparación');

      const htmlJs = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: 'javascript:alert(1)' }));
      expect(htmlJs).toContain('Agenda Digital en Preparación');
    });
  });

  // ==========================================================================
  // 4. Absence of Hardcoded Google Account Email
  // ==========================================================================
  describe('4. Account Agnostic Architecture (Zero Hardcoded Account Email)', () => {
    it('does not leak any personal or temporary Google email address in rendered output', () => {
      const testUrl = 'https://calendar.app.google/rPk5Bbhidj5ZiFXX6';
      const html = renderToStaticMarkup(React.createElement(BookingEmbed, { bookingUrl: testUrl }));

      // Generic check: no google/gmail account emails should ever be rendered
      expect(html).not.toMatch(/[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)/i);
    });

    it('verifies that no Google account email is hard-coded in booking source files', () => {
      const bookingDir = path.resolve(process.cwd(), 'components/booking');
      const files = fs.readdirSync(bookingDir);

      files.forEach((file) => {
        const content = fs.readFileSync(path.join(bookingDir, file), 'utf8');
        expect(content).not.toMatch(/[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)/i);
      });

      const agendaPage = fs.readFileSync(path.resolve(process.cwd(), 'app/agenda/page.tsx'), 'utf8');
      expect(agendaPage).not.toMatch(/[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)/i);
    });
  });
});
