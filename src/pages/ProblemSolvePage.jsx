import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Lightbulb, Send } from 'lucide-react';
import { getAllProblems } from '../firestore/problems.js';
import { submitAnswer } from '../firestore/submissions.js'; // import

const ProblemSolvePage = ({ userData }) => {  // userData prop olarak da alabilirsin
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solutionText, setSolutionText] = useState('');
  const [answer, setAnswer] = useState(''); // Yeni state: kullanıcının cevabı
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problems = await getAllProblems();
        const found = problems.find(p => p.uid === problemId);
        setProblem(found || null);
      } catch (error) {
        console.error('Problem yüklenirken hata:', error);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  const handleSubmitSolution = async () => {
    setError('');
    if (solutionText.trim() === '') {
      setError('Lütfen çözüm adımlarını yazmadan göndermeye çalışmayın!');
      return;
    }
    if (answer.trim() === '') {
      setError('Lütfen cevabınızı yazmadan göndermeye çalışmayın!');
      return;
    }
    if (!userData?.uid) {
      setError('Kullanıcı bilgisi bulunamadı, lütfen giriş yapınız.');
      return;
    }
  
    // solutionText stringini satırlara bölerek array yapıyoruz
    const stepsArray = solutionText
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0);  // boş satırları atıyoruz
  
    // Kullanıcının cevabını problem cevabıyla karşılaştır
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = problem.answer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    try {
      await submitAnswer({
        answer: answer.trim(),      // Kullanıcının girdiği cevap
        isCorrect: isCorrect,       // Problem cevabıyla karşılaştırma sonucu
        problemId: problem.uid,
        score: isCorrect ? problem.point : 0,  // Doğruysa problem puanı, yanlışsa 0
        steps: stepsArray,          // **Array olarak gönderiyoruz**
        userID: userData.uid,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError('Çözüm gönderilirken hata oluştu: ' + err.message);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!problem) return <Navigate to="/problemler" />;

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
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{problem.point ?? 0}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Puan</p>
            </div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{problem.content}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 font-semibold">
            {error}
          </div>
        )}

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
              
              {/* Çözüm Adımları */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Çözüm Adımları
                </label>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <textarea
                    className="w-full h-48 p-4 bg-transparent text-slate-800 dark:text-white resize-none focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-500"
                    placeholder="Adım 1: Verilenleri yazarak başlıyorum..."
                    value={solutionText}
                    onChange={(e) => setSolutionText(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Cevap Alanı */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Final Cevabın
                </label>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <input
                    type="text"
                    className="w-full p-4 bg-transparent text-slate-800 dark:text-white focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-500"
                    placeholder="Cevabını buraya yaz (örn: 42, x=5, y=3x+2, vb.)"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              </div>

              {/* Alt kısım butonlar */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700/50">
                <button className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                  <Lightbulb size={16} />
                  <span>İpucu İste</span>
                </button>
                <button
                  onClick={handleSubmitSolution}
                  className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Send size={16} />
                  <span>Çözümü Gönder</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;