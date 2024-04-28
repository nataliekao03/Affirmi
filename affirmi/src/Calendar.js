import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';

const Calendar = () => {
    const navigate = useNavigate();
    const [moods, setMoods] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const user = auth.currentUser;
        const encodedEmail = encodeURIComponent(user.email).replace(/\./g, ','); //Purpose of encoded email is to replace the . with , in the email address, because Firebase database path cannot contain . (dot)
        const moodsRef = ref(db, `users/${encodedEmail}/moods`);

        const unsubscribe = onValue(moodsRef, (snapshot) => {
        if (snapshot.exists()) {
            setMoods(snapshot.val());
        } else {
            setMoods({});
        }
        }, (error) => {
        console.error(error);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


  // Function to back out
  const back = () => {
      navigate('/MoodPage');
  };


  return (
    <div>
      <h1>affirmi mood calendar :3</h1>
      <button onClick={back}>Back</button>
      <ul>
        {Object.entries(moods).map(([date, moodDetails]) => (
          <li key={date}>
            <strong>Date:</strong> {date} - <strong>Mood:</strong> {moodDetails.mood}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
