import { collection, doc, setDoc, updateDoc, serverTimestamp, getDocs, arrayUnion, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export async function submitAnswer({
  isCorrect,
  problemId, // `problemId` artık bu fonksiyonda kullanılacak
  score,
  steps,
  userID,
  answer,
  currentPoints,
}) {
  const submissionRef = doc(collection(db, "submissions"));
  await setDoc(submissionRef, {
    isCorrect,
    problemId,
    score,
    steps,
    submittedAt: serverTimestamp(),
    uid: submissionRef.id,
    userID,
    answer,
  });

  if (isCorrect) {
    const userRef = doc(db, "users", userID);
    const newPoints = currentPoints + score;
    await updateDoc(userRef, {
      pointHistory: arrayUnion(newPoints),
      solvedProblems: arrayUnion(problemId), // Yeni: problemId'yi solvedProblems dizisine ekliyoruz
    });
  }
}

export async function getAllSubmissions() {
  const submissionsCollectionRef = collection(db, "submissions");
  const submissionsSnapshot = await getDocs(submissionsCollectionRef);
  const submissionsList = submissionsSnapshot.docs.map(doc => ({
    ...doc.data(),
    uid: doc.id
  }));
  return submissionsList;
}

export async function clearAllSubmissions() {
  const submissionsCollectionRef = collection(db, "submissions");
  const submissionsSnapshot = await getDocs(submissionsCollectionRef);
  
  const deletePromises = submissionsSnapshot.docs.map(doc => deleteDoc(doc.ref));
  
  // Tüm silme işlemlerinin bitmesini bekler
  await Promise.all(deletePromises);
  
  console.log("Tüm gönderim geçmişi temizlendi.");
}