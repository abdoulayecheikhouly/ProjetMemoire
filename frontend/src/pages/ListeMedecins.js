import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ListeMedecins() {
  const [medecins, setMedecins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/doctors").then(res => setMedecins(res.data));
  }, []);

  return (
    <ul>
      {medecins.map(m => (
        <li key={m.id}>
          👨‍⚕️ {m.name} — {m.specialite?.nom || m.diplomes}
          <button onClick={() => navigate(`/prendre-rdv/${m.id}`)}>📅 Prendre RDV</button>
        </li>
      ))}
    </ul>
  );
}
