'use client';

import { useState, type InputHTMLAttributes } from 'react';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function PasswordInput({ className = '', disabled, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const actionLabel = isVisible ? 'Ocultar contrasena' : 'Mostrar contrasena';

  return (
    <div className="relative">
      <input
        {...props}
        type={isVisible ? 'text' : 'password'}
        disabled={disabled}
        className={`${className} pr-12`}
      />
      <button
        type="button"
        onClick={() => setIsVisible((current) => !current)}
        disabled={disabled}
        aria-label={actionLabel}
        aria-pressed={isVisible}
        title={actionLabel}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-transparent p-1 text-text-muted transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isVisible ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9 5.3 9 8a9.7 9.7 0 01-2.1 3.8M6.6 6.6C4.2 8.2 3 10.5 3 12c0 2.7 3.5 8 9 8a9.7 9.7 0 004.1-.9" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-2.7 3.5-8 9-8s9 5.3 9 8-3.5 8-9 8-9-5.3-9-8z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
