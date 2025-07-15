import React, { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import Register from "./components/Register";
import Login from "./components/Login";
import ProblemSolver from "./components/ProblemSolver";
import AddProblem from "./components/AddProblem";
import { doc, getDoc } from "firebase/firestore";
import { getAllProblems } from "./firestore/problems";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [problems, setProblems] = useState([]);
  const [showAddProblem, setShowAddProblem] = useState(false);

  // loadProblems fonksiyonunu useCallback ile sarmala ki bağımlılıklarda stabil kalsın
  const loadProblems = useCallback(async () => {
    const allProblems = await getAllProblems();
    setProblems(allProblems);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
          console.warn("No user data found in Firestore!");
        }

        setCurrentView("main");
        loadProblems();
      } else {
        setUserData(null);
        setCurrentView("home");
        setProblems([]); // çıkışta problem listesini temizle
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadProblems]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView("home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleRegistrationSuccess = () => {
    setTimeout(() => {
      setCurrentView("login");
    }, 1000);
  };

  const handleProblemAdded = () => {
    setShowAddProblem(false);
    loadProblems();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Bootcamp 64 - MatemAtik</h1>

      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>{" "}
          <button onClick={() => setShowAddProblem(!showAddProblem)}>
            {showAddProblem ? "İptal" : "Yeni Problem Ekle"}
          </button>
          <button onClick={() => setCurrentView("profile")}>Profil</button>
          <button onClick={() => setCurrentView("main")}>Anasayfa</button>
          <hr />

          {showAddProblem && <AddProblem onAdded={handleProblemAdded} />}

          {currentView === "main" && (
            <>
              <h2>Mevcut Problemler</h2>
              {problems.length === 0 ? (
                <p>Problem bulunamadı.</p>
              ) : (
                <ul>
                  {problems.map((problem) => (
                    <li key={problem.uid}>{problem.content}</li>
                  ))}
                </ul>
              )}
              <ProblemSolver
                user={user}
                userData={userData}
                setUserData={setUserData}
                problems={problems}
                setProblems={setProblems}
              />
            </>
          )}

          {currentView === "profile" && (
            <>
              <h2>Kullanıcı Bilgileri</h2>
              {userData && (
                <div style={{ marginBottom: "10px" }}>
                  <p>
                    <b>Name:</b> {userData.name} {userData.surname}
                  </p>
                  <p>
                    <b>Points:</b> {userData.point}
                  </p>
                  <p>
                    <b>Auth Level:</b> {userData.authLevel}
                  </p>
                  <p>
                    <b>Joined At:</b>{" "}
                    {userData.joinedAt?.seconds
                      ? new Date(userData.joinedAt.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {currentView === "home" && (
            <>
              <p>Welcome! Please login or register to continue.</p>
              <button onClick={() => setCurrentView("login")}>Login</button>
              <button onClick={() => setCurrentView("register")}>Register</button>
            </>
          )}

          {currentView === "login" && (
            <>
              <Login />
              <button onClick={() => setCurrentView("home")}>← Back</button>
            </>
          )}

          {currentView === "register" && (
            <>
              <Register onRegistrationSuccess={handleRegistrationSuccess} />
              <button onClick={() => setCurrentView("home")}>← Back</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
