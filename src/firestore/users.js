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

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
}

export const updateUserData = async (uid, newData) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, newData);
    console.log('Kullanıcı başarıyla güncellendi:', uid, newData);
    return true;
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    throw error;
  }
};

export const getUserCount = async () => {
  const coll = collection(db, "users");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};