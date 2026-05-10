export function buildPatientMarkdown(profile) {
  return `# Patient Education Profile

## Patient
Name: ${profile.name}
Age: ${profile.age}
Primary language: ${profile.language}
Education level: ${profile.readingLevel}
Caregiver: ${profile.caregiver}

## Communication Preferences
Preferred explanation style: ${profile.communicationPreferences.join(", ")}
Preferred format: animated avatar video
Preferred narrator style: ${profile.preferredNarratorStyle}
Avoid: scary medical language, graphic anatomy, blame
Use: short sentences, repetition, visual examples, caregiver coaching

## Health Context
Relevant history: ${profile.healthHistory.join("; ")}
Allergies: ${profile.allergies.join(", ")}
Current medications: ${profile.currentMedications.join(", ")}

## Visit Education Preferences
Explain to: caregiver and child
Include caregiver instructions: yes
Include return precautions: yes
Include medication instructions: yes

## Avatar
Avatar preference before visit: ${profile.preferredNarratorStyle}
Avatar selection source: ${profile.avatarSelectionSource || "selected from patient profile"}
Matched avatar image: ${profile.avatarImageUrl}
Voice style: ${profile.preferredVoiceStyle}
Voice ID: ${profile.voiceId}
`;
}
