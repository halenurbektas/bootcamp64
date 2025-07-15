import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export const Auth = ({ onRegistrationSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStatus("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz...");
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      setStatus("Hata: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authBox}>
        <h2 style={styles.title}>Kayıt Ol</h2>
        
        {status && (
          <div style={status.includes("Hata") ? styles.errorMessage : styles.successMessage}>
            {status}
          </div>
        )}

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              placeholder="Email adresinizi girin"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              type="email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Şifre:</label>
            <input
              placeholder="Şifrenizi girin"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={signIn} style={styles.button}>
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  authBox: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #c3e6cb',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb',
  },
};

export default Auth;