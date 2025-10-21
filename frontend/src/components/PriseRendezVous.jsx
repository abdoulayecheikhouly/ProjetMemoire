import React, { useState } from "react";
import axios from "axios";

export default function PriseRendezVous() {
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8000/api/appointments", {
        date,
        heure,
        doctor_id: doctorId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Rendez-vous enregistré !");
      setDate(""); setHeure(""); setDoctorId("");
    } catch (err) {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Prendre un rendez-vous</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Heure</label>
          <input type="time" className="form-control" value={heure} onChange={e => setHeure(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Médecin</label>
          <select className="form-select" value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
            <option value="">-- Choisir un médecin --</option>
            <option value="1">Dr. Ndiaye</option>
            <option value="2">Dr. Diop</option>
            {/* Tu peux charger dynamiquement la liste depuis /api/doctors */}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Valider</button>
      </form>
    </div>
  );
}
