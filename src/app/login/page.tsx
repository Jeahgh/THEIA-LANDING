import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar sesion',
  description: 'Inicia sesion en Theia Triathlon Performance para ver precios y contratar planes.',
};

export default function LoginPage() {
  return (
    <section className="theia-light-section min-h-screen px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <div className="accent-line mx-auto mb-6 lg:mx-0" />
          <h2 className="text-3xl font-bold text-text-primary sm:text-5xl">Bienvenido a Theia</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
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
