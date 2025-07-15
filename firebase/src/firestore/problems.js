import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export const getAllProblems = async () => {
  const snapshot = await getDocs(collection(db, "problems"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
