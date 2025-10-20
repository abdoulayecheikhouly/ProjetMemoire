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
  const [rdvToday, setRdvToday] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/patients")
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur chargement patients:", err.response?.status));

    api.get("/appointments/today")
      .then(res => setRdvToday(res.data.count))
      .catch(err => console.error("Erreur RDV aujourd’hui:", err.response?.status));
  }, []);

  const actionTemplate = (rowData) => (
    <div className="d-flex gap-2">
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

        {/* Card statistique */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-success shadow-sm">
              <div className="card-body">
                <h5 className="card-title">RDV aujourd’hui</h5>
                <p className="card-text fs-4">{rdvToday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des patients */}
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
