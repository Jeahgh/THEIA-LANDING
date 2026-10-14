'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Filters = { query: string; role: string; status: string };
const fieldClasses = 'w-full rounded-xl border border-brand-blue/15 bg-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

export default function UserFilters({ query, role, status }: Filters) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(query);
  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function apply(next: Filters) {
    if (timer.current) clearTimeout(timer.current);
    const params = new URLSearchParams();
    if (next.query.trim()) params.set('q', next.query.trim());
    if (next.role) params.set('role', next.role);
    if (next.status) params.set('status', next.status);
    startTransition(() => router.replace(`${pathname}${params.size ? `?${params}` : ''}`, { scroll: false }));
  }

  return (
    <div>
    <form role="search" aria-label="Filtros de usuarios" aria-busy={pending} onSubmit={(event) => { event.preventDefault(); apply({ query: search, role: selectedRole, status: selectedStatus }); }} className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
      <label><span className="mb-1 block text-sm font-semibold text-text-primary">Buscar usuario</span><input name="q" value={search} placeholder="Nombre o correo" className={fieldClasses} onChange={(event) => {
        const value = event.target.value;
        setSearch(value);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => apply({ query: value, role: selectedRole, status: selectedStatus }), 350);
      }} /></label>
      <label><span className="mb-1 block text-sm font-semibold text-text-primary">Rol</span><select name="role" value={selectedRole} className={fieldClasses} onChange={(event) => { setSelectedRole(event.target.value); apply({ query: search, role: event.target.value, status: selectedStatus }); }}><option value="">Todos los roles</option><option value="ADMIN">Admin</option><option value="COACH">Coach</option><option value="MEMBER">Miembro</option></select></label>
      <label><span className="mb-1 block text-sm font-semibold text-text-primary">Estado</span><select name="status" value={selectedStatus} className={fieldClasses} onChange={(event) => { setSelectedStatus(event.target.value); apply({ query: search, role: selectedRole, status: event.target.value }); }}><option value="">Todos</option><option value="activo">Activos</option><option value="inactivo">Inactivos</option></select></label>
    </form>
    {(search || selectedRole || selectedStatus) && <div className="mt-3 text-right"><button type="button" onClick={() => { setSearch(''); setSelectedRole(''); setSelectedStatus(''); apply({ query: '', role: '', status: '' }); }} className="rounded text-sm font-semibold text-brand-blue hover:text-brand-blue-vivid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">Limpiar filtros</button></div>}
    </div>
  );
}
