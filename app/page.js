"use client";

import { useMemo, useState } from "react";
import GeneratePanel from "@/components/GeneratePanel";
import DemoSourceLockup from "@/components/DemoSourceLockup";
import NurseReviewDashboard from "@/components/NurseReviewDashboard";
import PatientView from "@/components/PatientView";
import ProfilePanel from "@/components/ProfilePanel";
import ScenarioSelector from "@/components/ScenarioSelector";
import ScriptReview from "@/components/ScriptReview";
import TranscriptPanel from "@/components/TranscriptPanel";
import {
  caregiverDischargeInstructions,
  encounterTranscript,
  generatedScript,
  mateoFaceSheet,
  mateoProfile,
  nurseDana,
  patients,
  videoJob as fixtureVideoJob
} from "@/lib/fixtures";

const navItems = [
  "Scenarios",
  "Profile",
  "Transcript",
  "Generate",
  "Script",
  "Nurse Review",
  "Patient View"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Scenarios");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [script, setScript] = useState(null);
  const [videoJob, setVideoJob] = useState(fixtureVideoJob);
  const [loading, setLoading] = useState(false);
  const [selectedSceneId, setSelectedSceneId] = useState("scene-01");
  const [approved, setApproved] = useState(false);
  const [sent, setSent] = useState(false);
  const [matchApproved, setMatchApproved] = useState(false);
  const [providerTrace, setProviderTrace] = useState(fixtureVideoJob.providerTrace || []);
  const [generationStatus, setGenerationStatus] = useState(fixtureVideoJob.status);

  const profile = useMemo(() => mateoProfile, []);

  async function handleGenerate() {
    if (!matchApproved || loading) {
      return;
    }

    setLoading(true);
    setActiveTab("Generate");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: profile.id,
          transcriptId: encounterTranscript.id,
          approvedAvatarMatch: true
        })
      });
      const data = await response.json();
      setScript(data.script || generatedScript);
      setVideoJob(data.videoJob || fixtureVideoJob);
      setProviderTrace(data.providerTrace || data.videoJob?.providerTrace || fixtureVideoJob.providerTrace || []);
      setGenerationStatus(data.generationStatus || data.videoJob?.status || fixtureVideoJob.status);
      setSelectedSceneId((data.script || generatedScript).scenes[0].sceneId);
      setTimeout(() => setActiveTab("Nurse Review"), 500);
    } catch {
      setScript(generatedScript);
      setVideoJob(fixtureVideoJob);
      setProviderTrace(fixtureVideoJob.providerTrace || []);
      setGenerationStatus("cached_provider_result");
      setSelectedSceneId(generatedScript.scenes[0].sceneId);
      setTimeout(() => setActiveTab("Nurse Review"), 500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="appShell">
      <header className="hero">
        <div>
          <div className="demoSourceRail heroBrandBar" aria-label="Demo source labels">
            <DemoSourceLockup kind="epic" />
          </div>
          <p className="productName">AutoPostVisit</p>
          <h1>Nurse-reviewed post-visit custom discharge videos</h1>
        </div>
        <div className="heroPatient">
          <img src="/assets/facesheets/mateo-ehr-profile.png" alt="Mateo profile" />
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.age} · {profile.language} · {profile.readingLevel}</span>
            <small>{profile.scenario}</small>
          </div>
        </div>
      </header>

      <nav className="tabs" aria-label="Demo workflow">
        {navItems.map((item) => (
          <button
            className={activeTab === item ? "active" : ""}
            key={item}
            onClick={() => setActiveTab(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      {activeTab === "Scenarios" && (
        <ScenarioSelector patients={patients} selectedPatient={selectedPatient} onSelect={setSelectedPatient} />
      )}
      {activeTab === "Profile" && <ProfilePanel profile={profile} faceSheet={mateoFaceSheet} nurse={nurseDana} />}
      {activeTab === "Transcript" && <TranscriptPanel transcript={encounterTranscript} />}
      {activeTab === "Generate" && (
        <GeneratePanel
          generated={Boolean(script)}
          generationStatus={generationStatus}
          loading={loading}
          matchApproved={matchApproved}
          onApproveMatch={() => setMatchApproved(true)}
          onGenerate={handleGenerate}
          onOpenTranscript={() => setActiveTab("Transcript")}
          providerTrace={providerTrace}
          videoJob={videoJob}
        />
      )}
      {activeTab === "Script" && (
        <ScriptReview script={script || generatedScript} selectedSceneId={selectedSceneId} onSelectScene={setSelectedSceneId} />
      )}
      {activeTab === "Nurse Review" && (
        <NurseReviewDashboard
          profile={profile}
          nurse={nurseDana}
          script={script || generatedScript}
          videoJob={videoJob}
          selectedSceneId={selectedSceneId}
          onSelectScene={setSelectedSceneId}
          approved={approved}
          sent={sent}
          onApprove={() => setApproved(true)}
          onSend={() => {
            setApproved(true);
            setSent(true);
            setActiveTab("Patient View");
          }}
        />
      )}
      {activeTab === "Patient View" && (
        <PatientView
          dischargeInstructions={caregiverDischargeInstructions}
          profile={profile}
          sent={sent}
          videoJob={videoJob}
        />
      )}
    </main>
  );
}
