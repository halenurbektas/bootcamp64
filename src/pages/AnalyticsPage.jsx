import React from 'react';
import { TrendingUp, Trophy, CalendarDays } from 'lucide-react';

// Örnek liderlik tablosu verileri
const leaderboardData = [
  { rank: 1, user: 'Ahmet Y.', points: 8450, avatarSeed: 'Ahmet' },
  { rank: 2, user: 'Zeynep K.', points: 7980, avatarSeed: 'Zeynep' },
  { rank: 3, user: 'Nermin', points: 7650, avatarSeed: 'Nermin', isCurrentUser: true }, // Mevcut kullanıcı
  { rank: 4, user: 'Mustafa C.', points: 7120, avatarSeed: 'Mustafa' },
  { rank: 5, user: 'Elif S.', points: 6890, avatarSeed: 'Elif' },
  { rank: 6, user: 'Buse T.', points: 6540, avatarSeed: 'Buse' },
];

const AnalyticsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Analizler ve Liderlik Tablosu</h1>
        <p className="text-slate-500 dark:text-slate-400">Genel performansını ve diğerleri arasındaki yerini gör.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Puan Gelişim Grafiği (Son 30 Gün)</h3>
            <div className="h-80 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
              <p className="text-slate-400 dark:text-slate-500">(Detaylı çizgi grafik burada olacak)</p>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-full"><TrendingUp className="text-blue-500 dark:text-blue-300" size={24}/></div>
                <div><p className="text-slate-500 dark:text-slate-400">Ortalama Puan</p><h3 className="text-2xl font-bold text-slate-800 dark:text-white">195</h3></div>
              </div>
               <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-full"><CalendarDays className="text-green-500 dark:text-green-300" size={24}/></div>
                <div><p className="text-slate-500 dark:text-slate-400">Haftalık Seri</p><h3 className="text-2xl font-bold text-slate-800 dark:text-white">5 Gün</h3></div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-yellow-500 dark:text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Liderlik Tablosu</h3>
          </div>
          <div className="space-y-4">
            {leaderboardData.map(player => (
              <div key={player.rank} className={`flex items-center gap-4 p-3 rounded-lg ${player.isCurrentUser ? 'bg-purple-100 dark:bg-purple-600/30 border border-purple-200 dark:border-purple-500' : 'bg-slate-100 dark:bg-slate-700/40'}`}>
                <span className="font-bold text-lg w-6 text-center text-slate-700 dark:text-slate-200">{player.rank}</span>
                <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${player.avatarSeed}`} alt={`${player.user} avatar`} className="w-10 h-10 rounded-full"/>
                <span className={`flex-1 font-medium ${player.isCurrentUser ? 'text-purple-800 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>{player.user}</span>
                <span className={`font-bold ${player.isCurrentUser ? 'text-purple-800 dark:text-purple-300' : 'text-purple-700 dark:text-purple-400'}`}>{player.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;