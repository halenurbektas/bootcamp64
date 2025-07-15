import React from 'react';
import { Users, BookOpenCheck, BarChart3, ArrowRight } from 'lucide-react';

// StatCard bileşeni için renkleri güncelliyoruz
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex flex-col gap-4 shadow-sm">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      {/* Sayfa Başlığı Renkleri */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Ana Panel</h1>
        <p className="text-slate-500 dark:text-slate-400">Tekrar hoş geldin, Nermin! İşte ilerleme özetin.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Toplam Kullanıcı" value="1,250" icon={<Users size={24} className="text-blue-500 dark:text-blue-300" />} color="bg-blue-100 dark:bg-blue-500/30" />
        <StatCard title="Çözülen Sorular" value="842" icon={<BookOpenCheck size={24} className="text-purple-500 dark:text-purple-300" />} color="bg-purple-100 dark:bg-purple-500/30" />
        <StatCard title="Başarı Oranı" value="82.5%" icon={<BarChart3 size={24} className="text-green-500 dark:text-green-300" />} color="bg-green-100 dark:bg-green-500/30" />
      </div>

      {/* Hızlı Aksiyonlar ve Grafik Alanı Renkleri */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Performans Grafiği</h3>
          <div className="h-64 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
            <p className="text-slate-400 dark:text-slate-500">(Grafik burada gösterilecek)</p>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Hızlı İşlemler</h3>
          <div className="flex-1 space-y-4">
             <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><span>Yeni Soru Ekle</span><ArrowRight size={20}/></a>
             <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><span>Gönderimleri İncele</span><ArrowRight size={20}/></a>
             <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><span>Kullanıcıları Yönet</span><ArrowRight size={20}/></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;