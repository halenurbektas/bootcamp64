import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const topics = ["Cebir", "Geometri", "Analiz", "Olasılık ve İstatistik"];
const difficulties = [0, 1, 2, 3, 4];

export async function generateAndSaveMathProblem() {
  try {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

    const prompt = `
    Üniversite düzeyinde, ${topic} konusunda zorluk seviyesi 4 üzerinden ${difficulty} olan 1 tane eğlenceli, hikaye ile harmanlanmış matematik problemi üret.  
    Sorunun formatı açık ve net olsun. Cevap tek bir sayı veya kapalı bir ifade olmalı. 

    Çıktıyı şu formatta ver:
    Title: [Kısa başlık]
    Content: [Soru metni ve hikayesi karışık, Türkçe olmalı, Hikaye uzun olsun ve soruyla bağlantılı olsun, Eğlenceli olsun hikayeler değişik farklı özel hikayeler olsun, Orijinal olsunlar ,Tek parça,LaTeX formatında ifadeler olabilir: $x^2 + y^2 = z^2$",Başka türlü ifade olmaz]
    Answer: [Doğru cevap]
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const titleMatch = text.match(/Title:\s*(.*)/i);
    const contentMatch = text.match(/Content:\s*([\s\S]*?)Answer:/i);
    const answerMatch = text.match(/Answer:\s*(.*)/i);

    const title = titleMatch ? titleMatch[1].trim() : "Matematik Sorusu";
    const content = contentMatch ? contentMatch[1].trim() : "Soru metni oluşturulamadı.";
    const answer = answerMatch ? answerMatch[1].trim() : "";

    const docRef = await addDoc(collection(db, "problems"), {
      title,
      content,
      answer,
      topic,
      difficulty,
      point: 100,
      testCases: [],
      createdAt: serverTimestamp()
    });

    return { success: true, id: docRef.id, title, topic, difficulty };

  } catch (error) {
    console.error("Soru oluşturulurken hata:", error);
    return { success: false, error: error.message };
  }
}
