'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy/98 backdrop-blur-xl shadow-lg shadow-brand-navy/20'
          : 'bg-gradient-to-r from-brand-navy/92 via-brand-navy/88 to-brand-blue-vivid/92 backdrop-blur-md'
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo blanco que se ve sobre fondo azul */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 relative">
              <Image
                src="/images/logo-theia-blanco.png"
                alt="Theia Logo"
                fill
                className="object-contain"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-[0.25em] leading-tight">THEIA</span>
              <span className="text-white/70 text-[9px] tracking-[0.2em] uppercase leading-tight hidden sm:block">Triathlon Performance</span>
            </div>
          </Link>

          {/* Desktop Nav */}
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
            <div className="hidden lg:block">
              <Button variant="white" size="sm" href="/contacto">
                Únete al club
              </Button>
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Abrir menú"
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

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-brand-blue border-t border-white/10 px-6 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>{link.label}</Link>
          ))}
          <div className="pt-2"><Button variant="white" size="md" href="/contacto" className="w-full">Únete al club</Button></div>
        </div>
      </div>
    </nav>
  );
}
