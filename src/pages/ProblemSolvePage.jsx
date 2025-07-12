import React from 'react';
import { ChevronLeft, CheckCircle, Lightbulb, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProblemSolvePage = () => {
  // Bu bilgiler normalde bir önceki sayfadan veya API'dan gelir. Şimdilik sabit yazıyoruz.
  const problem = {
    id: 2,
    title: 'Pisagor Teoremi ile Alan Hesabı',
    topic: 'Geometri',
    difficulty: 'Kolay',
    points: 75,
    description: 'Bir dik üçgenin dik kenarları 6 cm ve 8 cm olarak verilmiştir. Bu üçgenin hipotenüsüne ait yüksekliğin uzunluğunu, çözüm adımlarınızı net bir şekilde açıklayarak bulunuz.'
  };

  return (
    <div>
      {/* Sayfa Başlığı ve Geri Butonu */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/problemler" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
          <span>Tüm Problemlere Geri Dön</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-full">
          <CheckCircle size={14} />
          <span>Çözülüyor</span>
        </div>
      </div>

      {/* Ana Problem Kartı */}
      <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-6 md:p-8">
        
        {/* Problem Detayları */}
        <div className="border-b border-slate-700/50 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-medium text-purple-400">{problem.topic}</span>
              <h1 className="text-3xl font-bold mt-1">{problem.title}</h1>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="text-2xl font-bold text-purple-400">{problem.points}</p>
              <p className="text-sm text-slate-400">Puan</p>
            </div>
          </div>
          <p className="mt-4 text-slate-300">{problem.description}</p>
        </div>

        {/* Çözüm Giriş Alanı */}
        <div>
          <h2 className="text-xl font-bold mb-4">Çözümün</h2>
          <p className="text-sm text-slate-400 mb-4">
            Çözümünü adım adım, açıklayıcı bir dille yaz. Unutma, sadece sonuç değil, süreç de puanlamada önemli!
          </p>
          <div className="bg-slate-900/50 rounded-xl border border-slate-700/50">
            <textarea
              className="w-full h-64 p-4 bg-transparent text-white resize-none focus:outline-none placeholder:text-slate-500"
              placeholder="Adım 1: Verilenleri yazarak başlıyorum..."
            ></textarea>
            <div className="flex justify-between items-center p-3 border-t border-slate-700/50">
                <button className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300">
                    <Lightbulb size={16}/>
                    <span>İpucu İste</span>
                </button>
                <button className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors">
                    <Send size={16}/>
                    <span>Çözümü Gönder</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;