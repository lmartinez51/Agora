import React from 'react';

export default function Loading(): React.ReactElement {
  return (
    <div className="flex-1 flex items-center justify-center p-12 min-h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-brand-text-muted uppercase tracking-widest">
          Cargando información...
        </span>
      </div>
    </div>
  );
}
