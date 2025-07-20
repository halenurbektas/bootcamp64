import { useState, useEffect } from 'react';

export const useTheme = () => {
  // 1. State'i, tarayıcının hafızasındaki (localStorage) temadan veya varsayılan olarak 'dark'tan alıyoruz.
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // 2. toggleTheme fonksiyonu, mevcut temanın tersini ayarlar.
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // 3. useEffect, tema state'i her değiştiğinde çalışır.
  useEffect(() => {
    const root = window.document.documentElement; // <html> etiketini seçer.

    // Önceki temayı temizle
    root.classList.remove('dark', 'light');
    
    // Yeni temayı ekle
    root.classList.add(theme);

    // Kullanıcının seçimini tarayıcı hafızasına kaydet.
    localStorage.setItem('theme', theme);
  }, [theme]); // Bu effect, sadece 'theme' state'i değiştiğinde tekrar çalışır.

  return { theme, toggleTheme };
};