import React, { useState } from 'react';
import { User, Bell, Palette, Shield } from 'lucide-react';

// Sekmeli içeriği yönetmek için ayrı bir bileşen
const TabContent = ({ children, isActive }) => {
  return isActive ? <div>{children}</div> : null;
};


const SettingsPage = () => {
  // Hangi sekmenin aktif olduğunu tutan state
  const [activeTab, setActiveTab] = useState('profil');

  const tabs = [
    { id: 'profil', label: 'Profil', icon: <User size={18} /> },
    { id: 'bildirimler', label: 'Bildirimler', icon: <Bell size={18} /> },
    { id: 'gorunum', label: 'Görünüm', icon: <Palette size={18} /> },
    { id: 'guvenlik', label: 'Güvenlik', icon: <Shield size={18} /> },
  ];

  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-slate-400">Platform ve hesap ayarlarını buradan yönetebilirsin.</p>
      </div>
      
      <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50">
        <div className="flex flex-col md:flex-row">
            
            {/* Sol Taraf: Sekme Başlıkları */}
            <nav className="flex-shrink-0 w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-slate-700/50">
                <ul className="flex flex-row md:flex-col gap-1">
                    {tabs.map(tab => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                                    activeTab === tab.id
                                    ? 'bg-purple-600/30 text-white'
                                    : 'text-slate-300 hover:bg-slate-700/50'
                                }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sağ Taraf: Sekme İçerikleri */}
            <div className="p-6 md:p-8 flex-1">
                <TabContent isActive={activeTab === 'profil'}>
                    <h2 className="text-2xl font-bold mb-6">Profil Ayarları</h2>
                    <div className="space-y-6">
                        <div><label className="block mb-2 text-sm text-slate-400">Tam Ad</label><input type="text" defaultValue="Nermin" className="w-full md:w-2/3 bg-slate-700/50 border border-slate-600 rounded-lg p-2"/></div>
                        <div><label className="block mb-2 text-sm text-slate-400">E-posta</label><input type="gmail" defaultValue="nermin@gmail.com" className="w-full md:w-2/3 bg-slate-700/50 border border-slate-600 rounded-lg p-2" disabled/></div>
                        <div><label className="block mb-2 text-sm text-slate-400">Biyografi</label><textarea className="w-full md:w-2/3 h-24 bg-slate-700/50 border border-slate-600 rounded-lg p-2 resize-none"></textarea></div>
                         <button className="bg-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-700">Değişiklikleri Kaydet</button>
                    </div>
                </TabContent>

                <TabContent isActive={activeTab === 'bildirimler'}>
                    <h2 className="text-2xl font-bold mb-6">Bildirim Ayarları</h2>
                    <div className="space-y-4 text-slate-300">
                        <div className="flex items-center justify-between"><p>Yeni bir problem eklendiğinde e-posta gönder</p><input type="checkbox" className="w-5 h-5 toggle-checkbox"/></div>
                        <div className="flex items-center justify-between"><p>Birisi çözümüne yorum yaptığında haber ver</p><input type="checkbox" className="w-5 h-5 toggle-checkbox" defaultChecked/></div>
                        <div className="flex items-center justify-between"><p>Haftalık özet raporu gönder</p><input type="checkbox" className="w-5 h-5 toggle-checkbox"/></div>
                    </div>
                </TabContent>

                <TabContent isActive={activeTab === 'gorunum'}>
                    <h2 className="text-2xl font-bold mb-6">Görünüm Ayarları</h2>
                    <p className="text-slate-400">Tema seçenekleri burada yer alacak. (Açık/Koyu Mod)</p>
                </TabContent>

                <TabContent isActive={activeTab === 'guvenlik'}>
                    <h2 className="text-2xl font-bold mb-6">Güvenlik ve Gizlilik</h2>
                     <div className="space-y-6">
                        <div><h3 className="text-lg font-semibold">Şifre Değiştir</h3><p className="text-sm text-slate-400 mb-2">Güvenliğiniz için düzenli olarak şifrenizi değiştirin.</p><button className="bg-slate-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-600">Şifreyi Değiştir</button></div>
                        <div><h3 className="text-lg font-semibold text-red-400">Hesabı Sil</h3><p className="text-sm text-slate-400 mb-2">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p><button className="bg-red-600/80 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-600">Hesabımı Sil</button></div>
                    </div>
                </TabContent>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;