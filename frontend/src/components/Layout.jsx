import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserMd, FaUserInjured, FaUsers, FaPowerOff } from "react-icons/fa";

export default function Layout({ children }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "Utilisateur";
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = {
    patient: { label: "Médecins", icon: <FaUserMd />, path: "/dashboard-patient" },
    doctor: { label: "Patients", icon: <FaUserInjured />, path: "/dashboard-medecin" },
    admin: { label: "Utilisateurs", icon: <FaUsers />, path: "/dashboard-admin" },
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white p-3 d-flex flex-column" style={{ width: "250px" }}>
        {/* Avatar + nom */}
        <div className="d-flex align-items-center mb-4">
          <div className="bg-white rounded-circle text-primary d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
            <FaUserMd />
          </div>
          <span className="ms-2 fw-bold">{name}</span>
        </div>

        {/* Menu */}
        <ul className="list-unstyled flex-grow-1">
          <li className="mb-3">
            <Link to={menuItems[role]?.path} className="text-white text-decoration-none d-flex align-items-center">
              {menuItems[role]?.icon}
              <span className="ms-2">{menuItems[role]?.label}</span>
            </Link>
          </li>
        </ul>

        {/* Déconnexion */}
        <button onClick={logout} className="btn btn-outline-light mt-auto d-flex align-items-center">
          <FaPowerOff className="me-2" />
          Déconnexion
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-grow-1 bg-light">
        {/* Header sticky */}
        <div className="bg-white px-4 py-3 shadow-sm sticky-top d-flex align-items-center justify-content-between">
          <h4 className="text-primary mb-0">
            {role === "doctor" && "👨‍⚕️ Mes Patients"}
            {role === "patient" && "🩺 Médecins disponibles"}
            {role === "admin" && "👩‍💼 Utilisateurs"}
          </h4>
          <span className="text-muted small">{location.pathname}</span>
        </div>

        {/* Contenu */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
