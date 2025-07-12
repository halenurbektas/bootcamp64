import React from 'react';
import { Award, ShieldCheck, Star, Pencil, Settings, Lock, Sun, LogOut } from 'lucide-react';

// Tekrar kullanılabilir rozet bileşeni
const Badge = ({ icon, label, color }) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg ${color}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

// Tekrar kullanılabilir ayar/işlem butonu
const ActionButton = ({ icon, label }) => (
    <button className="flex items-center w-full text-left gap-4 p-3 rounded-xl hover:bg-slate-700/50 transition-colors duration-200">
        {icon}
        <span>{label}</span>
    </button>
);


const Profile = () => {
  // Örnek rozet verileri
  const userBadges = [
    { label: 'Usta Çözücü', icon: <Award size={18} />, color: 'bg-yellow-500/20 text-yellow-300' },
    { label: 'Doğruluk Şampiyonu', icon: <ShieldCheck size={18} />, color: 'bg-green-500/20 text-green-300' },
    { label: 'Haftanın Yıldızı', icon: <Star size={18} />, color: 'bg-purple-500/20 text-purple-300' },
  ];
  
  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kullanıcı Profili</h1>
        <p className="text-slate-400">Hesap bilgilerini ve ilerlemeni buradan yönetebilirsin.</p>
      </div>

      {/* Profil Kartı */}
      <div className="w-full max-w-4xl mx-auto bg-slate-800/60 rounded-3xl p-6 md:p-10 border border-slate-700/50">
        {/* Üst Kısım: Avatar ve Temel Bilgiler */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
          <div className="relative shrink-0">
            <img 
              src="https://api.dicebear.com/8.x/initials/svg?seed=Nermin" 
              alt="Kullanıcı Avatarı"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-700"
            />
            <button className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
              <Pencil size={16} className="text-white"/>
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">Nermin</h2>
            <p className="text-slate-400">nermin@gmail.com</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              {userBadges.map(badge => <Badge key={badge.label} {...badge} />)}
            </div>
          </div>
        </div>

        {/* Ayırıcı Çizgi */}
        <hr className="border-slate-700/50 my-8" />
        
        {/* Ayarlar ve Diğer Bölümler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hakkında Bölümü */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hakkında</h3>
            <p className="text-slate-300">
              Matematiği ve problem çözmeyi seven bir yazılım geliştirici. Boş zamanlarımda platformdaki zorlu sorularla uğraşmayı seviyorum!
            </p>
          </div>

          {/* Ayarlar ve İşlemler Bölümü */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ayarlar ve İşlemler</h3>
            <div className="space-y-2">
                <ActionButton icon={<Settings size={20} className="text-slate-400"/>} label="Profili Düzenle"/>
                <ActionButton icon={<Lock size={20} className="text-slate-400"/>} label="Şifre Değiştir"/>
                <ActionButton icon={<Sun size={20} className="text-slate-400"/>} label="Tema Değiştir"/>
                <ActionButton icon={<LogOut size={20} className="text-red-500"/>} label="Çıkış Yap"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;