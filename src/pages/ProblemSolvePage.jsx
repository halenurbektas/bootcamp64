// src/pages/ProblemSolvePage.jsx (TAM VE RENKLERİ DÜZELTİLMİŞ HALİ)

import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Lightbulb, Send } from 'lucide-react';
import { problems } from '../data/problems.js';

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const problem = problems.find(p => p.id === parseInt(problemId));
  
  const [solutionText, setSolutionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSolution = () => {
    if (solutionText.trim() === '') {
      alert('Lütfen bir çözüm yazmadan göndermeye çalışmayın!');
      return;
    }
    console.log('Gönderilen Çözüm:', solutionText);
    setIsSubmitted(true);
  };

  if (!problem) {
    return <Navigate to="/problemler" />;
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Link to="/problemler" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <ChevronLeft size={20} />
          <span>Tüm Problemlere Geri Dön</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-500/20 rounded-full">
          <CheckCircle size={14} />
          <span>Çözülüyor</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 shadow-sm">
        
        <div className="border-b border-slate-200 dark:border-slate-700/50 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{problem.topic}</span>
              <h1 className="text-3xl font-bold mt-1 text-slate-800 dark:text-white">{problem.title}</h1>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{problem.points}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Puan</p>
            </div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{problem.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Çözümün</h2>
          
          {isSubmitted ? (
            <div className="bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500 text-green-800 dark:text-green-300 p-4 rounded-lg text-center">
                <h3 className="font-bold">Çözümün Başarıyla Gönderildi!</h3>
                <p className="text-sm">Değerlendirme sonuçları için bildirimlerini kontrol et.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Çözümünü adım adım, açıklayıcı bir dille yaz. Unutma, sadece sonuç değil, süreç de puanlamada önemli!
              </p>
              <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <textarea
                  className="w-full h-64 p-4 bg-transparent text-slate-800 dark:text-white resize-none focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-500"
                  placeholder="Adım 1: Verilenleri yazarak başlıyorum..."
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center p-3 border-t border-slate-200 dark:border-slate-700/50">
                    <button className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                        <Lightbulb size={16}/>
                        <span>İpucu İste</span>
                    </button>
                    <button 
                      onClick={handleSubmitSolution}
                      className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors"
                    >
                        <Send size={16}/>
                        <span>Çözümü Gönder</span>
                    </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;