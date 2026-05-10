export default function PatientView({ dischargeInstructions, profile, sent, videoJob }) {
  return (
    <section className="patientDelivery">
      <div className="deliveryCopy">
        <p className="eyebrow">Caregiver discharge view</p>
        <h2>Mateo's video is {sent ? "ready for Mrs. Rivera" : "waiting for nurse approval"}</h2>
        <p>
          Nurse Dana reviewed the Spanish video against the encounter transcript, patient profile, and printed
          discharge plan. These notes are written for Mateo's mom and do not replace the plan with exact doses.
        </p>
        <div className="dischargeInstructions">
          {dischargeInstructions.map((instruction) => (
            <article key={instruction.topic}>
              <h3>{instruction.topic}</h3>
              <div className="bilingualPair">
                <div className="languageColumn">
                  <strong>Espanol</strong>
                  <p>{instruction.spanish}</p>
                </div>
                <div className="languageColumn">
                  <strong>English</strong>
                  <p>{instruction.english}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="deliveryVideo">
        <video controls poster={profile.avatarImageUrl} src={videoJob?.videoUrl || ""} />
        <p>{videoJob?.note}</p>
      </div>
    </section>
  );
}
