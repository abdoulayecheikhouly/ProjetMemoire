import React, { useEffect, useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardAdmin() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [activeTab, setActiveTab] = useState("accueil");

  useEffect(() => {
    api.get("/admin/user")
      .then(res => setUtilisateurs(res.data.users))
      .catch(err => console.error("Erreur utilisateurs:", err.response?.status));

    api.get("/admin/appointments")
      .then(res => setRendezVous(res.data))
      .catch(err => console.error("Erreur rendez-vous:", err.response?.status));
  }, []);

  const handleDeleteRDV = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      api.delete(`/admin/user/${id}`)
        .then(() => setUtilisateurs(prev => prev.filter(u => u.id !== id)))
        .catch(err => alert("Erreur suppression"));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "accueil":
        return (
          <div className="p-4">
            <h2 className="text-primary mb-3">Bienvenue Admin</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Utilisateurs</h5>
                    <p className="card-text">{utilisateurs.length} inscrits</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Rendez-vous</h5>
                    <p className="card-text">{rendezVous.length} programmés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "utilisateurs":
        return (
          <div className="p-4">
            <h2 className="mb-3">Liste des utilisateurs</h2>
            <ul className="list-group">
              {utilisateurs.map(u => (
                <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><strong>{u.name}</strong> — {u.role} — {u.email}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteRDV(u.id)}>🗑</button>
                </li>
              ))}
            </ul>
          </div>
        );

      case "rendezvous":
        return (
          <div className="p-4">
            <h2 className="mb-3">Rendez-vous</h2>
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Patient</th>
                  <th>Médecin</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {rendezVous.map(r => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>{r.heure}</td>
                    <td>{r.patient?.name}</td>
                    <td>{r.doctor?.name}</td>
                    <td>
                      <span className={`badge bg-${r.status === "confirmé" ? "success" : "secondary"}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Admin Panel</span>
      </nav>
      <div className="row">
        <div className="col-md-3 bg-light vh-100 p-3 border-end">
          <h4 className="mb-4">Navigation</h4>
          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary" onClick={() => setActiveTab("accueil")}>Accueil</button>
            <button className="btn btn-outline-primary" onClick={() => setActiveTab("utilisateurs")}>Utilisateurs</button>
            <button className="btn btn-outline-primary" onClick={() => setActiveTab("rendezvous")}>Rendez-vous</button>
          </div>
        </div>
        <div className="col-md-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
