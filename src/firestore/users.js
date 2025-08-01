import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy, limit, where, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config";
import { getCountFromServer } from "firebase/firestore";

export async function addUserPoints(uid, pointsToAdd) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const pointHistory = userData.pointHistory || [];
    const lastPoint = pointHistory.length > 0 ? pointHistory[pointHistory.length - 1] : 0;
    const newPoint = lastPoint + pointsToAdd;

    // pointHistory'ye yeni puanı ekliyoruz
    await updateDoc(userRef, {
      pointHistory: arrayUnion(newPoint)
    });
    return newPoint;
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

// Yeni eklenen fonksiyonlar
export const getAllUsers = async (limitCount = null) => {
  try {
    const usersRef = collection(db, "users");
    let q = query(usersRef, orderBy("joinedAt", "desc"));
    
    if (limitCount) {
      q = query(usersRef, orderBy("joinedAt", "desc"), limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    const users = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        uid: doc.id, // Firebase auth uid
        ...userData,
        // Firestore timestamp'i Date'e çevirme
        joinedAt: userData.joinedAt?.toDate ? userData.joinedAt.toDate() : userData.joinedAt
      });
    });
    
    return users;
  } catch (error) {
    console.error('Kullanıcıları çekme hatası:', error);
    throw error;
  }
};

// Role göre kullanıcıları çekme
export const getUsersByRole = async (role) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", role));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        uid: doc.id,
        ...userData,
        joinedAt: userData.joinedAt?.toDate ? userData.joinedAt.toDate() : userData.joinedAt
      });
    });
    
    return users;
  } catch (error) {
    console.error('Role göre kullanıcıları çekme hatası:', error);
    throw error;
  }
};