// src/pages/BadgesPage.jsx

import React from 'react';
import { badges } from '../data/badges.jsx'; // Az önce oluşturduğumuz rozet verilerini import ediyoruz

const BadgesPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kazanılabilir Rozetler</h1>
        <p className="text-slate-500 dark:text-slate-400">Hedeflerini belirle ve tüm rozetleri topla!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm text-center flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${badge.color} ${badge.darkColor}`}>
              {badge.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{badge.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex-1">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesPage;