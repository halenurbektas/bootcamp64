import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const problemsCollection = collection(db, "problems");

export async function getAllProblems() {
  const problemsCol = collection(db, "problems");
  const problemSnapshot = await getDocs(problemsCol);

  const problems = problemSnapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data(),
  }));

  return problems;
}

export async function addProblem({ title, content, answer, createdBy = "*", difficulty = 1, testCases = [], topic = "" }) {
  const docRef = await addDoc(problemsCollection, {
    title,
    content,
    answer,
    createdBy,
    difficulty,
    testCases,
    topic
  });
  return docRef.id;
}