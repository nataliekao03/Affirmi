import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/web-extension';
import { getDatabase } from 'firebase/database';

// Connect app to Firebase services
const firebaseConfig = {
  apiKey: "AIzaSyBoZllS9BMob0Z7ynJwXTjIUE1pbz6reS0",
  authDomain: "affirmi.firebaseapp.com",
  databaseURL: "https://affirmi-default-rtdb.firebaseio.com",
  projectId: "affirmi",
  storageBucket: "affirmi.appspot.com",
  messagingSenderId: "270116631270",
  appId: "1:270116631270:web:9f32b787c09426cc8e4127",
  measurementId: "G-ZLZPK9VVCX"
};

// Create a Firebase app instance and get the authentication service (auth)
// auth variable provides access to Firebase authentication functionality
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };