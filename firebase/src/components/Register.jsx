import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Register = ({ onRegistrationSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
