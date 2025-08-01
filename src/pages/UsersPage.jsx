import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, UserPlus, MoreVertical, Loader2 } from 'lucide-react';
import { getAllUsers } from '../firestore/users';

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

// Durum badge bileşeni
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'aktif':
      case 'active':
        return 'text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-500/20';
      case 'pasif':
      case 'inactive':
        return 'text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-500/20';
      case 'beklemede':
      case 'pending':
        return 'text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-500/20';
      default:
        return 'text-gray-800 bg-gray-100 dark:text-gray-300 dark:bg-gray-500/20';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(status)}`}>
      {status || 'Bilinmiyor'}
    </span>
  );
};

// Tarih formatlama fonksiyonu
const formatDate = (date) => {
  if (!date) return 'Bilinmiyor';
  
  try {
    if (date.seconds && date.nanoseconds !== undefined) {
      // Firestore timestamp
      const jsDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
      return jsDate.toLocaleDateString('tr-TR');
    }
    
    // Normal date objesi
    const jsDate = new Date(date);
    return isNaN(jsDate.getTime()) ? 'Bilinmiyor' : jsDate.toLocaleDateString('tr-TR');
  } catch {
    return 'Bilinmiyor';
  }
};

const UsersPage = () => {
  // State'ler
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tümü');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcıları Firestore'dan çekme
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (err) {
        console.error('Kullanıcıları çekme hatası:', err);
        setError('Kullanıcılar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtreleme mantığı
  useEffect(() => {
    let result = allUsers;

    if (selectedRole !== 'Tümü') {
      result = result.filter(u => {
        const userRole = u.authLevel === 0 ? 'Admin' : 'Kullanıcı';
        return userRole === selectedRole;
      });
    }
    if (selectedStatus !== 'Tümü') {
      result = result.filter(u => u.status === selectedStatus);
    }
    if (searchTerm.trim() !== '') {
      result = result.filter(u =>
        (u.name || u.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, selectedRole, selectedStatus, allUsers]);

  // Benzersiz rolleri ve durumları alma
  const uniqueRoles = ['Tümü', 'Admin', 'Kullanıcı'];
  const uniqueStatuses = ['Tümü', ...new Set(allUsers.map(u => u.status).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Loader2 className="animate-spin" size={20} />
          <span>Kullanıcılar yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-300">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-red-600 dark:text-red-400 hover:underline"
        >
          Sayfayı yenile
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kullanıcı Yönetimi</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Platformdaki tüm kullanıcıları görüntüle ve yönet. ({allUsers.length} kullanıcı)
          </p>
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
            options={uniqueRoles}
            selected={selectedRole}
            onSelect={setSelectedRole}
          />
          <FilterDropdown 
            label="Durum"
            options={uniqueStatuses}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-x-auto shadow-sm">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            {searchTerm || selectedRole !== 'Tümü' || selectedStatus !== 'Tümü' 
              ? 'Filtrelere uygun kullanıcı bulunamadı.' 
              : 'Henüz kullanıcı bulunmuyor.'
            }
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Kullanıcı</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden lg:table-cell">E-posta</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Rol</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Durum</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Katılım</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-t border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="p-4 flex items-center gap-4">
                    <img 
                      src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name || user.displayName || user.email}`} 
                      alt={`${user.name || user.displayName} avatar`} 
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/8.x/initials/svg?seed=${user.name || user.displayName || user.email}`;
                      }}
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {user.name || user.displayName || 'İsimsiz Kullanıcı'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 hidden lg:table-cell">
                    {user.email || 'E-posta yok'}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 hidden md:table-cell">
                    {user.authLevel === 0 ? 'Admin' : 'Kullanıcı'}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={user.status || 'Aktif'} />
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell text-sm">
                    {formatDate(user.joinedAt)}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                      <MoreVertical size={18}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersPage;