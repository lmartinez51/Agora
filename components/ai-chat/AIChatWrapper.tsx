'use client';

import React from 'react';
import { AIChat } from './AIChat';

export function AIChatWrapper(): React.ReactElement | null {
  // Feature flag check: If disabled or unset, render absolutely nothing
  if (process.env.NEXT_PUBLIC_AI_CHAT_ENABLED !== 'true') {
    return null;
  }

  return <AIChat />;
}
