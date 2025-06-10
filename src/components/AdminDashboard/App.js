import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServicesRequests from './ServiceRequests/ServicesRequests';
import Accounting from './Accounting/Accounting';
import Users from './Users/Users'; 
import RepairShops from './RepairShops/RepairShops';
import WinErrors from './WinErrors/WinErrors';
import './App.css';
import DashboardLayout from './DashBoard/DashboardLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accounting />} />
          <Route path="/servicing" element={<ServicesRequests />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/users" element={<Users />} />
          <Route path="/repairshops" element={<RepairShops />} />
          <Route path="/winerrors" element={<WinErrors />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
