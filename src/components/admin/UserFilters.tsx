'use client';

import ContentFilters from './ContentFilters';
import type { AdminFilterField } from '@/lib/admin-filters';

const fields: AdminFilterField[] = [
  { name: 'role', label: 'Rol', allLabel: 'Todos los roles', options: [{ value: 'ADMIN', label: 'Admin' }, { value: 'COACH', label: 'Coach' }, { value: 'MEMBER', label: 'Miembro' }] },
  { name: 'status', label: 'Estado', allLabel: 'Todos', options: [{ value: 'activo', label: 'Activos' }, { value: 'inactivo', label: 'Inactivos' }] },
];

export default function UserFilters({ query, role, status }: { query: string; role: string; status: string }) {
  return <ContentFilters label="usuarios" searchLabel="Buscar usuario" placeholder="Nombre o correo" fields={fields} query={query} values={{ role, status }} />;
}
