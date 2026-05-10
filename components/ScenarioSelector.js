"use client";

import DemoSourceLockup from "@/components/DemoSourceLockup";

export default function ScenarioSelector({ patients, selectedPatient, onSelect }) {
  return (
    <section className="panel">
      <div className="sectionHeader">
        <div>
          <DemoSourceLockup kind="epic" compact />
          <h2>Demo Scenarios</h2>
        </div>
        <span className="statusPill">3 patients</span>
      </div>

      <div className="patientGrid">
        {patients.map((patient) => (
          <button
            key={patient.id}
            className={`patientCard ${patient.id === selectedPatient.id ? "selected" : ""}`}
            onClick={() => onSelect(patient)}
            type="button"
          >
            <span className="cardTitle">{patient.name}</span>
            <span>{patient.age} years old</span>
            <span>{patient.language} · {patient.readingLevel}</span>
            <strong>{patient.scenario}</strong>
            <small>{patient.status}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
