import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';
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

    return () => unsubscribe();
  }, [navigate]);


  
  // Function to sign out
  const signOut = () => {
    // Sign out the user using the signOut method from the auth object
    auth.signOut().then(() => {
      navigate('/'); // After signing out, navigate to the home page
    }).catch((error) => {
      alert(error.message);
    });
  };

  // Function to handle mood button clicks
  const handleMoodClick = (mood) => {
    console.log(`Selected mood: ${mood}`);
    // Perform actions based on the selected mood
    storeMoodInDatabase(mood);
  };

  const storeMoodInDatabase = (mood) => {
    // Get the current user
    const user = auth.currentUser;
    // Check if user is authenticated
    if (user && user.email) {
      const db = getDatabase();
      // Encode the email to be Firebase key friendly
      const encodedEmail = encodeURIComponent(user.email).replace(/\./g, ',');
      // Format the current date as YYYY-MM-DD
      const date = new Date().toISOString().slice(0, 10); // Gets the date in YYYY-MM-DD format
      const moodRef = ref(db, `users/${encodedEmail}/moods/${date}`);
      set(moodRef, { mood: mood, timestamp: new Date().toISOString() });
      //ADD NAVIGATION TO POST-MOODPAGE PAGE
    } else {
      console.error('User not authenticated or email is missing');
    }
  };

  // JSX (Javascript syntax extension) structure for rendering
  return (
    <div className="app-page">
      <div className="header">
        <button className="calendar-button" onClick={() => navigate('/calendar')}></button>
        <h1>affirmi</h1>
        <button className="sign-out-button" onClick={signOut}>Sign Out</button>
      </div>
      <div className="login-container">
        <p>How are you feeling?</p>
        <div className="mood-buttons">
          <button onClick={() => handleMoodClick('MAD')}>MAD</button>
          <button onClick={() => handleMoodClick('SAD')}>SAD</button>
          <button onClick={() => handleMoodClick('NEUTRAL')}>NEUTRAL</button>
          <button onClick={() => handleMoodClick('HAPPY')}>HAPPY</button>
          <button onClick={() => handleMoodClick('ECSTATIC')}>ECSTATIC</button>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;

