import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import RoleGuard from "../components/RoleGuard";

export default function HistoriquePatient() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/patient/appointments")
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Erreur historique:", err.response?.status));
  }, []);

  return (
    <RoleGuard allowedRoles={['patient']}>
      <Layout>
        <h2 className="mb-4">📁 Historique de mes consultations</h2>
        <ul className="list-group">
          {appointments.map(rdv => (
            <li key={rdv.id} className="list-group-item">
              {rdv.date} à {rdv.heure} avec Dr {rdv.doctor?.name} ({rdv.status})
            </li>
          ))}
        </ul>
      </Layout>
    </RoleGuard>
  );
}
