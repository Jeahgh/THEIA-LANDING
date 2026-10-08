import type { Metadata } from 'next';
import Link from 'next/link';
import { Role } from '@/generated/prisma';
import type { Prisma } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import EmptyState from '@/components/ui/EmptyState';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import UserControls from '@/components/admin/UserControls';
import { deleteUser, updateUserRole } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Usuarios y roles',
};

const roleLabels = {
  ADMIN: 'Admin',
  COACH: 'Coach',
  MEMBER: 'Miembro',
} as const;

const statusLabels = {
  activo: 'Activos',
  inactivo: 'Inactivos',
} as const;

const errorMessages: Record<string, string> = {
  'not-found': 'El usuario ya no existe.',
  'self-admin': 'No puedes quitarte el acceso de administrador.',
  'self-delete': 'No puedes borrar tu propia cuenta desde este panel.',
  'last-admin': 'Debe quedar al menos un administrador habilitado.',
  conflict: 'La cuenta cambió mientras la editabas. Revisa los datos e inténtalo de nuevo.',
};

const filterFieldClasses =
  'w-full rounded-lg border border-brand-blue/20 bg-white px-4 py-3 text-sm text-text-primary shadow-sm shadow-brand-blue/10 outline-none transition-colors placeholder:text-text-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 sm:rounded-xl';

function readRoleFilter(value: string | undefined) {
  return Object.values(Role).includes(value as Role) ? (value as Role) : '';
}

function readStatusFilter(value: string | undefined) {
  return value === 'activo' || value === 'inactivo' ? value : '';
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; role?: string; status?: string; guardado?: string; eliminado?: string; error?: string }>;
}) {
  const actor = await requireAdmin('/admin/usuarios');
  const params = await searchParams;
  const query = String(params?.q ?? '').trim();
  const role = readRoleFilter(params?.role);
  const status = readStatusFilter(params?.status);
  const where: Prisma.UserWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { email: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (status) {
    where.isActive = status === 'activo';
  }

  const [users, totalUsers, filteredUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
    prisma.user.count({ where }),
  ]);
  const hasFilters = Boolean(query || role || status);

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Usuarios</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Usuarios y roles</h1>
      </div>

      <AdminActionStatus saved={params?.guardado} deleted={params?.eliminado} />
      {params?.error && errorMessages[params.error] && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessages[params.error]}
        </p>
      )}

      <form className="space-y-3" method="get">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto] lg:items-end">
          <div>
            <label className="mb-1 block text-sm font-semibold text-text-primary">Buscar usuario</label>
            <input
              name="q"
              defaultValue={query}
              placeholder="Nombre o correo"
              className={filterFieldClasses}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-text-primary">Rol</label>
            <select
              name="role"
              defaultValue={role}
              className={filterFieldClasses}
            >
              <option value="">Todos los roles</option>
              <option value="ADMIN">Admin</option>
              <option value="COACH">Coach</option>
              <option value="MEMBER">Miembro</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-text-primary">Estado</label>
            <select
              name="status"
              defaultValue={status}
              className={filterFieldClasses}
            >
              <option value="">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>
          <button className="rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-vivid sm:rounded-xl">
            Filtrar
          </button>
        </div>
        <div className="flex flex-col gap-2 px-1 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Mostrando {filteredUsers} de {totalUsers} usuarios
            {role && ` - Rol: ${roleLabels[role]}`}
            {status && ` - ${statusLabels[status]}`}
          </p>
          {hasFilters && (
            <Link href="/admin/usuarios" className="font-semibold text-brand-blue hover:text-brand-blue-vivid">
              Limpiar filtros
            </Link>
          )}
        </div>
      </form>

      {users.length === 0 ? (
        <EmptyState tone="admin">
          {hasFilters ? 'No hay usuarios que coincidan con esos filtros.' : 'No hay usuarios registrados.'}
        </EmptyState>
      ) : (
        <div className="overflow-hidden">
          <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-text-primary sm:text-xl">Usuarios</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(180px,1fr)_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-text-primary">{user.name ?? 'Sin nombre'}</p>
                    <span className="rounded-full bg-brand-blue-pale px-2 py-0.5 text-xs font-semibold text-brand-blue">{roleLabels[user.role]}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {user.isActive ? 'Habilitado' : 'Deshabilitado'}
                    </span>
                  </div>
                  <p className="truncate text-sm text-text-secondary">{user.email}</p>
                  <p className="mt-1 text-xs text-text-muted">Creado: {user.createdAt.toLocaleDateString('es-CL')}</p>
                </div>
                <UserControls
                  name={user.name ?? user.email ?? 'Sin nombre'}
                  role={user.role}
                  isActive={user.isActive}
                  isCurrentUser={user.id === actor.id}
                  updateAction={updateUserRole.bind(null, user.id)}
                  deleteAction={deleteUser.bind(null, user.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
