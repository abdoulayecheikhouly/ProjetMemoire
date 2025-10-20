import React, { useEffect, useState } from "react";
import api from "../api";
import RoleGuard from "../components/RoleGuard";
import Layout from "../components/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DashboardPatient() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/doctors")
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur API:", err.response?.status));
  }, []);

  return (
    <RoleGuard allowedRoles={['patient']}>
      <Layout>
        <h2 className="text-primary mb-4">👨‍⚕️ Médecins disponibles</h2>
        <div className="card p-4">
          <DataTable value={doctors} paginator rows={10} loading={loading} responsiveLayout="scroll">
            <Column field="name" header="Nom" sortable />
            <Column field="email" header="Email" />
            <Column field="specialite" header="Spécialité" />
            <Column field="ville" header="Ville" />
          </DataTable>
        </div>
      </Layout>
    </RoleGuard>
  );
}
