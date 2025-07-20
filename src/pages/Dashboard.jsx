import React from 'react';
import { useState, useEffect } from "react";
import { Users, BookOpenCheck, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // import eklendi
import { getUserCount } from "../firestore/users.js";

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex flex-col gap-4 shadow-sm`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
    </div>
  </div>
);

const Dashboard = ({ userData }) => {
  const [userCount, setUserCount] = useState(null);
  const navigate = useNavigate();  // navigate hook

  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };
    fetchUserCount();
  }, []);

  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Ana Panel</h1>
        <p className="text-slate-500 dark:text-slate-400">Tekrar hoş geldin, {userData?.name}! İşte ilerleme özetin.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Toplam Kullanıcı" value={userCount ?? "..."} icon={<Users size={24} className="text-blue-500 dark:text-blue-300" />} color="bg-blue-100 dark:bg-blue-500/30" />
        <StatCard title="Çözülen Sorular" value={userData?.solvedProblems?.length || 0} icon={<BookOpenCheck size={24} className="text-purple-500 dark:text-purple-300" />} color="bg-purple-100 dark:bg-purple-500/30" />
        <StatCard title="Başarı Oranı" value="0%" icon={<BarChart3 size={24} className="text-green-500 dark:text-green-300" />} color="bg-green-100 dark:bg-green-500/30" />
      </div>

      {/* Hızlı İşlemler ve Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Performans Grafiği</h3>
          <div className="h-64 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
            <p className="text-slate-400 dark:text-slate-500">(Grafik burada gösterilecek)</p>
          </div>
        </div>

        {userData?.authLevel === 0 && (
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Hızlı İşlemler</h3>
            <div className="flex-1 space-y-4">
              {/* Burayı <a> yerine <button> yaptık ve navigate ile yönlendirdik */}
              <button
                onClick={() => navigate('/add-problem')}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span>Yeni Soru Ekle</span>
                <ArrowRight size={20} />
              </button>
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span>Gönderimleri İncele</span><ArrowRight size={20}/>
              </a>
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span>Kullanıcıları Yönet</span><ArrowRight size={20}/>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
