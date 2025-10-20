import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../api';

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patients')
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => console.error('Erreur API:', err.response?.status, err.response?.data));
  }, []);

  return (
    <div className="card m-4">
      <h2 className="text-xl font-semibold mb-4">Liste des patients</h2>
      <DataTable value={patients} paginator rows={10} loading={loading} responsiveLayout="scroll">
        <Column field="name" header="Nom" sortable />
        <Column field="email" header="Email" />
        <Column field="age" header="Âge" />
        <Column field="ville" header="Ville" />
        <Column field="created_at" header="Inscrit le" />
      </DataTable>
    </div>
  );
};

export default PatientsTable;
