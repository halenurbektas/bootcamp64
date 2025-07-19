import React, { useState } from "react";
import { addProblem } from "../firestore/problems";

const AddProblem = ({ onAdded }) => {
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(2); // 0-4 arası sayısal değer
  const [point, setPoint] = useState(100);
  const [testCases, setTestCases] = useState(""); // JSON string olarak alınacak
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!content.trim() || !answer.trim() || !title.trim() || !topic.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    let parsedTestCases = [];
    if (testCases.trim()) {
      try {
        parsedTestCases = JSON.parse(testCases);
        if (!Array.isArray(parsedTestCases)) {
          setError("Test case'ler bir dizi (array) olmalıdır.");
          return;
        }
      } catch {
        setError("Test case'ler geçerli bir JSON array formatında olmalıdır.");
        return;
      }
    }

    if (difficulty < 0 || difficulty > 4) {
      setError("Zorluk değeri 0 ile 4 arasında olmalıdır.");
      return;
    }

    if (point < 0) {
      setError("Puan negatif olamaz.");
      return;
    }

    setLoading(true);
    try {
      await addProblem({
        content,
        answer,
        difficulty: Number(difficulty),
        point: Number(point),
        testCases: parsedTestCases,
        title,
        topic,
      });

      setContent("");
      setAnswer("");
      setDifficulty(2);
      setPoint(100);
      setTestCases("");
      setTitle("");
      setTopic("");
      setSuccessMsg("Problem başarıyla eklendi!");

      if (onAdded) onAdded();

      setTimeout(() => setSuccessMsg(""), 5000); // 5 saniye sonra mesaj kaybolur
    } catch (err) {
      setError("Problem eklenirken hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
      <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Yeni Problem Ekle</h3>

      {successMsg && (
        <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 font-semibold">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Konu (Topic)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />

        <input
          type="text"
          placeholder="Problem Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />

        <textarea
          placeholder="Problem Metni"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />

        <input
          type="text"
          placeholder="Cevap"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        >
          <option value={0}>0 - Çok Kolay</option>
          <option value={1}>1 - Kolay</option>
          <option value={2}>2 - Orta</option>
          <option value={3}>3 - Zor</option>
          <option value={4}>4 - Çok Zor</option>
        </select>

        <input
          type="number"
          placeholder="Puan (Problem Puanı)"
          value={point}
          min={0}
          onChange={(e) => setPoint(Number(e.target.value))}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />

        <textarea
          placeholder='Test Caseler (JSON Array olarak, örn: [{"input": "1", "output": "2"}])'
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
          rows={4}
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Ekleniyor..." : "Problem Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddProblem;