import React from 'react';
import { Search, ChevronDown, UserPlus, MoreVertical } from 'lucide-react';

// Örnek kullanıcı verileri
const users = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet.y@example.com', role: 'Admin', status: 'Aktif', avatarSeed: 'Ahmet' },
  { id: 2, name: 'Zeynep Kaya', email: 'zeynep.k@example.com', role: 'Kullanıcı', status: 'Aktif', avatarSeed: 'Zeynep' },
  { id: 3, name: 'Nermin', email: 'nermin@gmail.com', role: 'Admin', status: 'Aktif', avatarSeed: 'Nermin' },
  { id: 4, name: 'Mustafa Can', email: 'mustafa.c@example.com', role: 'Kullanıcı', status: 'Pasif', avatarSeed: 'Mustafa' },
  { id: 5, name: 'Elif Sönmez', email: 'elif.s@example.com', role: 'Kullanıcı', status: 'Beklemede', avatarSeed: 'Elif' },
  { id: 6, name: 'Buse Taş', email: 'buse.t@example.com', role: 'Kullanıcı', status: 'Aktif', avatarSeed: 'Buse' },
];

const UsersPage = () => {
  return (
    <div>
      {/* Sayfa Başlığı ve Butonlar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
          <p className="text-slate-400">Platformdaki tüm kullanıcıları görüntüle ve yönet.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors">
            <UserPlus size={18}/>
            <span>Yeni Kullanıcı Ekle</span>
          </button>
        </div>
      </div>

      {/* Filtreleme ve Arama */}
       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="İsim veya e-posta ile ara..." 
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 hover:bg-slate-700/50 transition-colors">
                <span>Rol</span>
                <ChevronDown size={16} />
              </button>
               <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 hover:bg-slate-700/50 transition-colors">
                <span>Durum</span>
                <ChevronDown size={16} />
              </button>
          </div>
       </div>


      {/* Kullanıcı Listesi Tablosu */}
      <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-semibold">Kullanıcı</th>
              <th className="p-4 font-semibold hidden lg:table-cell">E-posta</th>
              <th className="p-4 font-semibold hidden md:table-cell">Rol</th>
              <th className="p-4 font-semibold">Durum</th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-4 flex items-center gap-4">
                   <img 
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.avatarSeed}`} 
                    alt={`${user.name} avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="p-4 text-slate-400 hidden lg:table-cell">{user.email}</td>
                <td className="p-4 hidden md:table-cell">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Aktif' ? 'text-green-300 bg-green-500/20' :
                    user.status === 'Pasif' ? 'text-red-300 bg-red-500/20' : 'text-yellow-300 bg-yellow-500/20'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                    <button className="p-2 rounded-md hover:bg-slate-700">
                        <MoreVertical size={18}/>
                    </button>
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