import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      {/* main */}
      <main className="flex-1 flex flex-col h-full">
        {children}
      </main>
    </div>
  );
}
