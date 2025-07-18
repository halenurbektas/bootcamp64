import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const DashboardLayout = ({ user, userData, onLogout }) => {
  return (
    <div className="relative flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar user={user} userData={userData} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} userData={userData} onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
