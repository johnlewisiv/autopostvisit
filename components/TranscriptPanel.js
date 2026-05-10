import DemoSourceLockup from "@/components/DemoSourceLockup";

export default function TranscriptPanel({ transcript }) {
  return (
    <section className="panel">
      <div className="sectionHeader">
        <div className="transcriptTitleBlock">
          <DemoSourceLockup kind="suki" compact />
          <h2>{transcript.title}</h2>
        </div>
      </div>
      <div className="transcriptList">
        {transcript.transcriptSegments.map((segment) => (
          <article className="transcriptRow" key={segment.id} id={segment.id}>
            <div>
              <strong>{segment.speaker}</strong>
              <span>{segment.id}</span>
            </div>
            {segment.englishText ? (
              <div className="bilingualPair transcriptTranslation">
                <div className="languageColumn">
                  <strong>Encounter line</strong>
                  <p>{segment.text}</p>
                </div>
                <div className="languageColumn">
                  <strong>English translation</strong>
                  <p>{segment.englishText}</p>
                </div>
              </div>
            ) : (
              <p>{segment.text}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
