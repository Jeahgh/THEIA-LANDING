import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Crea tu cuenta en Theia Triathlon Performance para ver precios y contratar planes.',
};

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-bg-warm via-white to-run-light/60 px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <div className="accent-line mx-auto mb-6 lg:mx-0" />
          <h2 className="text-3xl font-bold text-text-primary sm:text-5xl">Unete al club</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
            Crea tu perfil para acceder a precios, contratar planes y recibir informacion personalizada de entrenamiento.
          </p>
        </div>
        <Suspense fallback={<div className="h-[650px] w-full max-w-md rounded-2xl bg-white" />}>
          <RegisterForm />
        </Suspense>
      </div>
    </section>
  );
}
