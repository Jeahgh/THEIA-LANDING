import type { Role } from '@/generated/prisma';

export type UserActionState = { error?: string; success?: string };

export type EditableUser = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  createdAt: string;
  role: Role;
  isActive: boolean;
};
