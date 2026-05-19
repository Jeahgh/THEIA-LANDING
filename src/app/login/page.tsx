import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar sesion',
  description: 'Inicia sesion en Theia Triathlon Performance para ver precios y contratar planes.',
};

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-bg-warm via-white to-brand-blue-pale/70 px-6 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <div className="accent-line mx-auto mb-6 lg:mx-0" />
          <h2 className="text-4xl font-bold text-text-primary sm:text-5xl">Bienvenido a Theia</h2>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            Tu cuenta permite ver precios, contratar planes y acceder a futuras herramientas para miembros del club.
          </p>
        </div>
        <Suspense fallback={<div className="h-[520px] w-full max-w-md rounded-2xl bg-white" />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
