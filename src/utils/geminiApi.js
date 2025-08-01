import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const evaluateSolutionWithGemini = async (problem, solutionSteps, userAnswer) => {
    const finalAnswerPrompt = `
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
    - Final cevabı doğru ise en az tam puanın yarısını ver.
    
    Yukarıdaki kriterlere göre kullanıcının çözümünü değerlendir ve sadece sayısal bir puan döndür. 
    Puan, 0 (sıfır) ile problemin alabileceği maksimum puan olan ${problem.point} arasında bir tam sayı olmalı. 
    Başka hiçbir metin yazma, sadece puanı döndür.
    `;

    const stepsAdvicePrompt = `
    Aşağıdaki matematik/mantık problemi için kullanıcının sunduğu çözüm adımlarını incele ve ona çözümünü nasıl geliştirebileceğine dair kısa, yapıcı bir tavsiye ver.

    Problem Detayları:
    Başlık: "${problem.title}"
    İçerik: "${problem.content}"
    Doğru Cevap: "${problem.answer}"

    Kullanıcının Çözüm Adımları:
    ${solutionSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

    Tavsiye:
    - Adımların doğruluğu ve eksiklikleri hakkında kısa bir değerlendirme yap.
    - Nasıl daha iyi açıklama ekleyebileceğini veya mantıksal olarak güçlendirebileceğini belirt.
    - Sadece tavsiye cümlesi döndür, puan veya sayı ekleme.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 1️⃣ Final cevap değerlendirmesi
        const finalResult = await model.generateContent(finalAnswerPrompt);
        const finalScore = parseInt(finalResult.response.text().trim(), 10);

        if (isNaN(finalScore)) {
            throw new Error(`Gemini'den beklenen sayısal puan alınamadı. Yanıt: "${finalResult.response.text()}"`);
        }

        const isCorrect = (finalScore === problem.point);

        const adviceResult = await model.generateContent(stepsAdvicePrompt);
        const advice = adviceResult.response.text().trim();

        return {
            isCorrect: isCorrect,
            score: finalScore,
            advice: advice
        };

    } catch (error) {
        throw new Error('Çözüm değerlendirilirken bir hata oluştu: ' + error.message);
    }
};
