import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, SOCIAL_LINKS, CLUB_INFO } from '@/lib/constants';

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>),
    facebook: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>),
    youtube: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>),
    strava: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>),
  };
  return <>{icons[platform] || null}</>;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      {/* Gradient strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-swim via-brand-blue via-50% to-run" />

      <div className="bg-gray-900 text-white">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 relative">
                  <Image src="/images/logo-theia.png" alt="Theia" fill className="object-contain brightness-0 invert" sizes="36px" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg tracking-[0.25em]">THEIA</p>
                  <p className="text-white/50 text-[9px] tracking-[0.2em] uppercase">Triathlon Performance</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{CLUB_INFO.motto}. Una comunidad unida por el triatlón.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Navegación</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-white/60 hover:text-swim transition-colors text-sm">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><span className="text-white/80">Email: </span><a href={`mailto:${CLUB_INFO.email}`} className="hover:text-swim transition-colors">{CLUB_INFO.email}</a></li>
                <li><span className="text-white/80">Tel: </span>{CLUB_INFO.phone}</li>
                <li><span className="text-white/80">Lugar: </span>{CLUB_INFO.address}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-blue transition-all duration-200">
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="w-full px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/40 text-xs">© {currentYear} {CLUB_INFO.name}. Todos los derechos reservados.</p>
            <p className="text-white/40 text-xs">Nada · Pedalea · Corre</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
