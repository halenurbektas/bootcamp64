import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    // Sadece 'flex' ve 'h-screen' yeterli
    <div className="relative flex h-screen bg-slate-100 dark:bg-slate-900">
      
      <Sidebar />

      {/* Sağ Taraftaki Ana İçerik */}
      {/* DEĞİŞİKLİK: 'flex-1' artık bu kapsayıcıda. Bu, Sidebar'dan geriye kalan tüm alanı kaplamasını sağlar. */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;