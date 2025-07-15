import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";

export async function submitAnswer({
  isCorrect,
  problemId,
  score,
  steps,
  userID,
  answer,
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
}