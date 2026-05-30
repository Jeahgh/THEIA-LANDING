import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <section className="min-h-screen bg-[#F6F8FA] pt-16 lg:pt-20">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:min-h-[calc(100vh-5rem)] lg:flex-row">
        <AdminSidebar email={session.user.email} />
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">{children}</main>
      </div>
    </section>
  );
}
