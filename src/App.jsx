import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { getAllProblems } from "./firestore/problems";

// Sayfalar
import AuthForm from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import ProblemsListPage from './pages/ProblemsListPage.jsx';
import ProblemSolvePage from './pages/ProblemSolvePage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AddProblem from './pages/AddProblem.jsx';
import BadgesPage from './pages/BadgesPage.jsx';

// Layout
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

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
          await loadProblems();
        } else {
          console.warn("No user data found!");
          setUserData(null);
        }
      } else {
        setUserData(null);
        setProblems([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadProblems]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Giriş yapılmadıysa sadece login sayfasına yönlendir */}
        <Route path="/login" element={!user ? <AuthForm /> : <Navigate to="/" />} />

        {/* Giriş yapıldıysa dashboard yapısını aç */}
        <Route
          path="/"
          element={
            user ? (
              <DashboardLayout user={user} userData={userData} onLogout={() => signOut(auth)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Dashboard user={user} userData={userData} />} />
          <Route path="profil" element={<Profile userData={userData} onLogout={() => signOut(auth)}/>} />
          <Route path="problemler" element={<ProblemsListPage problems={problems} />} />
          <Route path="problem/:problemId" element={<ProblemSolvePage problems={problems} userData={userData}/>} />
          <Route path="analizler" element={<AnalyticsPage />} />
          <Route path="kullanicilar" element={<UsersPage />} />
          <Route path="ayarlar" element={<SettingsPage userData={userData}/>} />
          <Route path="/add-problem" element={<AddProblem />} />
          <Route path="rozetler" element={<BadgesPage />} />
        </Route>

        {/* Bilinmeyen rotaları yakala */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
