import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 flex">
      <AdminSidebar />
      <main className="flex-1 ml-16 lg:ml-60 min-h-screen p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
