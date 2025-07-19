import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getAllProblems() {
  const problemsCol = collection(db, "problems");
  const problemSnapshot = await getDocs(problemsCol);

  const problems = problemSnapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data(),
  }));

  return problems;
}

export const addProblem = async ({ content, answer, difficulty, point, testCases, title, topic }) => {
  await addDoc(collection(db, "problems"), {
    content,
    answer,
    difficulty,
    point,
    testCases,
    title,
    topic,
    createdAt: serverTimestamp(),
  });
};