import React, { useState } from 'react';
import { User, Bell, Palette, Shield } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js'; // Tema hook'unu import ediyoruz

// Bu bileşeni olduğu gibi bırakabiliriz
const TabContent = ({ children, isActive }) => {
  return isActive ? <div>{children}</div> : null;
};


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const { theme, toggleTheme } = useTheme(); // Temayı değiştirmek için hook'u kullanıyoruz

  const tabs = [
    { id: 'profil', label: 'Profil', icon: <User size={18} /> },
    { id: 'bildirimler', label: 'Bildirimler', icon: <Bell size={18} /> },
    { id: 'gorunum', label: 'Görünüm', icon: <Palette size={18} /> },
    { id: 'guvenlik', label: 'Güvenlik', icon: <Shield size={18} /> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Ayarlar</h1>
        <p className="text-slate-500 dark:text-slate-400">Platform ve hesap ayarlarını buradan yönetebilirsin.</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div className="flex flex-col md:flex-row">
            <nav className="flex-shrink-0 w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700/50">
                <ul className="flex flex-row md:flex-col gap-1">
                    {tabs.map(tab => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                                    activeTab === tab.id
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-white'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6 md:p-8 flex-1 text-slate-800 dark:text-white">
                <TabContent isActive={activeTab === 'profil'}>
                    <h2 className="text-2xl font-bold mb-6">Profil Ayarları</h2>
                    <div className="space-y-6">
                        <div><label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Tam Ad</label><input type="text" defaultValue="Nermin" className="w-full md:w-2/3 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2"/></div>
                        <div><label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">E-posta</label><input type="email" defaultValue="nermin@email.com" className="w-full md:w-2/3 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-500 dark:text-slate-400" disabled/></div>
                        <div><label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Biyografi</label><textarea className="w-full md:w-2/3 h-24 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 resize-none"></textarea></div>
                         <button className="bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white hover:bg-purple-700">Değişiklikleri Kaydet</button>
                    </div>
                </TabContent>

                <TabContent isActive={activeTab === 'bildirimler'}>
                    <h2 className="text-2xl font-bold mb-6">Bildirim Ayarları</h2>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"><p>Yeni bir problem eklendiğinde e-posta gönder</p><input type="checkbox" className="toggle-checkbox"/></div>
                        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"><p>Birisi çözümüne yorum yaptığında haber ver</p><input type="checkbox" className="toggle-checkbox" defaultChecked/></div>
                        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"><p>Haftalık özet raporu gönder</p><input type="checkbox" className="toggle-checkbox"/></div>
                    </div>
                </TabContent>

                <TabContent isActive={activeTab === 'gorunum'}>
                    <h2 className="text-2xl font-bold mb-6">Görünüm Ayarları</h2>
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Arayüz Teması</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Uygulamanın genel renk şemasını değiştirin.</p>
                        </div>
                        <button onClick={toggleTheme} className="bg-purple-600 px-5 py-2 rounded-lg text-sm font-semibold text-white hover:bg-purple-700">
                          {theme === 'dark' ? 'Açık Mod\'a Geç' : 'Koyu Mod\'a Geç'}
                        </button>
                      </div>
                    </div>
                </TabContent>

                <TabContent isActive={activeTab === 'guvenlik'}>
                    <h2 className="text-2xl font-bold mb-6">Güvenlik ve Gizlilik</h2>
                     <div className="space-y-6">
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"><h3 className="text-lg font-semibold">Şifre Değiştir</h3><p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Güvenliğiniz için düzenli olarak şifrenizi değiştirin.</p><button className="bg-slate-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700">Şifreyi Değiştir</button></div>
                        <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-lg"><h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Hesabı Sil</h3><p className="text-sm text-slate-500 dark:text-red-300 mb-2">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p><button className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Hesabımı Sil</button></div>
                    </div>
                </TabContent>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;