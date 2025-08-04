import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Stats from './pages/Stats';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="p-3 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/overview" element={<Overview />} />
            <Route path="/dashboard/stats" element={<Stats />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
