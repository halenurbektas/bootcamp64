// src/pages/ProblemsListPage.jsx (TAM VE GÜNCEL HALİ)

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, BrainCircuit, FileQuestion } from 'lucide-react';
import { problems as allProblems } from '../data/problems.js';

const ProblemsListPage = () => {
  // State'lerimizi tanımlıyoruz
  const [filteredProblems, setFilteredProblems] = useState(allProblems);
  const [isDifficultyMenuOpen, setDifficultyMenuOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');

  // Açılır menünün referansını tutmak için useRef
  const difficultyMenuRef = useRef(null);

  // Filtreleme mantığını içeren useEffect
  useEffect(() => {
    let result = allProblems;

    // Zorluk seviyesine göre filtrele
    if (selectedDifficulty !== 'Tümü') {
      result = result.filter(p => p.difficulty === selectedDifficulty);
    }

    // Arama terimine göre filtrele (hem başlıkta hem konuda arama yapabilir)
    if (searchTerm.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProblems(result);
  }, [selectedDifficulty, searchTerm]);


  // Menü dışına tıklandığında menüyü kapatan useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (difficultyMenuRef.current && !difficultyMenuRef.current.contains(event.target)) {
        setDifficultyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Zorluk seviyesi seçildiğinde çalışacak fonksiyon
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setDifficultyMenuOpen(false); // Menüyü kapat
  };

  const noProblems = filteredProblems.length === 0;

  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Matematik Problemleri</h1>
          <p className="text-slate-500 dark:text-slate-400">Yeteneklerini test et ve liderlik tablosunda yüksel!</p>
        </div>
        {/* Filtreleme ve Arama Alanı */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Problem ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          
          <div className="relative" ref={difficultyMenuRef}>
            <button 
              onClick={() => setDifficultyMenuOpen(!isDifficultyMenuOpen)}
              className="flex items-center gap-2 w-full justify-between bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span>{selectedDifficulty}</span>
              <ChevronDown size={16} />
            </button>
            {isDifficultyMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-10 animate-fade-in-down">
                {['Tümü', 'Kolay', 'Orta', 'Zor'].map(difficulty => (
                  <button 
                    key={difficulty}
                    onClick={() => handleDifficultyChange(difficulty)}
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {noProblems ? (
        <div className="text-center bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-12 shadow-sm">
            <div className="inline-block p-4 bg-purple-100 dark:bg-purple-800/30 rounded-full mb-4">
                <FileQuestion size={40} className="text-purple-600 dark:text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Filtreye Uygun Problem Bulunamadı</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Lütfen arama terimini veya zorluk filtresini değiştirmeyi dene.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Durum</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Problem Başlığı</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Konu</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 hidden lg:table-cell">Zorluk</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Puan</th>
                    <th className="p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                    {filteredProblems.map(problem => (
                        <tr key={problem.id} className="border-t border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                            <td className="p-4">
                              {problem.solved ? ( <span className="px-2 py-1 text-xs font-semibold text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-500/20 rounded-full">Çözüldü</span>) : (<span className="px-2 py-1 text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-200 dark:bg-gray-500/20 rounded-full">Bekliyor</span> )}
                            </td>
                            <td className="p-4 font-medium text-slate-800 dark:text-slate-100">{problem.title}</td>
                            <td className="p-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">{problem.topic}</td>
                            <td className="p-4 hidden lg:table-cell">
                              <span className={`font-medium ${ problem.difficulty === 'Kolay' ? 'text-green-600 dark:text-green-400' : problem.difficulty === 'Orta' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400' }`}>{problem.difficulty}</span>
                            </td>
                            <td className="p-4 font-bold text-purple-600 dark:text-purple-400">{problem.points}</td>
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
      )}
    </div>
  );
};

export default ProblemsListPage;