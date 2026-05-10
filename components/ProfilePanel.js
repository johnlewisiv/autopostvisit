"use client";

import DemoSourceLockup from "@/components/DemoSourceLockup";

export default function ProfilePanel({ profile, faceSheet, nurse }) {
  return (
    <section className="twoColumn">
      <div className="panel">
        <div className="sectionHeader">
          <div>
            <DemoSourceLockup kind="epic" compact />
            <h2>Mateo EHR Snapshot</h2>
          </div>
          <span className="statusPill">Synthetic patient</span>
        </div>
        <img className="faceSheetImage" src={profile.faceSheetImageUrl} alt="Mateo EHR profile" />
        <dl className="facts">
          <div><dt>MRN</dt><dd>{faceSheet.mrn}</dd></div>
          <div><dt>Visit</dt><dd>{faceSheet.visitType}</dd></div>
          <div><dt>Language</dt><dd>{faceSheet.primaryLanguage}</dd></div>
          <div><dt>Caregiver</dt><dd>{faceSheet.caregiver}</dd></div>
        </dl>
        <article className="nurseStaffCard">
          <img src={nurse.imageUrl} alt="Nurse Dana staff photo" />
          <div>
            <p className="eyebrow">Assigned nurse reviewer</p>
            <strong>{nurse.name}</strong>
            <span>{nurse.role}</span>
          </div>
        </article>
      </div>

      <div className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">PatientProfile.md</p>
            <h2>Education Profile</h2>
          </div>
          <span className="statusPill">Generated</span>
        </div>
        <pre className="markdownPreview">{profile.markdownProfile}</pre>
      </div>
    </section>
  );
}
