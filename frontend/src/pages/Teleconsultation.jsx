import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import RoleGuard from "../components/RoleGuard";
import Jitsi from "react-jitsi";

export default function Teleconsultation() {
  const { id } = useParams(); // ID du rendez-vous

  const userName = localStorage.getItem("role") + "-" + localStorage.getItem("token")?.slice(0, 5);

  return (
    <RoleGuard allowedRoles={['doctor', 'patient']}>
      <Layout>
        <h2 className="mb-4">🩺 Téléconsultation</h2>
        <div className="card p-3">
          <Jitsi
            roomName={`teleconsultation-${id}`}
            displayName={userName}
            domain="meet.jit.si"
            config={{ prejoinPageEnabled: false }}
            interfaceConfig={{ filmStripOnly: false }}
            style={{ height: "600px", width: "100%" }}
          />
        </div>
      </Layout>
    </RoleGuard>
  );
}
