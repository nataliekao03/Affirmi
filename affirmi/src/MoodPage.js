import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the auth object from the firebaseConfig file
import { auth } from './firebaseConfig';
import './App.css';
import './imgAsButton.css';


const MoodPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up an event listener to detect changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged(user => {
      // If no user is detected (not authenticated), navigate to the home page
      if (!user) {
        navigate('/'); 
      }
    });

    // Clean up the event listener when the component is unmounted
    return () => unsubscribe();
  }, [navigate]); //Dependencies: useEffect will re-run if navigate changes


  
  // Function to sign out
  const signOut = () => {
    // Sign out the user using the signOut method from the auth object
    auth.signOut().then(() => {
      navigate('/'); // After signing out, navigate to the home page
    }).catch((error) => {
      alert(error.message);
    });
  };

  // JSX (Javascript syntax extension) structure for rendering
  return (
    <div className="app-page">
      <div className="header">
        <button className="calendar-button"></button>
        <h1>affirmi</h1>
        <button className="sign-out-button" onClick={signOut}>Sign Out</button>
      </div>
      <div className="login-container">
        <p>How are you feeling?</p>
        <div className="mood-buttons">
          <button>MAD</button>
          <button>SAD</button>
          <button>NEUTRAL</button>
          <button>HAPPY</button>
          <button>ECSTATIC</button>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;

