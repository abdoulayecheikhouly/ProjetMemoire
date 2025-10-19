// src/pages/DashboardMedecin.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function DashboardMedecin() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/patients") // ✅ route confirmée dans Postman
      .then(res => {
        console.log("✅ Patients reçus :", res.data);
        setPatients(res.data);
      })
      .catch(err => console.error("❌ Erreur chargement patients :", err));
  }, []);

  const handlePrendreRDV = (id) => {
    navigate(`/medecin/rendezvous/${id}`);
  };

  const handleTeleconsultation = (id) => {
    navigate(`/medecin/teleconsultation/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">👨‍⚕️ Mes Patients</h2>
      <div className="row">
        {patients.map((p, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.email}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-success btn-sm" onClick={() => handlePrendreRDV(p.id)}>
                    Prendre RDV
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleTeleconsultation(p.id)}>
                    Téléconsultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
