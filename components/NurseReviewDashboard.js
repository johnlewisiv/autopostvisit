"use client";

function EvidencePanel({ scene }) {
  if (!scene) {
    return <p className="muted">Select a generated line to review evidence.</p>;
  }

  return (
    <div className="evidenceStack">
      {scene.evidenceRefs.map((ref) => (
        <article className="evidenceCard" key={`${ref.sourceType}-${ref.sourceId}-${ref.quote}`}>
          <div>
            <span className="sourceType">{ref.sourceType}</span>
            <strong>{ref.sourceId}</strong>
          </div>
          <blockquote>{ref.quote}</blockquote>
          <p>{ref.explanation}</p>
        </article>
      ))}
    </div>
  );
}

export default function NurseReviewDashboard({
  profile,
  nurse,
  script,
  videoJob,
  selectedSceneId,
  onSelectScene,
  approved,
  sent,
  onApprove,
  onSend
}) {
  const selectedScene = script?.scenes.find((scene) => scene.sceneId === selectedSceneId) || script?.scenes[0];

  return (
    <section className="reviewGrid">
      <div className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Final video preview</p>
            <h2>Matched avatar result</h2>
          </div>
          <span className="statusPill">{videoJob?.status || "pending"}</span>
        </div>
        <div className="videoFrame">
          <video controls poster={profile.avatarImageUrl} src={videoJob?.videoUrl || ""}>
            Your browser does not support video playback.
          </video>
          <p className="videoFallback">{videoJob?.note}</p>
        </div>
        <dl className="facts compact">
          <div><dt>Patient</dt><dd>{profile.name}</dd></div>
          <div><dt>Language</dt><dd>{profile.language}</dd></div>
          <div><dt>Reading level</dt><dd>{profile.readingLevel}</dd></div>
          <div><dt>Avatar</dt><dd>{videoJob?.avatarMatchLabel || profile.preferredNarratorStyle}</dd></div>
        </dl>
      </div>

      <div className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Nurse review</p>
            <h2>Scene-by-scene script</h2>
          </div>
          <span className="statusPill">{approved ? "Approved" : "Needs review"}</span>
        </div>
        <article className="nurseReviewer">
          <img src={nurse.imageUrl} alt="Nurse Dana staff photo" />
          <div>
            <span>{nurse.role}</span>
            <strong>{nurse.name}</strong>
            <p>{nurse.reviewNote}</p>
          </div>
        </article>
        <div className="sceneList review">
          {script?.scenes.map((scene) => (
            <button
              className={`sceneCard ${selectedScene?.sceneId === scene.sceneId ? "selected" : ""}`}
              key={scene.sceneId}
              onClick={() => onSelectScene(scene.sceneId)}
              type="button"
            >
              <span>{scene.title}</span>
              <div className="bilingualPair">
                <div className="languageColumn">
                  <strong>Spanish video line</strong>
                  <p>{scene.dialogue}</p>
                </div>
                <div className="languageColumn">
                  <strong>English check</strong>
                  <p>{scene.englishReviewText}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="actionRow">
          <button className="secondaryButton" type="button">Edit line</button>
          <button className="secondaryButton" type="button">Regenerate simpler</button>
          <button className="dangerButton" type="button">Flag unsupported</button>
        </div>
        <div className="actionRow">
          <button className="primaryButton" onClick={onApprove} type="button">Approve</button>
          <button className="primaryButton" onClick={onSend} disabled={!approved} type="button">
            {sent ? "Shared" : "Share with caregiver"}
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Knowledge map</p>
            <h2>Evidence for selected line</h2>
          </div>
        </div>
        <EvidencePanel scene={selectedScene} />
      </div>
    </section>
  );
}
