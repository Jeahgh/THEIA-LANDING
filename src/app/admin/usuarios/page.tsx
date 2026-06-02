import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { updateUserRole } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Usuarios y roles',
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Usuarios</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">Usuarios y roles</h1>
      </div>

      <div className="overflow-hidden rounded-lg theia-card-glow sm:rounded-2xl">
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Usuarios</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {users.length === 0 && <p className="px-4 py-5 text-text-muted sm:px-6">No hay usuarios registrados.</p>}
          {users.map((user) => (
            <form
              key={user.id}
              action={updateUserRole.bind(null, user.id)}
              className={`grid grid-cols-1 gap-4 px-4 py-5 transition-opacity sm:px-6 lg:grid-cols-[auto_1fr_180px_auto] lg:items-center ${
                user.isActive ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-text-primary lg:justify-center">
                <input name="isActive" type="checkbox" defaultChecked={user.isActive} className="h-4 w-4 accent-brand-blue" />
                <span className="lg:hidden">Activo</span>
              </label>
              <div className="min-w-0">
                <p className="font-bold text-text-primary">{user.name ?? 'Sin nombre'}</p>
                <p className="truncate text-sm text-text-secondary">{user.email}</p>
                <p className="mt-1 text-xs text-text-muted">Creado: {user.createdAt.toLocaleDateString('es-CL')}</p>
              </div>
              <select name="role" defaultValue={user.role} className="rounded-lg border border-border-subtle px-4 py-2 sm:rounded-xl">
                <option value="MEMBER">Miembro</option>
                <option value="COACH">Coach</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-vivid sm:rounded-xl">
                Guardar
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
