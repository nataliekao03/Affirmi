import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MoodPage from './MoodPage';
import Calendar from './Calendar';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/MoodPage" element={<MoodPage />} /> 
        <Route path="/Calendar" element={<Calendar />} /> 
      </Routes>
    </Router>
  );
};

export default App;