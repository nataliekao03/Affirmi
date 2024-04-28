import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MoodPage from './MoodPage';
import Calendar from './Calendar';
import Chatbot from './Chatbot';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/MoodPage" element={<MoodPage />} /> 
        <Route path="/Calendar" element={<Calendar />} /> 
        <Route path="/Chatbot" element={<Chatbot />} /> 
      </Routes>
    </Router>
  );
};

export default App;