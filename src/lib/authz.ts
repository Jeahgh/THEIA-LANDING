import { redirect } from 'next/navigation';
import type { Role } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role;
  isActive: boolean;
  sessionVersion: number;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();

  if (!session?.user?.id || session.user.isActive === false) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isActive: true,
      sessionVersion: true,
    },
  });

  if (!user?.isActive || user.sessionVersion !== session.user.sessionVersion) {
    return null;
  }

  return user;
}

export async function requireActiveUser(callbackUrl = '/perfil') {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return user;
}

export async function requireAdmin(callbackUrl = '/admin') {
  const user = await requireActiveUser(callbackUrl);

  if (user.role !== 'ADMIN') {
    redirect('/');
  }

  return user;
}

