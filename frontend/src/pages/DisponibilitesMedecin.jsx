import React, { useState, useEffect } from "react";
import api from "../api";
import Layout from "../components/Layout";
import RoleGuard from "../components/RoleGuard";

export default function DisponibilitesMedecin() {
  const [jour, setJour] = useState("lundi");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [slots, setSlots] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/availabilities", { jour, heure_debut: heureDebut, heure_fin: heureFin });
      fetchSlots();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const fetchSlots = async () => {
    const res = await api.get("/availabilities");
    setSlots(res.data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <RoleGuard allowedRoles={['doctor']}>
      <Layout>
        <h2 className="mb-4">🗓️ Mes disponibilités</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-4">
              <label>Jour</label>
              <select className="form-control" value={jour} onChange={e => setJour(e.target.value)}>
                <option>lundi</option>
                <option>mardi</option>
                <option>mercredi</option>
                <option>jeudi</option>
                <option>vendredi</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Heure début</label>
              <input type="time" className="form-control" value={heureDebut} onChange={e => setHeureDebut(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label>Heure fin</label>
              <input type="time" className="form-control" value={heureFin} onChange={e => setHeureFin(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-success mt-3">Ajouter</button>
        </form>

        <h5>Créneaux enregistrés :</h5>
        <ul className="list-group">
          {slots.map(slot => (
            <li key={slot.id} className="list-group-item">
              {slot.jour} : {slot.heure_debut} → {slot.heure_fin}
            </li>
          ))}
        </ul>
      </Layout>
    </RoleGuard>
  );
}
