"use client";
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavbarAdmin from './NavbarAdmin.jsx';
import AdminGuard from './Guard.jsx';
import { AdminContext } from "../providers/AdminContext";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { admin } = useContext(AdminContext);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Hide navbar on login route
    if (pathname === '/admin/login') {
      setShowNav(false);
      return;
    }
    // Show navbar only when authenticated
    const stored = typeof window !== 'undefined' ? localStorage.getItem('adminlogin') : null;
    setShowNav(Boolean(admin || stored));
  }, [pathname, admin]);

  return (
    <AdminGuard>
      <section>
        {showNav && (
          <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <NavbarAdmin />
          </div>
        )}
        <div className="container py-3">
          {children}
        </div>
      </section>
    </AdminGuard>
  );
}
