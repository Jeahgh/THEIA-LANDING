import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authz';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  await requireAdmin('/admin/home');
  redirect('/admin/planes');
}
