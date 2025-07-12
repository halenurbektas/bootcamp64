import React from 'react';
import { Search, ChevronDown, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

// Örnek problem verileri
const problems = [
  { id: 1, title: 'İkinci Dereceden Denklemin Kökleri', topic: 'Cebir', difficulty: 'Orta', points: 150, solved: true },
  { id: 2, title: 'Pisagor Teoremi ile Alan Hesabı', topic: 'Geometri', difficulty: 'Kolay', points: 75, solved: false },
  { id: 3, title: 'Trigonometrik Fonksiyonların Limiti', topic: 'Kalkülüs', difficulty: 'Zor', points: 300, solved: false },
  { id: 4, title: 'Olasılık ve Zarlar', topic: 'Olasılık', difficulty: 'Orta', points: 120, solved: false },
  { id: 5, title: 'Matris Determinantı', topic: 'Lineer Cebir', difficulty: 'Zor', points: 250, solved: true },
  { id: 6, title: 'Üçgenin Alanı ve Heron Formülü', topic: 'Geometri', difficulty: 'Orta', points: 180, solved: false },
];

const ProblemsListPage = () => {
  return (
    <div>
      {/* Sayfa Başlığı ve Filtreler */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Matematik Problemleri</h1>
          <p className="text-slate-400">Yeteneklerini test et ve liderlik tablosunda yüksel!</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Problem ara..." 
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 hover:bg-slate-700/50 transition-colors">
            <span>Zorluk</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Problem Listesi Tablosu */}
      <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-semibold">Durum</th>
              <th className="p-4 font-semibold">Problem Başlığı</th>
              <th className="p-4 font-semibold hidden md:table-cell">Konu</th>
              <th className="p-4 font-semibold hidden lg:table-cell">Zorluk</th>
              <th className="p-4 font-semibold">Puan</th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id} className="border-t border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-4">
                  {problem.solved ? (
                    <span className="px-2 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-full">Çözüldü</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-gray-300 bg-gray-500/20 rounded-full">Bekliyor</span>
                  )}
                </td>
                <td className="p-4 font-medium">{problem.title}</td>
                <td className="p-4 text-slate-400 hidden md:table-cell">{problem.topic}</td>
                <td className="p-4 hidden lg:table-cell">
                  <span className={`font-medium ${
                    problem.difficulty === 'Kolay' ? 'text-green-400' :
                    problem.difficulty === 'Orta' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-4 font-bold text-purple-400">{problem.points}</td>
                <td className="p-4 text-right">
                   <Link to={`/problem/${problem.id}`} className="inline-flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors">
                    <BrainCircuit size={16}/>
                    <span>Çöz</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemsListPage;