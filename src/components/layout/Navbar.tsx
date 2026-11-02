'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { useDismissableLayer } from '@/hooks/useDismissableLayer';
import ProfileAvatar from '@/components/profile/ProfileAvatar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const hasActiveSession = Boolean(session?.user?.id && session.user.isActive);
  const isAdmin = hasActiveSession && session?.user?.role === 'ADMIN';
  const userName = session?.user?.name?.split(' ')[0] ?? 'Atleta';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProfileOpen(false);
  }, []);
  const closeProfileMenu = useCallback(() => setIsProfileMenuOpen(false), []);

  useDismissableLayer({
    enabled: isMobileMenuOpen,
    refs: [navRef],
    onDismiss: closeMobileMenu,
  });

  useDismissableLayer({
    enabled: isProfileMenuOpen,
    refs: [profileMenuRef],
    onDismiss: closeProfileMenu,
  });

  const closeSession = async () => {
    setIsProfileMenuOpen(false);
    closeMobileMenu();
    await fetch('/api/session/revoke', { method: 'POST' });
    await signOut({ redirect: false });
    router.replace('/');
    router.refresh();
  };

  return (
    <nav
      ref={navRef}
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy/98 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'bg-gradient-to-r from-brand-navy via-[#06111F] to-brand-navy backdrop-blur-md'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex h-[var(--navbar-height)] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 shrink-0">
              <Image src="/images/logo-theia-blanco.png" alt="Theia Triathlon Performance" fill className="object-contain" sizes="36px" />
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
              {hasActiveSession && session?.user ? (
                <div ref={profileMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen((current) => !current)}
                    className="inline-flex items-center gap-3 px-1 py-1 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/85"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span>Hola, {userName}</span>
                    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-brand-blue ring-2 ring-white/35">
                      <ProfileAvatar image={session.user.image} name={session.user.name} sizes="36px" />
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
              onClick={() => {
                if (isMobileMenuOpen) closeMobileMenu();
                else setIsMobileMenuOpen(true);
              }}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
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

      <div id="mobile-navigation" inert={!isMobileMenuOpen} className={`overflow-hidden transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'max-h-[calc(100dvh-var(--navbar-height))] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-h-[calc(100dvh-var(--navbar-height))] space-y-1 overflow-y-auto border-t border-white/10 bg-brand-navy px-4 py-4 shadow-lg">
          {hasActiveSession && session?.user && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => setIsMobileProfileOpen((current) => !current)}
                aria-expanded={isMobileProfileOpen}
                aria-controls="mobile-profile-options"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-white transition-colors hover:text-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <span aria-hidden="true" className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-brand-blue">
                  <ProfileAvatar image={session.user.image} name={session.user.name} sizes="40px" />
                </span>
                <span className="min-w-0 flex-1 break-words">Hola, {userName}</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-5 w-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isMobileProfileOpen ? 'rotate-180' : ''}`}>
                  <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isMobileProfileOpen && (
                <div id="mobile-profile-options" className="space-y-1 pl-[3.25rem]">
                  <Link href="/perfil" onClick={closeMobileMenu} className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/5">
                    Editar perfil
                  </Link>
                  <button type="button" onClick={closeSession} className="block w-full rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-red-400 transition-colors hover:bg-white/5 hover:text-red-300">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
              className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Admin
            </Link>
          )}
          {!hasActiveSession && (
            <div className="pt-2" onClick={closeMobileMenu}>
              <Button variant="white" size="md" href="/login" className="w-full">Unete al club</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
