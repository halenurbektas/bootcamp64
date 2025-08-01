// src/data/badges.js

import React from 'react';
import { Award, ShieldCheck, Star, Calendar, Zap, Target } from 'lucide-react';

export const badges = [
  { 
    name: 'Acemi Matematikçi', 
    description: 'İlk problemini başarıyla çöz.', 
    icon: <Award size={32} />,
    color: 'bg-gray-100 text-gray-800', 
    darkColor: 'dark:bg-gray-700 dark:text-gray-300'
  },
  { 
    name: 'Usta Çözücü', 
    description: 'Toplamda 5000 puana ulaş.', 
    icon: <Award size={32} className="text-yellow-500"/>,
    color: 'bg-yellow-100 text-yellow-800',
    darkColor: 'dark:bg-yellow-500/20 dark:text-yellow-300'
  },
  { 
    name: 'Doğruluk Şampiyonu', 
    description: 'Arka arkaya 10 problemi hatasız çöz.', 
    icon: <ShieldCheck size={32} className="text-green-500"/>,
    color: 'bg-green-100 text-green-800',
    darkColor: 'dark:bg-green-500/20 dark:text-green-300'
  },
  { 
    name: 'Haftanın Yıldızı', 
    description: 'Haftalık liderlik tablosunda ilk 3\'e gir.', 
    icon: <Star size={32} className="text-purple-500"/>,
    color: 'bg-purple-100 text-purple-800',
    darkColor: 'dark:bg-purple-500/20 dark:text-purple-300'
  },
  {
    name: 'Azimli Katılımcı',
    description: 'Platforma 7 gün üst üste giriş yap.',
    icon: <Calendar size={32} className="text-blue-500"/>,
    color: 'bg-blue-100 text-blue-800',
    darkColor: 'dark:bg-blue-500/20 dark:text-blue-300'
  },
  {
    name: 'Hız Tutkunu',
    description: 'Bir "Zor" problemi 10 dakikanın altında çöz.',
    icon: <Zap size={32} className="text-orange-500"/>,
    color: 'bg-orange-100 text-orange-800',
    darkColor: 'dark:bg-orange-500/20 dark:text-orange-300'
  },
  {
    name: 'Geometri Virtüözü',
    description: 'Geometri kategorisindeki tüm problemleri tamamla.',
    icon: <Target size={32} className="text-red-500"/>,
    color: 'bg-red-100 text-red-800',
    darkColor: 'dark:bg-red-500/20 dark:text-red-300'
  }
];