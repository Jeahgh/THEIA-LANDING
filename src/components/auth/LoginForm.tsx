'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/planes';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentialsLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (response?.error) {
      setError('Email o contraseña incorrectos.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-white p-6 shadow-xl shadow-brand-blue/10 sm:p-8">
      <div className="mb-8 text-center">
        <div className="accent-line mx-auto mb-5" />
        <h1 className="text-3xl font-bold text-text-primary">Iniciar sesion</h1>
        <p className="mt-2 text-text-secondary">Entra para ver precios y contratar planes.</p>
      </div>

      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl })}
        className="mb-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-border-subtle bg-white px-5 py-3 text-base font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
      >
        Continuar con Google
      </button>

      <div className="mb-6 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-border-subtle" />
        <span>o con tu email</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-primary">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-text-primary">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
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
