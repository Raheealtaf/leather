// app/admin/layout.tsx
import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. The Sidebar remains fixed on the left */}
      <Sidebar />

      {/* 2. The Main Content area shifts over on desktop to make room for the sidebar */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <main className="p-4 md:p-8 pt-20 md:pt-8">
          {/* This is where your individual pages (Dashboard, Add Product, etc.) will render */}
          {children}
        </main>
      </div>
    </div>
  );
}
