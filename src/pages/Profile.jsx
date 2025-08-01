// src/pages/Profile.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, Star, Pencil, Settings, Lock, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';
import { useSharedState } from '../components/dashboard/DashboardLayout.jsx'; // Kendi hook'umuzu import ediyoruz

// Bu alt bileşen, rozetleri oluşturur
const Badge = ({ icon, label, color, darkColor }) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg ${color} ${darkColor}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

// Bu alt bileşen, ayar butonlarını oluşturur
const ActionButton = ({ icon, label, isDestructive = false }) => (
  <div className={`flex items-center w-full text-left gap-4 p-3 rounded-xl 
                   ${isDestructive 
                       ? 'text-red-600 dark:text-red-400 group-hover:bg-red-50 dark:group-hover:bg-red-500/10'
                       : 'text-slate-600 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-700/50'
                   } 
                   transition-colors duration-200`}>
    {icon}
    <span>{label}</span>
  </div>
);


const Profile = () => {
  // Paylaşılan state'leri ve fonksiyonları DashboardLayout'tan alıyoruz
  const { userData, onLogout } = useSharedState(); 
  
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  // Eğer userData backend'den henüz gelmediyse bir yükleniyor ekranı gösteriyoruz
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Kullanıcı bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  // Örnek rozet verileri
  const userBadges = [
    { label: 'Usta Çözücü', icon: <Award size={18} />, color: 'bg-yellow-100 text-yellow-800', darkColor: 'dark:bg-yellow-500/20 dark:text-yellow-300' },
    { label: 'Doğruluk Şampiyonu', icon: <ShieldCheck size={18} />, color: 'bg-green-100 text-green-800', darkColor: 'dark:bg-green-500/20 dark:text-green-300' },
    { label: 'Haftanın Yıldızı', icon: <Star size={18} />, color: 'bg-purple-100 text-purple-800', darkColor: 'dark:bg-purple-500/20 dark:text-purple-300' },
  ];

  const userName = userData.displayName || userData.email?.split('@')[0] || 'Kullanıcı';
  const avatarSeed = userData.displayName || userData.email || 'User';
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kullanıcı Profili</h1>
        <p className="text-slate-500 dark:text-slate-400">Hesap bilgilerini ve ilerlemeni buradan yönetebilirsin.</p>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800/60 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-700/50 shadow-sm">
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
          <div className="relative shrink-0">
            <img 
              src={userData.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}`}
              alt="Kullanıcı Avatarı"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
            />
            <button className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
              <Pencil size={16} className="text-white"/>
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{userName}</h2>
            <p className="text-slate-500 dark:text-slate-400">{userData.email}</p>
            {userData.emailVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20 rounded-full mt-2">
                <ShieldCheck size={12} />
                E-posta Doğrulandı
              </span>
            )}
            <div className="flex items-center justify-center md:justify-start flex-wrap gap-4 mt-4">
              {userBadges.map(badge => <Badge key={badge.label} {...badge} />)}
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700/50 my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Hakkında</h3>
            <p className="text-slate-600 dark:text-slate-300">{userData.bio}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Hesap Bilgileri</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Yetki Seviyesi</p>
                <p className="text-slate-700 dark:text-slate-300">{userData.authLevel === 0 ? 'Admin' : 'Kullanıcı'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Hesap Oluşturma</p>
                <p className="text-slate-700 dark:text-slate-300">{userData.joinedAt? new Date(userData.joinedAt.seconds * 1000 + userData.joinedAt.nanoseconds / 1000000).toLocaleDateString('tr-TR'): 'Bilinmiyor'}</p>
              </div>
              {/* <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Son Giriş</p>
                <p className="text-slate-700 dark:text-slate-300">{userData.metadata?.lastSignInTime ? new Date(userData.metadata.lastSignInTime).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</p>
              </div> */}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Ayarlar ve İşlemler</h3>
            <div className="space-y-2">
                <button onClick={() => navigate('/ayarlar')} className="w-full group"><ActionButton icon={<Settings size={20} className="text-slate-500 dark:text-slate-400"/>} label="Profili Düzenle"/></button>
                <button onClick={() => navigate("/ayarlar?tab=guvenlik")} className="w-full group"><ActionButton icon={<Lock size={20} className="text-slate-500 dark:text-slate-400"/>} label="Şifre Değiştir"/></button>
                <button onClick={toggleTheme} className="w-full group"><ActionButton icon={<Sun size={20} className="text-slate-500 dark:text-slate-400"/>} label="Tema Değiştir"/></button>
                <button onClick={() => { onLogout(); navigate('/login'); }} className="w-full group"><ActionButton icon={<LogOut size={20} />} label="Çıkış Yap" isDestructive={true} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;