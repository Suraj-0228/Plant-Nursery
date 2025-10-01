import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidenav from '../components/AdminSidenav';

const AdminLayout = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'forest');
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);

  return (
    <div className="flex h-screen bg-base-100">
      <AdminSidenav />
      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;