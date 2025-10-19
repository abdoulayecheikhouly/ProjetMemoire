import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegisterBootstrap() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas");
    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
        role,
      });
      alert("Compte créé !");
      navigate("/login");
    } catch (err) {
      setError("Erreur d’inscription");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="mb-4 text-center">Inscription</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input type="password" className="form-control" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rôle</label>
                  <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Médecin</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">S’inscrire</button>
              </form>
              <p className="mt-3 text-center">
                Déjà inscrit ? <a href="/login">Se connecter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
