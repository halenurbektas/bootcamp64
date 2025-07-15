import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Register from "./components/Register";
import Login from "./components/Login";
import ProblemSolver from "./components/ProblemSolver";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Bootcamp 64 - MatemAtik</h1>

      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <ProblemSolver user={user} />
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