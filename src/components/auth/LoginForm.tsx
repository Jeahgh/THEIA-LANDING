'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';
import GoogleLogo from '@/components/auth/GoogleLogo';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/planes';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const isSubmitting = Boolean(loadingMessage);

  const handleGoogleLogin = async () => {
    setError('');
    setLoadingMessage('Conectando con Google...');

    try {
      await signIn('google', { callbackUrl });
    } catch {
      setError('No se pudo iniciar sesion con Google. Intentalo nuevamente.');
      setLoadingMessage('');
    }
  };

  const handleCredentialsLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoadingMessage('Verificando tus datos...');

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (response?.error) {
        setError('Email o contrasena incorrectos.');
        setLoadingMessage('');
        return;
      }

      setLoadingMessage('Preparando tu cuenta...');
      router.replace(callbackUrl);
    } catch {
      setError('No se pudo iniciar sesion. Intentalo nuevamente.');
      setLoadingMessage('');
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-border-subtle bg-white p-4 shadow-xl shadow-brand-blue/10 sm:rounded-2xl sm:p-8">
      <div className="mb-6 text-center sm:mb-8">
        <div className="accent-line mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Iniciar sesion</h1>
        <p className="mt-2 text-text-secondary">Entra para ver precios y contratar planes.</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
        className="mb-6 inline-flex w-full items-center justify-center gap-3 rounded-lg border-2 border-border-subtle bg-white px-5 py-3 text-base font-semibold text-text-primary transition-all duration-200 hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-xl sm:hover:-translate-y-0.5"
      >
        <GoogleLogo />
        {loadingMessage === 'Conectando con Google...' ? 'Conectando...' : 'Continuar con Google'}
      </button>

      <div className="mb-6 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-border-subtle" />
        <span>o con tu email</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      {loadingMessage && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-brand-blue/10 bg-brand-blue-pale/60 px-4 py-3 text-sm font-semibold text-brand-navy">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-blue/20 border-t-brand-blue" />
          {loadingMessage}
        </div>
      )}

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-primary">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 disabled:cursor-not-allowed disabled:bg-slate-50 sm:rounded-xl"
            autoComplete="current-password"
            disabled={isSubmitting}
            required
          />
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? loadingMessage : 'Entrar'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        No tienes cuenta?{' '}
        <Link href={`/registro?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-semibold text-brand-blue hover:text-brand-blue-vivid">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
