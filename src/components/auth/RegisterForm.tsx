'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    setIsSubmitting(true);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsSubmitting(false);
      setIsError(true);
      setMessage(data.message ?? 'No pudimos crear la cuenta.');
      return;
    }

    const signInResponse = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (signInResponse?.error) {
      setIsError(false);
      setMessage('Cuenta creada. Ahora inicia sesion con tus datos.');
      router.push('/login');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-white p-6 shadow-xl shadow-brand-blue/10 sm:p-8">
      <div className="mb-8 text-center">
        <div className="accent-line mx-auto mb-5" />
        <h1 className="text-3xl font-bold text-text-primary">Crear cuenta</h1>
        <p className="mt-2 text-text-secondary">Registrate para ver precios y contratar planes.</p>
      </div>

      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl })}
        className="mb-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-border-subtle bg-white px-5 py-3 text-base font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
      >
        Registrarme con Google
      </button>

      <div className="mb-6 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-border-subtle" />
        <span>o con email y contraseña</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-text-primary">Nombre</label>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
            autoComplete="name"
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
            value={formData.password}
            onChange={(event) => updateField('password', event.target.value)}
            className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-text-primary">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(event) => updateField('confirmPassword', event.target.value)}
            className="w-full rounded-xl border border-border-subtle px-4 py-3 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {message && (
          <p className={`rounded-xl px-4 py-3 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear cuenta'}
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
