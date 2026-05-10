"use client";

const steps = [
  {
    title: "Transcript clue",
    detail: "tx-05 identifies the Spider Guy / Marvel Rivals learning hook."
  },
  {
    title: "Photo match",
    detail: "Agent matches the cue to the donated pediatric spider hero photo/avatar element."
  },
  {
    title: "Dialogue",
    detail: "ChatGPT 5.5 Responses API creates Spanish dialogue, English review text, and evidence refs."
  },
  {
    title: "Voice",
    detail: "ElevenLabs converts the approved Spanish dialogue into narration audio."
  },
  {
    title: "Video",
    detail: "HeyGen combines the photo/avatar and public audio URL into the review video."
  },
  {
    title: "Review packet",
    detail: "The app returns script, trace, audio URL, video URL, and fallback notes for Nurse Dana."
  }
];

function stepState(index, { generated, loading, matchApproved }) {
  if (generated) return "complete";
  if (loading) return "active";
  if (matchApproved && index < 2) return "complete";
  return "pending";
}

export default function GeneratePanel({
  generated,
  generationStatus,
  loading,
  matchApproved,
  onApproveMatch,
  onGenerate,
  onOpenTranscript,
  providerTrace = [],
  videoJob
}) {
  return (
    <section className="panel">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Generation pipeline</p>
          <h2>Approve the photo match, then generate</h2>
        </div>
        <span className="statusPill">{generationStatus || (matchApproved ? "match approved" : "needs match approval")}</span>
      </div>

      <div className="generationMatchGrid">
        <article className="matchCard">
          <span className="matchLabel">Transcript clue</span>
          <h3>Spider Guy / Marvel Rivals identified</h3>
          <blockquote>
            A mi casi no me escucha; solo le hace caso a ese Spider Guy del juego Marvel Rivals.
          </blockquote>
          <button className="linkButton" onClick={onOpenTranscript} type="button">
            Open transcript tx-05
          </button>
        </article>

        <article className="matchCard photoMatch">
          <span className="matchLabel">Internal asset match</span>
          <img
            src={videoJob?.avatarImageUrl || "/assets/avatars/mateo-spider-hero.jpg"}
            alt="Donated pediatric spider hero photo/avatar element"
          />
          <div>
            <h3>{videoJob?.avatarMatchLabel || "Matched donated spider hero avatar"}</h3>
            <p>
              Agent deployed internal match to studio-donated photo elements. The final media is withheld until Nurse
              Dana approves this match and starts generation.
            </p>
          </div>
        </article>
      </div>

      <div className="generationGate">
        <button className="secondaryButton" onClick={onApproveMatch} disabled={matchApproved || loading} type="button">
          {matchApproved ? "Match approved" : "Approve match"}
        </button>
        <button className="primaryButton" onClick={onGenerate} disabled={!matchApproved || loading} type="button">
          {loading ? "Generating..." : "Generate video packet"}
        </button>
        <p>
          APIs live here: transcript to ChatGPT 5.5, dialogue to ElevenLabs, then photo plus audio to HeyGen. Cached
          assets keep the demo deterministic when keys or public media URLs are missing.
        </p>
      </div>

      <div className="progressGrid">
        {steps.map((step, index) => (
          <div
            className={`progressStep ${stepState(index, { generated, loading, matchApproved })}`}
            key={step.title}
          >
            <span>{index + 1}</span>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
          </div>
        ))}
      </div>

      {providerTrace.length > 0 && (
        <div className="providerTrace">
          <h3>Provider trace</h3>
          <div className="traceGrid">
            {providerTrace.map((trace) => (
              <article key={`${trace.step}-${trace.status}`}>
                <span>{trace.status}</span>
                <strong>{trace.step}</strong>
                <p>{trace.detail}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
