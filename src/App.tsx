import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import './App.css';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
        Protected Route for Dashboard
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect Unknown Routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
