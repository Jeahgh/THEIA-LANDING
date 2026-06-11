'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const userName = session?.user?.name?.split(' ')[0] ?? 'Atleta';
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSession = async () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    await fetch('/api/session/revoke', { method: 'POST' });
    await signOut({ redirect: false });
    router.replace('/');
    router.refresh();
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy/98 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'bg-gradient-to-r from-brand-navy via-[#06111F] to-brand-navy backdrop-blur-md'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 shrink-0">
              <Image src="/images/logo-theia-blanco.png" alt="Theia Logo" fill className="object-contain" sizes="36px" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-lg font-bold leading-tight tracking-[0.22em] text-white">THEIA</span>
              <span className="text-white/70 text-[9px] tracking-[0.2em] uppercase leading-tight hidden sm:block">Triathlon Performance</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-white bg-white/20'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              {session?.user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen((current) => !current)}
                    className="inline-flex items-center gap-3 px-1 py-1 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/85"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span>Hola, {userName}</span>
                    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-brand-blue ring-2 ring-white/35">
                      {session.user.image ? (
                        <Image src={session.user.image} alt={session.user.name ?? 'Perfil'} fill className="object-cover" sizes="36px" />
                      ) : (
                        userInitial
                      )}
                    </span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-border-subtle bg-white py-2 shadow-2xl shadow-brand-navy/20" role="menu">
                      <div className="border-b border-border-subtle px-4 py-3">
                        <p className="font-semibold text-text-primary">{session.user.name ?? 'Atleta Theia'}</p>
                        <p className="truncate text-xs text-text-muted">{session.user.email}</p>
                      </div>
                      <Link href="/perfil" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-blue-pale hover:text-brand-blue" role="menuitem">
                        Editar perfil
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-blue-pale hover:text-brand-blue" role="menuitem">
                          Panel de administracion
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={closeSession}
                        className="block w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        role="menuitem"
                      >
                        Cerrar sesion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="white" size="sm" href="/login">
                  Unete al club
                </Button>
              )}
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Abrir menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-h-[calc(100vh-4rem)] space-y-1 overflow-y-auto border-t border-white/10 bg-brand-navy px-4 py-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                pathname === link.href ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Admin
            </Link>
          )}
          <div className="pt-2" onClick={() => setIsMobileMenuOpen(false)}>
            {session?.user ? (
              <div className="space-y-2 rounded-xl bg-white/10 p-3">
                <div className="flex min-w-0 items-center gap-3 px-1 py-1 text-white">
                  <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-brand-blue">
                    {session.user.image ? (
                      <Image src={session.user.image} alt={session.user.name ?? 'Perfil'} fill className="object-cover" sizes="40px" />
                    ) : (
                      userInitial
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">Hola, {userName}</p>
                    <p className="truncate text-xs text-white/65">{session.user.email}</p>
                  </div>
                </div>
                <Link href="/perfil" className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-white/80 hover:bg-white/10 hover:text-white">
                  Editar perfil
                </Link>
                <button
                  type="button"
                  onClick={closeSession}
                  className="block w-full rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Cerrar sesion
                </button>
              </div>
            ) : (
              <Button variant="white" size="md" href="/login" className="w-full">Unete al club</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
