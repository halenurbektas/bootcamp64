import { Link } from 'react-router-dom';
import React from 'react';
import { LayoutDashboard, BarChart2, Users, Settings, LogOut, X, UserCircle, Puzzle } from 'lucide-react'; // UserCircle ikonunu ekledik

const Sidebar = ({ isOpen, setIsOpen }) => {
  // DEĞİŞİKLİK: Menüye "Profil" eklendi ve `path`'ler güncellendi
  const menuItems = [
    { name: 'Ana Panel', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Problemler', icon: <Puzzle size={20} />, path: '/problemler' },
    { name: 'Profil', icon: <UserCircle size={20} />, path: '/profil' }, // YENİ PROFİL LİNKİ
    { name: 'Analizler', icon: <BarChart2 size={20} />, path: '/analizler' }, // Gelecekteki sayfa
    { name: 'Kullanıcılar', icon: <Users size={20} />, path: '/kullanicilar' }, // Gelecekteki sayfa
    { name: 'Ayarlar', icon: <Settings size={20} />, path: '/ayarlar' }, // Gelecekteki sayfa
  ];

  return (
    <>
      {/* ... (dosyanın geri kalanı aynı) ... */}
      <aside /* ... */ >
        <div /* ... */ >
            {/* Logo linkini de Link bileşeni yapalım */}
            <Link to="/" className="text-xl font-bold tracking-wider">MathVerse</Link>
            <button /* ... */ >
                <X size={24} />
            </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            // DEĞİŞİKLİK: <a> etiketi yerine <Link> kullanıyoruz
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-700/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)} // Mobil menüyü kapatmak için
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          {/* DEĞİŞİKLİK: Çıkış linki /login sayfasına yönlendirsin */}
          <Link to="/login" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-700/50 transition-colors duration-200">
            <LogOut size={20} />
            <span className="font-medium">Çıkış Yap</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;