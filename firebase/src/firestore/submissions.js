import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const submitAnswer = async ({ userId, problemId, answer, isCorrect }) => {
  await addDoc(collection(db, "submissions"), {
    userId,
    problemId,
    answer,
    isCorrect,
    submittedAt: new Date()
  });
};
