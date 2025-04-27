import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCandidateForm from './components/AddCandidateForm';
import ExistingApplications from './components/ExistingApplications';
import './App.css'; 

function App() {
  return (
    <Router>
      <nav>
      <Link to="/"></Link>
        <Link to="/add-new-candidate">Add New Candidate</Link>
        <Link to="/existing-applications">Existing Applications</Link>
      </nav>
      <Routes>
      <Route path="/" element={<AddCandidateForm />} />
        <Route path="/add-new-candidate" element={<AddCandidateForm />} />
        <Route path="/existing-applications" element={<ExistingApplications />} />
      </Routes>
    </Router>
  );
}

export default App;
