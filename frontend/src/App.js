import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPatient from "./pages/DashboardPatient";
import DashboardMedecin from "./pages/DashboardMedecin";
import DashboardAdmin from "./pages/DashboardAdmin";
import PrivateRoute from "./components/PrivateRoute";
import FormulaireRDV from "./pages/FormulaireRDV";
import Teleconsultation from "./pages/Teleconsultation";
import 'primereact/resources/themes/saga-blue/theme.css';     
import 'primereact/resources/primereact.min.css';              
import 'primeicons/primeicons.css';                            




export default function App() {
  const [role, setRole] = useState("");

  return (
    <Router>
      <div>
        {role && (
          <div className="p-3 bg-success text-white d-flex flex-column flex-md-row justify-content-between align-items-center">
            <h1 className="h5 mb-2 mb-md-0">Application de Téléconsultation</h1>
            <div className="d-flex flex-column flex-md-row align-items-center">
              <label className="me-2">Rôle :</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  localStorage.setItem("role", e.target.value); // 🔥 stocke le rôle
                }}
                className="form-select form-select-sm me-3"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
              <Link to="/" onClick={() => setRole("")} className="text-white text-decoration-underline">
                Accueil
              </Link>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/medecin/teleconsultation/:id" element={<Teleconsultation />} />

          <Route path="/dashboard-patient" element={
            <PrivateRoute role="patient"><DashboardPatient /></PrivateRoute>
          } />
          <Route path="/dashboard-medecin" element={
            <PrivateRoute role="doctor"><DashboardMedecin /></PrivateRoute>
          } />
          <Route path="/dashboard-admin" element={
            <PrivateRoute role="admin"><DashboardAdmin /></PrivateRoute>
          } />

          <Route path="/medecin/rendezvous/:id" element={<FormulaireRDV />} />
          <Route path="/medecin/teleconsultation/:id" element={<Teleconsultation />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
