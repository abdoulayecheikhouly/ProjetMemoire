// src/components/Navbar.js
import React from "react";

export default function Navbar({ title }) {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div>
        {/* Ici tu peux ajouter des icônes de profil ou notifications */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Profil</button>
      </div>
    </div>
  );
}
