import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const evaluateSolutionWithGemini = async (problem, solutionSteps, userAnswer) => {
     const prompt = `
    Aşağıdaki matematik/mantık problemi için verilen çözüm adımlarını ve final cevabı değerlendir.

    Problem Detayları:
    Başlık: "${problem.title}"
    İçerik: "${problem.content}"
    Doğru Cevap: "${problem.answer}"

    Kullanıcının Sunduğu Çözüm:
    Çözüm Adımları:
    ${solutionSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
    Final Cevabı: "${userAnswer}"

    Değerlendirme Kriterleri:
    - Çözüm adımlarının mantıksal tutarlılığı ve doğruluğu.
    - Final cevabının doğru cevaba yakınlığı veya eşleşmesi.
    - Çözümün açıklayıcılığı ve netliği.
    - Final cevabı doğru ise en az tam puanın yarısını ver
    
    Yukarıdaki kriterlere göre kullanıcının çözümünü değerlendir ve sadece sayısal bir puan döndür. Puan, 0 (sıfır) ile problemin alabileceği maksimum puan olan ${problem.point} arasında bir tam sayı olmalı. Değerlendirme sonucunuza göre bu aralıkta uygun bir puan ver. Başka hiçbir metin, açıklama veya karakter ekleme. Sadece puanı yaz.
    `;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const score = parseInt(text.trim(), 10);

        if (isNaN(score)) {
            console.error("Gemini yanıtı sayısal bir değer değil:", text);
            throw new Error(`Gemini'den beklenen sayısal puan alınamadı. Yanıt: "${text.substring(0, 100)}..."`);
        }

        const isCorrect = (score === problem.point); 

        return {
            isCorrect: isCorrect,
            score: score,
        };

    } catch (error) {
        throw new Error('Çözüm değerlendirilirken bir hata oluştu: ' + error.message);
    }
};