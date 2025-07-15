import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = ({ onRegistrationSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name.trim(),
        surname: surname.trim(),
        authLevel: 3,
        point: 0,
        joinedAt: serverTimestamp(),
        solvedProblems: [],
      });

      setStatus("Registration successful! Redirecting to login...");
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {status && (
        <p style={{ color: status.includes("Error") ? "red" : "green" }}>{status}</p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Surname:</label><br />
          <input
            type="text"
            placeholder="Enter your surname"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
