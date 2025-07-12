import React from 'react';
import { Menu, Bell, Sun } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-10 w-full h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <Menu size={24} className="text-white" />
        </button>
        <div className="hidden md:block"></div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
            <Sun size={20} className="text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
            <Bell size={20} className="text-white" />
          </button>
          <div className="w-10 h-10">
            <img 
              src="https://api.dicebear.com/8.x/initials/svg?seed=Nermin" 
              // ÇEVİRİ
              alt="Kullanıcı Avatarı"
              className="w-full h-full rounded-full border-2 border-purple-500 object-cover transform hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;