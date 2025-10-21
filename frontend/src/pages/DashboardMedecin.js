import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import RoleGuard from "../components/RoleGuard";
import Layout from "../components/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function DashboardMedecin() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  <Column field="status" header="Statut" body={(rowData) => (
  <span className={`badge bg-${rowData.status === 'confirmé' ? 'success' : rowData.status === 'annulé' ? 'danger' : 'warning'}`}>
    {rowData.status}
  </span>
)} />


  useEffect(() => {
    api.get("/patients")
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur chargement patients:", err.response?.status));
  }, []);

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button label="RDV" icon="pi pi-calendar" className="p-button-success p-button-sm"
              onClick={() => navigate(`/medecin/rendezvous/${rowData.id}`)} />
      <Button label="Téléconsultation" icon="pi pi-video" className="p-button-primary p-button-sm"
              onClick={() => navigate(`/medecin/teleconsultation/${rowData.id}`)} />
    </div>
  );

  return (
    <RoleGuard allowedRoles={['doctor']}>
      <Layout>
        <h2 className="text-success mb-4">👨‍⚕️ Mes Patients</h2>
        <div className="card p-4">
          <DataTable value={patients} paginator rows={10} loading={loading} responsiveLayout="scroll">
            <Column field="name" header="Nom" sortable />
            <Column field="email" header="Email" />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </Layout>
    </RoleGuard>
  );
}
