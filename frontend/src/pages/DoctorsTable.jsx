import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../api';

const DoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/doctors')
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(err => console.error('Erreur API:', err.response?.status, err.response?.data));
  }, []);

  return (
    <div className="card m-4">
      <h2 className="text-xl font-semibold mb-4">Liste des médecins</h2>
      <DataTable value={doctors} paginator rows={10} loading={loading} responsiveLayout="scroll">
        <Column field="name" header="Nom" sortable />
        <Column field="email" header="Email" />
        <Column field="specialite" header="Spécialité" />
        <Column field="created_at" header="Inscrit le" />
      </DataTable>
    </div>
  );
};

export default DoctorsTable;
