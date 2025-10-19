// src/pages/DashboardPatient.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function DashboardPatient() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/doctors")
      .then(res => {
        console.log("✅ Médecins reçus :", res.data);
        setDoctors(res.data);
      })
      .catch(err => console.error("❌ Erreur API :", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">👨‍⚕️ Médecins disponibles</h2>
      <div className="row">
        {doctors.map((doc, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{doc.name}</h5>
                <p className="card-text">Note : {doc.rate} ⭐</p>
                <p className="card-text">Distance : {doc.distance} km</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-success btn-sm">
                    Prendre RDV
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
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
