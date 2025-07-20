import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, UserCircle, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = ({ setSidebarOpen, userData, onLogout }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        
        {/* Mobil Menü Açma Butonu (Sadece küçük ekranlarda görünür) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }} 
          className="md:hidden text-slate-800 dark:text-white"
        >
          <Menu size={24} />
        </button>

        {/* Masaüstü için boş bir div (justify-between'in doğru çalışması için) */}
        <div className="hidden md:block"></div>

        {/* Sağ Taraftaki Tüm İkonlar (Grup) */}
        <div className="flex items-center gap-4">
          
          {/* Tema Değiştirme Butonu */}
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Bildirimler Butonu */}
          <button className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
            <Bell size={20} />
          </button>
          
          {/* Profil Menüsü Kapsayıcısı */}
          <div className="relative" ref={profileMenuRef}>
            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="w-10 h-10">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                userData?.name && userData?.surname
                  ? `${userData.name} ${userData.surname}`
                  : 'Kullanıcı'
              )}`}
              alt="Kullanıcı Avatarı"
              className="w-full h-full rounded-full border-2 border-purple-500 object-cover"
            />
            </button>
            
            {/* Açılır Profil Menüsü */}
            {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-white overflow-hidden animate-fade-in-down">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                        <p className="font-bold">{(userData.name || 'Kullanıcı') + ' ' + (userData.surname || '')}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Puan: {userData.point}</p>
                    </div>
                    <nav className="p-2">
                        <Link to="/profil" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"><UserCircle size={18}/> Profilim</Link>
                        <Link to="/ayarlar" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"><Settings size={18}/> Ayarlar</Link>
                        <hr className="border-slate-200 dark:border-slate-700/50 my-2" />
                        <button onClick={() => {onLogout(); setProfileMenuOpen(false);}} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-red-500 dark:text-red-400 w-full text-left"><LogOut size={18} /> Çıkış Yap</button>
                    </nav>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;