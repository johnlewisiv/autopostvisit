"use client";

export default function ScriptReview({ script, selectedSceneId, onSelectScene }) {
  if (!script) {
    return (
      <section className="panel emptyState">
        <h2>Generated Script</h2>
        <p>
          Generate the Mateo video packet to load Spanish avatar dialogue, English review text, and the evidence map.
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Generated script</p>
          <h2>Bilingual superhero dialogue</h2>
        </div>
        <span className="statusPill">{script.readingLevel}</span>
      </div>
      <div className="sceneList">
        {script.scenes.map((scene) => (
          <button
            className={`sceneCard ${selectedSceneId === scene.sceneId ? "selected" : ""}`}
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
                <strong>English nurse review</strong>
                <p>{scene.englishReviewText}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
