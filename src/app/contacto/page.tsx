import type { Metadata } from 'next';
import Image from 'next/image';
import { CLUB_INFO, SOCIAL_LINKS } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = { title: 'Contacto', description: `Contáctanos para unirte a ${CLUB_INFO.name}.` };

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>),
    whatsapp: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0012.08 0C5.5 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.91 11.91 0 005.83 1.49h.01C18.66 23.85 24 18.5 24 11.92a11.87 11.87 0 00-3.48-8.44zM12.09 21.83h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.86 9.86 0 01-1.51-5.29c0-5.46 4.45-9.9 9.91-9.9a9.83 9.83 0 017 2.9 9.84 9.84 0 012.9 7c0 5.46-4.44 9.9-9.94 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 01-1.65-2.05c-.17-.29-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>),
  };
  return <>{icons[platform] || null}</>;
};

export default function ContactoPage() {
  const whatsappUrl = SOCIAL_LINKS.find((s) => s.platform === 'whatsapp')?.url ?? '#';

  return (
    <>
      {/* Hero — mismo estilo que Nosotros */}
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="relative h-[300px] sm:h-[400px]">
          <Image src="/images/atletas-collage.jpg" alt="Atletas Theia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/50 to-bg-warm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="accent-line mx-auto mb-6" />
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Contacto</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">¿Quieres unirte al club o tienes alguna pregunta? Escríbenos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-bg-warm via-white to-brand-blue-pale/80">
        <div className="content-shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle title="Envíanos un mensaje" subtitle="Te contactaremos pronto" align="left" />
              <Card><ContactForm /></Card>
            </div>
            <div className="lg:pt-20">
              <div className="space-y-5 mb-8">
                {[
                  { label: 'Email', value: CLUB_INFO.email, href: `mailto:${CLUB_INFO.email}` },
                  { label: 'WhatsApp', value: CLUB_INFO.phone, href: whatsappUrl },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-blue-pale rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-brand-blue font-bold text-xs">{item.label.slice(0,2).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold text-sm mb-0.5">{item.label}</h3>
                      {item.href ? <a href={item.href} className="text-brand-blue hover:text-brand-blue-vivid text-sm">{item.value}</a> : <p className="text-text-secondary text-sm">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <Card className="mb-8 bg-gradient-to-br from-brand-blue-pale via-white to-run-light/60">
                <h3 className="text-text-primary font-semibold mb-2">Inscripción rápida</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Si ya quieres sumarte, escríbenos por WhatsApp y te orientamos con horarios, niveles y próximos pasos.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition-all duration-200 hover:bg-brand-blue-vivid hover:shadow-lg hover:shadow-brand-blue/30 sm:w-auto sm:hover:-translate-y-0.5"
                >
                  Escribir por WhatsApp
                </a>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-11 h-11 bg-brand-blue-pale rounded-xl flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200">
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
