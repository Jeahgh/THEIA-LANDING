'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Role } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

async function ensureAdmin() {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin/usuarios');
  if (session.user.role !== 'ADMIN') redirect('/');
}

export async function updateUserRole(userId: string, formData: FormData) {
  await ensureAdmin();
  const role = String(formData.get('role') ?? 'MEMBER') as Role;
  const isActive = formData.get('isActive') === 'on';

  await prisma.user.update({
    where: { id: userId },
    data: { role, isActive },
  });

  revalidatePath('/admin/usuarios');
}
