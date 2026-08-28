import React from 'react';
import { BookingFallback } from './BookingFallback';

interface BookingEmbedProps {
  bookingUrl?: string;
}

export function BookingEmbed({ bookingUrl }: BookingEmbedProps): React.ReactElement {
  const resolvedUrl = bookingUrl || process.env.NEXT_PUBLIC_BOOKING_URL;

  if (!resolvedUrl || resolvedUrl.trim() === '') {
    return <BookingFallback />;
  }

  return (
    <div className="w-full max-w-container-lg mx-auto my-8 border border-brand-border bg-brand-surface rounded-md overflow-hidden shadow-card">
      <iframe
        src={resolvedUrl}
        className="w-full min-h-[700px] border-0"
        title="Agenda de Citas AGORA"
        loading="lazy"
      />
    </div>
  );
}
