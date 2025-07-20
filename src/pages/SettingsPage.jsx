import React, { useState, useEffect } from 'react';
import { User, Bell, Palette, Shield, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js'; // Tema hook'unu import ediyoruz
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../firebase-config'; // Firebase auth import
import { updateUserData } from '../firestore/users.js';
import { useSearchParams } from 'react-router-dom';

// Bu bileşeni olduğu gibi bırakabiliriz
const TabContent = ({ children, isActive }) => {
  return isActive ? <div>{children}</div> : null;
};

const SettingsPage = ({ userData }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profil');
  const { theme, toggleTheme } = useTheme(); // Temayı değiştirmek için hook'u kullanıyoruz

  // Form verilerini takip etmek için state
  const [formData, setFormData] = useState({
    name: userData?.name ?? '',
    surname: userData?.surname ?? '',
    bio: userData?.bio ?? ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Şifre değiştirme için state'ler
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  
  // Şifre görünürlük durumları
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const tabs = [
    { id: 'profil', label: 'Profil', icon: <User size={18} /> },
    { id: 'bildirimler', label: 'Bildirimler', icon: <Bell size={18} /> },
    { id: 'gorunum', label: 'Görünüm', icon: <Palette size={18} /> },
    { id: 'guvenlik', label: 'Güvenlik', icon: <Shield size={18} /> },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.surname.trim()) {
      setMessage('Ad ve soyad alanları zorunludur.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await updateUserData(userData.uid, {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        bio: formData.bio.trim()
      });
      
      setMessage('Değişiklikler başarıyla kaydedildi!');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      setMessage('Değişiklikler kaydedilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage('Tüm alanları doldurunuz.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('Yeni şifreler eşleşmiyor.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage('');

    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('Kullanıcı oturumu bulunamadı.');
      }

      // Mevcut şifre ile yeniden kimlik doğrulama
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Şifre güncelleme
      await updatePassword(user, passwordData.newPassword);
      
      setPasswordMessage('Şifre başarıyla güncellendi!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      
      if (error.code === 'auth/wrong-password') {
        setPasswordMessage('Mevcut şifre hatalı.');
      } else if (error.code === 'auth/weak-password') {
        setPasswordMessage('Yeni şifre çok zayıf.');
      } else {
        setPasswordMessage('Şifre güncellenirken bir hata oluştu.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

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
                        {/* Ad Alanı */}
                        <div>
                            <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">
                                Ad
                            </label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full md:w-2/3 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Adınızı girin"
                            />
                        </div>

                        {/* Soyad Alanı */}
                        <div>
                            <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">
                                Soyad
                            </label>
                            <input 
                                type="text" 
                                value={formData.surname}
                                onChange={(e) => handleInputChange('surname', e.target.value)}
                                className="w-full md:w-2/3 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Soyadınızı girin"
                            />
                        </div>

                        {/* E-posta Alanı */}
                        <div>
                            <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">E-posta</label>
                            <input 
                                type="email" 
                                value={userData?.email ?? ''} 
                                className="w-full md:w-2/3 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-500 dark:text-slate-400 cursor-not-allowed" 
                                disabled
                            />
                            <p className="text-xs text-slate-400 mt-1">E-posta adresi değiştirilemez</p>
                        </div>

                        {/* Biyografi Alanı */}
                        <div>
                            <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Biyografi</label>
                            <textarea 
                                value={formData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                className="w-full md:w-2/3 h-24 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Kendiniz hakkında birkaç cümle yazın..."
                                maxLength={500}
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                {formData.bio.length}/500 karakter
                            </p>
                        </div>

                        {/* Mesaj */}
                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${
                                message.includes('başarıyla') 
                                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                            }`}>
                                {message}
                            </div>
                        )}

                        {/* Kaydet Butonu */}
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                        </button>
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
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Şifre Değiştir</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Güvenliğiniz için düzenli olarak şifrenizi değiştirin.</p>
                            
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Mevcut Şifre</label>
                                    <div className="relative">
                                        <input 
                                            type={showPasswords.current ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Mevcut şifrenizi girin"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('current')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Yeni Şifre</label>
                                    <div className="relative">
                                        <input 
                                            type={showPasswords.new ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Yeni şifrenizi girin (min. 6 karakter)"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('new')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block mb-2 text-sm text-slate-500 dark:text-slate-400">Yeni Şifre Tekrar</label>
                                    <div className="relative">
                                        <input 
                                            type={showPasswords.confirm ? "text" : "password"}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Yeni şifrenizi tekrar girin"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Şifre Mesajı */}
                                {passwordMessage && (
                                    <div className={`p-3 rounded-lg text-sm ${
                                        passwordMessage.includes('başarıyla') 
                                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                                            : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                    }`}>
                                        {passwordMessage}
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handlePasswordChange}
                                    disabled={passwordLoading}
                                    className="bg-slate-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {passwordLoading ? 'Şifre Güncelleniyor...' : 'Şifreyi Değiştir'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-lg">
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Hesabı Sil</h3>
                            <p className="text-sm text-slate-500 dark:text-red-300 mb-2">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
                            <button className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Hesabımı Sil</button>
                        </div>
                    </div>
                </TabContent>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;