// src/pages/SubmissionsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle, Clock, Award, User, Hash, Trash2 } from 'lucide-react';
import { getAllSubmissions, clearAllSubmissions } from '../firestore/submissions';

const SubmissionsPage = ({ userData }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!userData || userData.authLevel !== 0) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const allSubmissions = await getAllSubmissions();
        setSubmissions(allSubmissions);
      } catch (error) {
        console.error("Gönderimler alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleClearSubmissions = async () => {
    if (window.confirm("Bu işlem geri alınamaz! Tüm gönderim geçmişini silmek istediğinizden emin misiniz?")) {
      try {
        await clearAllSubmissions();
        setSubmissions([]); // Veriyi temizledikten sonra state'i de boşalt
        alert("Gönderim geçmişi başarıyla temizlendi.");
      } catch (error) {
        console.error("Gönderim geçmişi temizlenirken bir hata oluştu: ", error);
        alert("Bir hata oluştu, lütfen konsolu kontrol edin.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-slate-500 dark:text-slate-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <ChevronLeft size={20} />
          <span>Panele Geri Dön</span>
        </Link>
        <button
          onClick={handleClearSubmissions}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Trash2 size={20} />
          <span>Geçmişi Temizle</span>
        </button>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Tüm Gönderimler</h1>
      
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 shadow-sm">
        {submissions.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">Henüz hiç gönderim yapılmamış.</p>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div key={submission.uid} className="p-5 bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
                
                {/* Üst Kısım: Durum, Puan ve Tarih */}
                <div className="flex justify-between items-start mb-4 border-b border-slate-200 dark:border-slate-600 pb-4">
                  <div className="flex items-center gap-3">
                    {submission.isCorrect ? (
                      <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-300 bg-green-200/50 dark:bg-green-500/20 rounded-full">
                        <CheckCircle size={14} />
                        <span>Doğru Cevap</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-red-800 dark:text-red-300 bg-red-200/50 dark:bg-red-500/20 rounded-full">
                        <XCircle size={14} />
                        <span>Yanlış Cevap</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <Award size={18} /> {submission.score}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <Clock size={12} />
                      {submission.submittedAt ? new Date(submission.submittedAt.seconds * 1000).toLocaleDateString() : 'Tarih yok'}
                    </p>
                  </div>
                </div>

                {/* Orta Kısım: Kullanıcı ve Problem ID'leri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <User size={16} className="text-slate-500 dark:text-slate-400" />
                    <span>Kullanıcı ID:</span>
                    <span className="font-medium truncate">{submission.userID}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Hash size={16} className="text-slate-500 dark:text-slate-400" />
                    <span>Problem ID:</span>
                    <span className="font-medium truncate">{submission.problemId}</span>
                  </div>
                </div>
                
                {/* Alt Kısım: Cevap ve Adımlar */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <p className="font-bold text-slate-800 dark:text-white mb-2">Cevap:</p>
                  <p className="p-3 bg-white dark:bg-slate-800 rounded-lg text-sm text-slate-800 dark:text-white">{submission.answer}</p>
                  
                  <p className="font-bold text-slate-800 dark:text-white mt-4 mb-2">Çözüm Adımları:</p>
                  <ul className="bg-white dark:bg-slate-800 p-3 rounded-lg space-y-2 text-sm text-slate-800 dark:text-white">
                    {submission.steps.length > 0 ? (
                      submission.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="shrink-0 text-slate-500 dark:text-slate-400">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400">Çözüm adımları kaydedilmemiş.</p>
                    )}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPage;