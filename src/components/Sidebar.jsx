import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, Puzzle, UserCircle, BarChart2, Users, Settings, LogOut, 
    ChevronsLeft, ChevronsRight
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { name: 'Ana Panel', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Problemler', icon: <Puzzle size={20} />, path: '/problemler' },
    { name: 'Profil', icon: <UserCircle size={20} />, path: '/profil' },
    { name: 'Analizler', icon: <BarChart2 size={20} />, path: '/analizler' },
    { name: 'Kullanıcılar', icon: <Users size={20} />, path: '/kullanicilar' },
    { name: 'Ayarlar', icon: <Settings size={20} />, path: '/ayarlar' },
  ];

  return (
    <aside 
      className={`h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
                 flex flex-col transition-all duration-300 ease-in-out
                 ${isExpanded ? 'w-60' : 'w-20'}`}
    >
      <div className={`flex items-center p-4 h-16 border-b border-slate-200 dark:border-slate-800 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        <span className={`font-bold tracking-wider text-slate-800 dark:text-white transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          MathVerse
        </span>
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            {isExpanded ? <ChevronsLeft size={20}/> : <ChevronsRight size={20}/>}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) => `flex items-center gap-4 rounded-xl p-3 
              transition-colors duration-200
              ${isActive 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
              ${!isExpanded && 'justify-center'}`
            }
          >
            {item.icon}
            <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className={`px-2 py-4 border-t border-slate-200 dark:border-slate-800 ${!isExpanded && 'flex flex-col items-center'}`}>
        <button
          onClick={onLogout}
          className="flex items-center gap-4 w-full p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <LogOut size={20} />
          <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
            Çıkış Yap
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
