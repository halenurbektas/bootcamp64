import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom'; // useOutletContext import edildi
import Sidebar from '../Sidebar';
import Header from '../Header';

const DashboardLayout = ({ user, userData, onLogout }) => {
  // YENİ: Biyografi state'ini burada tanımlıyoruz. Başlangıç değerini userData'dan alıyor.
  const [bio, setBio] = useState(userData?.bio || 'Biyografi bilgisi bulunamadı.');

  return (
    <div className="relative flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar onLogout={onLogout} authLevel={userData?.authLevel} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} userData={userData} onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* YENİ: Outlet'e context prop'u ile bio ve setBio'yu gönderiyoruz. */}
          {/* Bu, Profile ve Settings sayfalarının bu verilere erişmesini sağlar. */}
          <Outlet context={{ bio, setBio, userData, onLogout }} /> 
        </main>
      </div>
    </div>
  );
};

// YENİ: Alt bileşenlerin context'e kolayca erişmesi için bir custom hook
export function useSharedState() {
  return useOutletContext();
}

export default DashboardLayout;