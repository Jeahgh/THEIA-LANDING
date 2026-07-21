'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';
import GoogleLogo from '@/components/auth/GoogleLogo';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/planes';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const isSubmitting = Boolean(loadingMessage);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleGoogleRegister = async () => {
    setMessage('');
    setIsError(false);
    setLoadingMessage('Conectando con Google...');

    try {
      await signIn('google', { callbackUrl });
    } catch {
      setIsError(true);
      setMessage('No se pudo continuar con Google. Intentalo nuevamente.');
      setLoadingMessage('');
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setLoadingMessage('Creando tu cuenta...');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message ?? 'No pudimos crear la cuenta.');
        setLoadingMessage('');
        return;
      }

      setLoadingMessage('Iniciando sesion...');
      const signInResponse = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });

      if (signInResponse?.error) {
        setIsError(false);
        setMessage('Cuenta creada. Ahora inicia sesion con tus datos.');
        router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }

      setLoadingMessage('Preparando tu cuenta...');
      router.replace(callbackUrl);
    } catch {
      setIsError(true);
      setMessage('No pudimos crear la cuenta. Intentalo nuevamente.');
      setLoadingMessage('');
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg p-4 theia-card-glow sm:rounded-2xl sm:p-8">
      <div className="mb-6 text-center sm:mb-8">
        <div className="accent-line mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Crear cuenta</h1>
        <p className="mt-2 text-text-secondary">Registrate para ver precios y contratar planes.</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={isSubmitting}
        className="mb-6 inline-flex w-full items-center justify-center gap-3 rounded-lg border-2 border-border-subtle bg-white px-5 py-3 text-base font-semibold text-text-primary transition-all duration-200 hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-xl sm:hover:-translate-y-0.5"
      >
        <GoogleLogo />
        {loadingMessage === 'Conectando con Google...' ? 'Conectando...' : 'Continuar con Google'}
      </button>

      <div className="mb-6 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-border-subtle" />
        <span>o crea tu cuenta con email</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      {loadingMessage && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-brand-blue/10 bg-brand-blue-pale/60 px-4 py-3 text-sm font-semibold text-brand-navy">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-blue/20 border-t-brand-blue" />
          {loadingMessage}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-slate-50 sm:rounded-xl"
            autoComplete="name"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-primary">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-slate-50 sm:rounded-xl"
            autoComplete="email"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-text-primary">Contrasena</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(event) => updateField('password', event.target.value)}
            className="w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-slate-50 sm:rounded-xl"
            autoComplete="new-password"
            disabled={isSubmitting}
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-text-primary">Confirmar contrasena</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(event) => updateField('confirmPassword', event.target.value)}
            className="w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-slate-50 sm:rounded-xl"
            autoComplete="new-password"
            disabled={isSubmitting}
            minLength={8}
            required
          />
        </div>

        {message && (
          <p className={`rounded-xl border px-4 py-3 text-sm ${isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
            {message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? loadingMessage : 'Crear cuenta'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Ya tienes cuenta?{' '}
        <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-semibold text-brand-blue hover:text-brand-blue-vivid">
          Iniciar sesion
        </Link>
      </p>
    </div>
  );
}
