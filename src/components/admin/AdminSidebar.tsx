'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
  { href: '/admin/planes', label: 'Planes' },
  { href: '/admin/equipo', label: 'Equipo Theia' },
  { href: '/admin/noticias', label: 'Noticias' },
  { href: '/admin/competencias', label: 'Competencias' },
  { href: '/admin/usuarios', label: 'Usuarios y roles' },
];

export default function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 border-b border-white/10 bg-gradient-to-r from-brand-navy via-[#06111f] to-brand-navy text-white shadow-lg shadow-black/20 lg:min-h-[calc(100vh-5rem)] lg:w-72 lg:flex-col lg:border-b-0 lg:border-r lg:bg-gradient-to-b">
      <div className="flex w-full flex-col px-4 py-4 lg:px-4 lg:py-8">
        <div className="mb-4 lg:mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Admin Theia</p>
          <h1 className="mt-1 text-xl font-bold text-white lg:mt-2 lg:text-2xl">Centro de gestión</h1>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors lg:py-3 lg:font-medium ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto hidden border-t border-white/10 px-4 py-5 text-xs text-white/50 lg:block">
        <p className="truncate">{email}</p>
      </div>
    </aside>
  );
}
