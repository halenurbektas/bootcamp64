import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { collection, getCountFromServer } from "firebase/firestore";

export async function addUserPoints(uid, pointsToAdd) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const currentPoints = userSnap.data().point || 0;
    const newPoints = currentPoints + pointsToAdd;
    await updateDoc(userRef, { point: newPoints });
    return newPoints;
  } else {
    throw new Error("User not found");
  }
}

// 🔹 Kullanıcı verilerini çekme
export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
}

// 🔸 Kullanıcı verilerini güncelleme (opsiyonel)
export async function updateUserData(uid, newData) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, newData);
}

export const getUserCount = async () => {
  const coll = collection(db, "users");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};