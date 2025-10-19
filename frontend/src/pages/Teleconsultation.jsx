import React from "react";
import { useParams } from "react-router-dom";

export default function Teleconsultation() {
  const { id } = useParams();
  const roomName = `teleconsultation-${id}`;

  return (
    <div className="container mt-5">
      <h3>Visio avec le patient #{id}</h3>
      <iframe
        src={`https://meet.jit.si/${roomName}`}
        style={{ width: "100%", height: "600px", border: "0px" }}
        allow="camera; microphone; fullscreen; display-capture"
        title="Jitsi Meet"
      />
    </div>
  );
}
