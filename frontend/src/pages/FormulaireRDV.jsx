import React from "react";
import { useParams } from "react-router-dom";

export default function FormulaireRDV() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h3>Créer un RDV pour le patient #{id}</h3>
      <form>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label>Heure</label>
          <input type="time" className="form-control" />
        </div>
        <div className="mb-3">
          <label>Motif</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>
        <button className="btn btn-success">Valider</button>
      </form>
    </div>
  );
}
