import React from 'react';
import { BookingEmbed } from './BookingEmbed';

interface BookingProviderProps {
  bookingUrl?: string;
}

export function BookingProvider({ bookingUrl }: BookingProviderProps): React.ReactElement {
  return <BookingEmbed bookingUrl={bookingUrl} />;
}
