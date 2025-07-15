// src/pages/UsersPage.jsx (TAM VE FİLTRELER EKLENMİŞ HALİ)

import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, UserPlus, MoreVertical } from 'lucide-react';

// Örnek kullanıcı verilerini ayrı bir değişkene alıyoruz
const allUsers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet.y@example.com', role: 'Admin', status: 'Aktif', avatarSeed: 'Ahmet' },
  { id: 2, name: 'Zeynep Kaya', email: 'zeynep.k@example.com', role: 'Kullanıcı', status: 'Aktif', avatarSeed: 'Zeynep' },
  { id: 3, name: 'Nermin', email: 'nermin@gmail.com', role: 'Admin', status: 'Aktif', avatarSeed: 'Nermin' },
  { id: 4, name: 'Mustafa Can', email: 'mustafa.c@example.com', role: 'Kullanıcı', status: 'Pasif', avatarSeed: 'Mustafa' },
  { id: 5, name: 'Elif Sönmez', email: 'elif.s@example.com', role: 'Kullanıcı', status: 'Beklemede', avatarSeed: 'Elif' },
  { id: 6, name: 'Buse Taş', email: 'buse.t@example.com', role: 'Kullanıcı', status: 'Aktif', avatarSeed: 'Buse' },
];

// Tekrar kullanılabilir açılır menü bileşeni
const FilterDropdown = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex-1 md:flex-none w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span>{selected === 'Tümü' ? label : selected}</span>
        <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-10 animate-fade-in-down">
          {options.map(option => (
            <button 
              key={option}
              onClick={() => { onSelect(option); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const UsersPage = () => {
  // State'ler
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tümü');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');

  // Filtreleme mantığı
  useEffect(() => {
    let result = allUsers;

    if (selectedRole !== 'Tümü') {
      result = result.filter(u => u.role === selectedRole);
    }
    if (selectedStatus !== 'Tümü') {
      result = result.filter(u => u.status === selectedStatus);
    }
    if (searchTerm.trim() !== '') {
      result = result.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, selectedRole, selectedStatus]);


  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kullanıcı Yönetimi</h1>
          <p className="text-slate-500 dark:text-slate-400">Platformdaki tüm kullanıcıları görüntüle ve yönet.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors">
            <UserPlus size={18}/>
            <span>Yeni Kullanıcı Ekle</span>
          </button>
        </div>
      </div>

       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="İsim veya e-posta ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <FilterDropdown 
                label="Rol"
                options={['Tümü', 'Admin', 'Kullanıcı']}
                selected={selectedRole}
                onSelect={setSelectedRole}
             />
             <FilterDropdown 
                label="Durum"
                options={['Tümü', 'Aktif', 'Pasif', 'Beklemede']}
                selected={selectedStatus}
                onSelect={setSelectedStatus}
             />
          </div>
       </div>

      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-x-auto shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Kullanıcı</th>
              <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden lg:table-cell">E-posta</th>
              <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Rol</th>
              <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Durum</th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="p-4 flex items-center gap-4">
                   <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.avatarSeed}`} alt={`${user.name} avatar`} className="w-10 h-10 rounded-full"/>
                  <span className="font-medium text-slate-800 dark:text-slate-100">{user.name}</span>
                </td>
                <td className="p-4 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{user.email}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300 hidden md:table-cell">{user.role}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ user.status === 'Aktif' ? 'text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-500/20' : user.status === 'Pasif' ? 'text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-500/20' : 'text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-500/20' }`}>{user.status}</span>
                </td>
                <td className="p-4 text-right">
                    <button className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"><MoreVertical size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;