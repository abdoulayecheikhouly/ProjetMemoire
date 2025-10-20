import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import api from '../api';

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/user')
      .then(res => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => console.error('Erreur API:', err.response?.status, err.response?.data));
  }, []);

  const deleteUser = (id) => {
    api.delete(`/admin/user/${id}`)
      .then(() => setUsers(prev => prev.filter(user => user.id !== id)))
      .catch(err => console.error('Erreur suppression:', err.response?.status));
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" className="p-button-info p-button-sm" />
      <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" />
      <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => deleteUser(rowData.id)} />
    </div>
  );

  return (
    <div className="card m-4">
      <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
      <DataTable value={users} paginator rows={10} loading={loading} responsiveLayout="scroll">
        <Column field="name" header="Nom" sortable />
        <Column field="email" header="Email" />
        <Column field="role" header="Rôle" />
        <Column field="created_at" header="Inscrit le" />
        <Column body={actionTemplate} header="Actions" />
      </DataTable>
    </div>
  );
};

export default AdminUsersTable;
