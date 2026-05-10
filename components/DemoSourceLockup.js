const sourceConfig = {
  epic: {
    imageUrl: "/assets/logos/simulated-epic-logo.png",
    alt: "Simulated Epic"
  },
  suki: {
    imageUrl: "/assets/logos/synthetic-suki-transcript-logo.png",
    alt: "Synthetic Suki Transcript"
  }
};

export default function DemoSourceLockup({ kind, compact = false }) {
  const source = sourceConfig[kind];

  if (!source) {
    return null;
  }

  return (
    <div className={`demoSourceLockup ${kind} ${compact ? "compact" : ""}`}>
      <img src={source.imageUrl} alt={source.alt} />
    </div>
  );
}
