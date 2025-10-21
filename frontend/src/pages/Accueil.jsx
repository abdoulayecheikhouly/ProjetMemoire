import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Accueil.css";

export default function Accueil() {
  const navigate = useNavigate();

  const handleStart = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login");
    } else if (role === "patient") {
      navigate("/dashboard-patient");
    } else if (role === "medecin") {
      navigate("/dashboard-medecin");
    } else if (role === "admin") {
      navigate("/dashboard-admin");
    } else {
      navigate("/login"); // fallback si rôle inconnu
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="accueil-container"
      style={{
        backgroundImage: 'url("/bg-medical.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
      }}
    >
      {/* Barre supérieure */}
      <nav className="d-flex justify-content-between align-items-center p-3">
        <h2 className="text-light">Kay Fadju</h2>
        <div>
          <button className="btn btn-outline-light me-2" onClick={goToLogin}>
            Se connecter
          </button>
          <button className="btn btn-light text-primary" onClick={goToRegister}>
            Créer un compte
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="text-center mt-5">
        <h1 className="display-4 fw-bold">Consultez un médecin en ligne aujourd'hui</h1>
        <p className="lead mt-3">
          Santé mentale et physique • Avec ou sans rendez-vous • Disponible 7j/7 de 6h à 23h
        </p>
        <button className="btn btn-success btn-lg mt-4" onClick={handleStart}>
          Commencer maintenant
        </button>
      </div>

      {/* Services */}
      <div className="container mt-5 mb-5">
        <div className="row text-center text-dark bg-light rounded py-4">
          <div className="col-md-4">
            <h5>📞 Consultation rapide</h5>
            <p>Un médecin vous répond en moins de 10 minutes</p>
          </div>
          <div className="col-md-4">
            <h5>💊 Ordonnances en ligne</h5>
            <p>Recevez vos prescriptions directement en pharmacie</p>
          </div>
          <div className="col-md-4">
            <h5>🩺 Suivi personnalisé</h5>
            <p>Un médecin vous accompagne dans votre traitement</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-light pb-3 small">
        © 2025 Kay Fadju – Plateforme de Téléconsultation
      </footer>
    </div>
  );
}
