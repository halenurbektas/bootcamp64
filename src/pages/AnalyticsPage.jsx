import React, { useState, useEffect } from 'react';
import { TrendingUp, Trophy, CalendarDays } from 'lucide-react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { getAllUsers } from '../firestore/users';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const AnalyticsPage = ({ userData }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointDistribution, setPointDistribution] = useState([]);
  const [averagePoints, setAveragePoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentUserPoints = userData?.pointHistory?.[userData.pointHistory.length - 1] || 0;

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      const users = await getAllUsers();

      const sortedUsers = users.sort((a, b) => {
        const pointsA = a.pointHistory?.[a.pointHistory.length - 1] || 0;
        const pointsB = b.pointHistory?.[b.pointHistory.length - 1] || 0;
        return pointsB - pointsA;
      });
      setLeaderboard(sortedUsers);

      const allPoints = users.map(user => user.pointHistory?.[user.pointHistory.length - 1] || 0);
      const totalPoints = allPoints.reduce((sum, current) => sum + current, 0);
      const userCount = users.length;
      const calculatedAverage = userCount > 0 ? (totalPoints / userCount).toFixed(0) : 0;
      setAveragePoints(calculatedAverage);

      const buckets = {
        '0-200': 0,
        '200-400': 0,
        '400-600': 0,
        '600-800': 0,
        '800-1000': 0,
        '1000+': 0,
      };

      users.forEach(user => {
        const points = user.pointHistory?.[user.pointHistory.length - 1] || 0;
        if (points < 200) buckets['0-200']++;
        else if (points < 400) buckets['200-400']++;
        else if (points < 600) buckets['400-600']++;
        else if (points < 800) buckets['600-800']++;
        else if (points < 1000) buckets['800-1000']++;
        else buckets['1000+']++;
      });

      const distributionData = Object.entries(buckets)
        .filter(([_, value]) => value > 0)
        .map(([name, value]) => ({ name, value }));

      setPointDistribution(distributionData);
      setLoading(false);
    };

    fetchAnalyticsData();
  }, [userData]);

  const getRankClasses = (index, isCurrent) => {
    let base = isCurrent ? 'ring-2 ring-purple-400 dark:ring-purple-500' : '';
    switch (index) {
      case 0:
        return `${base} bg-yellow-100 dark:bg-yellow-700/40 border-yellow-400 shadow-lg shadow-yellow-300/30 animate-pulse`;
      case 1:
        return `${base} bg-gray-200 dark:bg-gray-600/30 border-gray-400 shadow-lg shadow-gray-300/30 animate-pulse`;
      case 2:
        return `${base} bg-orange-200 dark:bg-orange-700/40 border-orange-500 shadow-lg shadow-orange-400/30 animate-pulse`;
      default:
        return `${base} bg-slate-100 dark:bg-slate-700/40 border-transparent`;
    }
  };

  const getRankTextClasses = (index) => {
    switch (index) {
      case 0:
        return 'text-yellow-800 dark:text-yellow-200 font-extrabold';
      case 1:
        return 'text-gray-800 dark:text-gray-200 font-extrabold';
      case 2:
        return 'text-orange-800 dark:text-orange-200 font-extrabold';
      default:
        return 'text-slate-700 dark:text-slate-200';
    }
  };

  const rankIcons = ['👑 🥇', '🥈', '🥉'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Analizler ve Liderlik Tablosu</h1>
        <p className="text-slate-500 dark:text-slate-400">Genel performansını ve diğerleri arasındaki yerini gör.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Topluluk Puan Dağılımı</h3>
            <div className="h-80">
              {loading ? (
                <div className="h-full bg-slate-100 dark:bg-slate-700/30 rounded-xl flex flex-col items-center justify-center">
                  <p className="text-slate-400 dark:text-slate-500">Grafik yükleniyor...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #475569', borderRadius: '8px' }} />
                    <Legend />
                    <Pie
                      data={pointDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {pointDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <TrendingUp className="text-blue-500 dark:text-blue-300" size={24} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Ortalama Puan</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{averagePoints}</h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <CalendarDays className="text-green-500 dark:text-green-300" size={24} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Toplam Puan</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{currentUserPoints}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-yellow-500 dark:text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Liderlik Tablosu</h3>
          </div>
          <div className="space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => {
                const isCurrent = userData.uid === player.uid;
                return (
                  <div
                    key={player.uid}
                    className={`
                      flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-300
                      ${getRankClasses(index, isCurrent)}
                    `}
                  >
                    <span className={`font-bold text-lg w-10 text-center ${getRankTextClasses(index)}`}>
                      {rankIcons[index] || index + 1}
                    </span>
                    <img
                      src={`https://api.dicebear.com/8.x/initials/svg?seed=${player.name}`}
                      alt={`${player.name} avatar`}
                      className={`w-10 h-10 rounded-full shadow-sm ${index < 3 ? 'drop-shadow' : ''}`}
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${getRankTextClasses(index)}`}>
                        {player.name} {isCurrent && <span className="ml-1 text-sm bg-purple-200 text-purple-700 dark:bg-purple-600 dark:text-white px-2 py-0.5 rounded-full">Sen</span>}
                      </div>
                    </div>
                    <span className={`font-bold ${getRankTextClasses(index)}`}>
                      {player.pointHistory?.[player.pointHistory.length - 1] || 0}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-center">Liderlik tablosu yükleniyor...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
