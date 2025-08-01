import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Lightbulb, Send } from 'lucide-react';
import { getAllProblems } from '../firestore/problems.js';
import { submitAnswer } from '../firestore/submissions.js'; 
import { evaluateSolutionWithGemini } from '../utils/geminiApi.js';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const ProblemSolvePage = ({ userData }) => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solutionText, setSolutionText] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false); 
  const [error, setError] = useState('');
  const [geminiScore, setGeminiScore] = useState(null);
  const [geminiAdvice, setGeminiAdvice] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problems = await getAllProblems();
        const found = problems.find(p => p.uid === problemId);
        setProblem(found || null);
      } catch (error) {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  const handleSubmitSolution = async () => {
    setError('');
    setGeminiScore(null);
    setGeminiAdvice('');

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
    if (!problem) {
      setError('Problem bilgisi henüz yüklenmedi veya bulunamadı.');
      return;
    }

    const stepsArray = solutionText
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0);

    try {
      const geminiResult = await evaluateSolutionWithGemini(
        problem,
        stepsArray,
        answer.trim()
      );

      await submitAnswer({
        answer: answer.trim(),
        isCorrect: geminiResult.isCorrect,
        problemId: problem.uid,
        score: geminiResult.score,
        steps: stepsArray,
        userID: userData.uid,
        geminiAdvice: geminiResult.advice,
      });

      setIsSubmitted(true);
      setIsCorrect(geminiResult.isCorrect); 
      setGeminiScore(geminiResult.score);
      setGeminiAdvice(geminiResult.advice);

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

          <div className="mt-4 text-slate-600 dark:text-slate-300 prose prose-indigo dark:prose-invert max-w-none">
            <ReactMarkdown
              children={problem.content}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 font-semibold">
            {error}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Çözümün</h2>

          {isSubmitted ? (
            <>
              <div className={`p-4 rounded-lg text-center ${isCorrect ? 'bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-700 border border-red-200 dark:border-red-500 text-red-800 dark:text-red-300'}`}>
                <h3 className="font-bold">{isCorrect ? 'Çözümün Doğru! 🎉' : 'Çözümün Yanlış. 😕'}</h3>
                <p className="text-sm">{isCorrect ? 'Tebrikler, doğru çözdün!' : 'Tekrar deneyebilir veya çözüm adımlarını kontrol edebilirsin.'}</p>

                {geminiScore !== null && (
                  <p className="mt-2 text-sm font-semibold">
                    Puan: {geminiScore}/{problem.point}
                  </p>
                )}
              </div>

              {geminiAdvice && (
                <div className="mt-6 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500">
                    <Lightbulb size={18} className="text-yellow-300" />
                    <h4 className="text-sm font-bold text-white tracking-wide">MathVerse Tavsiyesi</h4>
                  </div>
                  <div className="px-4 py-3 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                    {geminiAdvice}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Çözümünü adım adım, açıklayıcı bir dille yaz. Unutma, sadece sonuç değil, süreç de puanlamada önemli!
              </p>

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
