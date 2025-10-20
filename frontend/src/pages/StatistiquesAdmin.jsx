import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import RoleGuard from "../components/RoleGuard";

export default function StatistiquesAdmin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur stats:", err.response?.status));
  }, []);

  return (
    <RoleGuard allowedRoles={['admin']}>
      <Layout>
        <h2 className="mb-4">📊 Statistiques</h2>
        {stats ? (
          <ul className="list-group">
            <li className="list-group-item">Utilisateurs : {stats.total_users}</li>
            <li className="list-group-item">Patients : {stats.total_patients}</li>
            <li className="list-group-item">Médecins : {stats.total_doctors}</li>
            <li className="list-group-item">Rendez-vous total : {stats.total_appointments}</li>
            <li className="list-group-item">Rendez-vous aujourd’hui : {stats.appointments_today}</li>
          </ul>
        ) : (
          <p>Chargement...</p>
        )}
      </Layout>
    </RoleGuard>
  );
}
