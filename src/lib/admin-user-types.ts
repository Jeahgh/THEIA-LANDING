import type { Role } from '@/generated/prisma';

export type UserActionState = { error?: string; success?: string };

export type CreateUserResult = {
  error?: string;
  created?: boolean;
  message?: string;
  tone?: 'success' | 'info';
};

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
