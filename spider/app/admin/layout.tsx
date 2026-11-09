'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex selection:bg-primary-container selection:text-white" dir="rtl">
      {/* Collapsible Sidebar on Right (RTL) */}
      <AdminSidebar />

      {/* Main Content Area offset by sidebar width (default mr-64) */}
      <div className="flex-1 mr-64 flex flex-col min-h-screen transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
