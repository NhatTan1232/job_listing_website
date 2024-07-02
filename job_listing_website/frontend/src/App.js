import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobList from './components/JobList';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/about" element={<div>About Us Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
            </Routes>
        </Router>
    );
}

export default App;
