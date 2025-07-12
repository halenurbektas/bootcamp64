import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Auth } from "./components/Auth";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'register'

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
      setCurrentView('home'); // Çıkış yaptıktan sonra ana sayfaya dön
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRegistrationSuccess = () => {
    // Kayıt başarılı olduğunda giriş ekranına yönlendir
    setTimeout(() => {
      setCurrentView('login');
    }, 2000); // 2 saniye bekle
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Bootcamp 64 - Eğitim</h1>
      
      {user ? (
        // Kullanıcı giriş yapmış - sadece çıkış seçeneği
        <div style={styles.container}>
          <div style={styles.welcomeBox}>
            <h2 style={styles.welcomeTitle}>Hoş Geldiniz!</h2>
            <p style={styles.welcomeText}>Başarıyla giriş yaptınız: {user.email}</p>
            <button 
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      ) : (
        // Kullanıcı giriş yapmamış
        <>
          {currentView === 'home' && (
            // Ana sayfa - Kayıt ol ve Giriş yap seçenekleri
            <div style={styles.container}>
              <div style={styles.optionsBox}>
                <h2 style={styles.optionsTitle}>Hoş Geldiniz!</h2>
                <p style={styles.optionsText}>Devam etmek için bir seçenek seçin:</p>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={() => setCurrentView('register')}
                    style={styles.registerButton}
                  >
                    Kayıt Ol
                  </button>
                  <button 
                    onClick={() => setCurrentView('login')}
                    style={styles.loginButton}
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'login' && (
            // Giriş yapma ekranı
            <div>
              <Login />
              <div style={styles.backButtonContainer}>
                <button 
                  onClick={() => setCurrentView('home')}
                  style={styles.backButton}
                >
                  ← Geri Dön
                </button>
              </div>
            </div>
          )}

          {currentView === 'register' && (
            // Kayıt olma ekranı
            <div>
              <Auth onRegistrationSuccess={handleRegistrationSuccess} />
              <div style={styles.backButtonContainer}>
                <button 
                  onClick={() => setCurrentView('home')}
                  style={styles.backButton}
                >
                  ← Geri Dön
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  welcomeBox: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  welcomeTitle: {
    color: '#28a745',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  welcomeText: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '30px',
  },
  logoutButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  optionsBox: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  optionsTitle: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  optionsText: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  registerButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  loginButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  backButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default App;