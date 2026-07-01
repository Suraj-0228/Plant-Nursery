import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidenav from '../components/AdminSidenav';

const AdminLayout = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'premium-dark');
    document.body.classList.add('dark');
    return () => {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark');
    };
  }, []);

  return (
    <div className="flex h-screen bg-base-100 font-sans antialiased text-base-content overflow-hidden transition-colors duration-300">
      <AdminSidenav />
      <main className="flex-grow p-8 overflow-y-auto relative">
        {/* Background ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;