import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: true });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { sessionVersion: { increment: 1 } },
  });

  return NextResponse.json({ success: true });
}
