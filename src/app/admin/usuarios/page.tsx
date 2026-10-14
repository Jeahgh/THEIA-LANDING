import type { Metadata } from 'next';
import { Role } from '@/generated/prisma';
import type { Prisma } from '@/generated/prisma';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import EmptyState from '@/components/ui/EmptyState';
import AdminActionStatus from '@/components/admin/AdminActionStatus';
import UserControls from '@/components/admin/UserControls';
import UserFilters from '@/components/admin/UserFilters';
import { deleteUser, updateUser, sendUserRecoveryEmail } from './actions';

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
        phone: true,
        image: true,
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

      <div className="space-y-3">
        <UserFilters query={query} role={role} status={status} />
        <div className="flex flex-col gap-2 px-1 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Mostrando {filteredUsers} de {totalUsers} usuarios
            {role && ` - Rol: ${roleLabels[role]}`}
            {status && ` - ${statusLabels[status]}`}
          </p>
        </div>
      </div>

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
                  </div>
                  <p className="truncate text-sm text-text-secondary">{user.email}</p>
                </div>
                <UserControls
                  user={{ ...user, createdAt: user.createdAt.toISOString() }}
                  isCurrentUser={user.id === actor.id}
                  updateAction={updateUser.bind(null, user.id)}
                  recoveryAction={sendUserRecoveryEmail.bind(null, user.id)}
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
