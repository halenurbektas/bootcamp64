// src/pages/Profile.jsx (TAM VE GÜNCEL HALİ)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, Star, Pencil, Settings, Lock, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

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
  // Sayfa yönlendirmesi ve tema değiştirme için hook'larımızı çağırıyoruz
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  
  // Örnek rozet verileri
  const userBadges = [
    { label: 'Usta Çözücü', icon: <Award size={18} />, color: 'bg-yellow-100 text-yellow-800', darkColor: 'dark:bg-yellow-500/20 dark:text-yellow-300' },
    { label: 'Doğruluk Şampiyonu', icon: <ShieldCheck size={18} />, color: 'bg-green-100 text-green-800', darkColor: 'dark:bg-green-500/20 dark:text-green-300' },
    { label: 'Haftanın Yıldızı', icon: <Star size={18} />, color: 'bg-purple-100 text-purple-800', darkColor: 'dark:bg-purple-500/20 dark:text-purple-300' },
  ];
  
  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kullanıcı Profili</h1>
        <p className="text-slate-500 dark:text-slate-400">Hesap bilgilerini ve ilerlemeni buradan yönetebilirsin.</p>
      </div>

      {/* Profil Kartı */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800/60 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-700/50 shadow-sm">
        
        {/* Üst Kısım: Avatar ve Temel Bilgiler */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
          <div className="relative shrink-0">
            <img 
              src="https://api.dicebear.com/8.x/initials/svg?seed=Nermin" 
              alt="Kullanıcı Avatarı"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
            />
            <button className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
              <Pencil size={16} className="text-white"/>
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Nermin</h2>
            <p className="text-slate-500 dark:text-slate-400">nermin@gmail.com</p>
            <div className="flex items-center justify-center md:justify-start flex-wrap gap-4 mt-4">
              {userBadges.map(badge => <Badge key={badge.label} {...badge} />)}
            </div>
          </div>
        </div>

        {/* Ayırıcı Çizgi */}
        <hr className="border-slate-200 dark:border-slate-700/50 my-8" />
        
        {/* Ayarlar ve Diğer Bölümler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Hakkında</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Matematiği ve problem çözmeyi seven bir yazılım geliştirici. Boş zamanlarımda platformdaki zorlu sorularla uğraşmayı seviyorum!
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Ayarlar ve İşlemler</h3>
            <div className="space-y-2">
                {/* Her bir işlem artık bir buton ve tıklandığında ilgili sayfaya yönlendiriyor */}
                <button onClick={() => navigate('/ayarlar')} className="w-full group">
                    <ActionButton icon={<Settings size={20} className="text-slate-500 dark:text-slate-400"/>} label="Profili Düzenle"/>
                </button>
                <button onClick={() => navigate('/ayarlar')} className="w-full group">
                    <ActionButton icon={<Lock size={20} className="text-slate-500 dark:text-slate-400"/>} label="Şifre Değiştir"/>
                </button>
                <button onClick={toggleTheme} className="w-full group">
                    <ActionButton icon={<Sun size={20} className="text-slate-500 dark:text-slate-400"/>} label="Tema Değiştir"/>
                </button>
                <button onClick={() => navigate('/login')} className="w-full group">
                    <ActionButton icon={<LogOut size={20} />} label="Çıkış Yap" isDestructive={true}/>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;