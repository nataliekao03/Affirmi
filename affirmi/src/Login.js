import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// Import the auth object from the firebaseConfig file
import { auth } from "./firebaseConfig";
import "./App.css";

const Login = () => {
  // State variables using useState hook from React
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle sign-in
  const signIn = () => {
    // Validates email and password
    if (!email || !password) {
      setErrorMessage("Please enter a valid email and password.");
      return;
    }

    // Firebase sign-in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/MoodPage");
      })
      .catch((error) => {
        setErrorMessage("Wrong email or password");
      });
  };

  // Function to handle sign-up
  const signUp = () => {
    // Validates email and password
    if (!email || !password) {
      setErrorMessage("Please enter a valid email and password.");
      return;
    }

    // Firebase sign-up with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created successfully!");
        navigate("/MoodPage");
      })
      // Handles different errors with signing up
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(
              "Invalid email address. Please enter a valid email."
            );
            break;
          case "auth/email-already-in-use":
            setErrorMessage("Email is already in use");
            break;
          case "auth/weak-password":
            setErrorMessage(
              "Password is too short. Please choose a stronger password."
            );
            break;
          default:
            setErrorMessage("Error creating account. Please try again later.");
        }
      });
  };

  // Function to handle password reset
  const resetPassword = () => {
    navigate("/reset");
  };

  // JSX (Javascript syntax extension) structure for rendering
  return (
    <div className="background">
      <div className="login-container">
        <h1>affirmi</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Log In</button>
        <button onClick={signUp}>Sign Up</button>
        {/* Displays error messages */}
        <p id="errorMessage" style={{ color: "#555" }}>
          {errorMessage}
        </p>
        <a onClick={resetPassword} className="password-reset-link">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default Login;
