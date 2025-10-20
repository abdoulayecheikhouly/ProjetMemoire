import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";
import RoleGuard from "../components/RoleGuard";

export default function DossierPatient() {
  const { id } = useParams(); // ID du rendez-vous
  const [record, setRecord] = useState(null);

  useEffect(() => {
    api.get(`/medical-records/${id}`).then(res => setRecord(res.data));
  }, [id]);

  return (
    <RoleGuard allowedRoles={['patient']}>
      <Layout>
        <h2 className="mb-4">📁 Mon dossier médical</h2>
        {record ? (
          <div className="card p-3">
            <h5>Notes :</h5>
            <p>{record.notes}</p>
            <h5>Prescription :</h5>
            <p>{record.prescription}</p>
          </div>
        ) : (
          <p>Aucun dossier disponible pour ce rendez-vous.</p>
        )}
      </Layout>
    </RoleGuard>
  );
}
