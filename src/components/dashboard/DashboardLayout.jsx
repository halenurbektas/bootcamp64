// src/components/dashboard/DashboardLayout.jsx (SON HALİ)

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Ana kapsayıcıya flex ekleyerek Sidebar ve ana içeriği yan yana koyuyoruz.
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
      {/* Sidebar - Sabit genişlikli */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Sağ Taraf - Header ve Ana İçerik */}
      {/* Bu div, Sidebar hariç ekranın geri kalanını kaplar ve kendi içinde bir flex konteynerdir. */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Kendi yüksekliği kadar yer kaplar (shrink-0) */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Ana İçerik - Geriye kalan tüm boşluğu kaplar ve kendi içinde kaydırılabilir olur. */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;