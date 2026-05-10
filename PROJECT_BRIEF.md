# AutoPostVisit Project Brief

Working name: **AutoPostVisit**
Status: Hackathon MVP source of truth
Primary demo patient: **Mateo Rivera**

## 1. Product Pitch

AutoPostVisit turns a completed clinician-patient encounter into a personalized, nurse-reviewed after-visit explainer video. The product uses a pre-visit patient education profile, an encounter transcript, and a grounded AI generation step to create a simple video script, narration, and talking-avatar video that a nurse can review before sending to the patient or caregiver.

The key product promise is not just "AI makes a video." The promise is that the nurse can verify every important generated line against the actual encounter transcript and the patient's education profile before the video is sent.

## 2. Hackathon Goal

Build a polished runnable web demo that feels like a real healthcare workflow, not a static mockup. The app should be GitHub-ready and runnable locally by judges or teammates.

The MVP should demonstrate:

- A realistic Epic-style nurse workflow.
- Synthetic but stable patient fixtures.
- A generated `PatientProfile.md` preview.
- A visible encounter transcript.
- A real generation action from the UI.
- A script adapted to the patient's language, age, and reading level.
- Evidence references beside generated lines.
- Voice/avatar/video generation status.
- Nurse approval before patient delivery.
- A patient-facing video delivery screen.

Current demo assets already available:

- Synthetic Mateo EHR/face image: `/assets/facesheets/mateo-ehr-profile.png`
- Licensed pediatric spider hero avatar: `/assets/avatars/mateo-spider-hero.jpg`
- ElevenLabs Spanish audio preview: `/assets/audio/mateo-spider-hero-dialogue-2.mp3`
- HeyGen cached result target: `/assets/videos/mateo-avatar-video.mp4`

## 3. Track Alignment

This project should compete primarily in the **AutoHDR Photo-to-Video / AI video pipeline** lane, with possible secondary alignment to the **Agents** track.

The AutoHDR track values applications that make AI-powered video pipelines more controllable, useful, iterative, and production-like. AutoPostVisit fits by showing a practical healthcare video generation system where a static avatar image and generated narration become an after-visit talking-avatar video.

The product should emphasize:

- Photo/avatar-to-video generation as part of a larger useful application.
- Control over language, reading level, narrator style, and caregiver context.
- Iteration through "regenerate simpler" and nurse edit/review actions.
- Usability through a review dashboard that makes source grounding visible.
- Real-world value for patient education, discharge instructions, and caregiver support.

## 4. Core Demo Narrative

The live demo story should be:

"Mateo was onboarded before his visit. His profile says he is 7, prefers Spanish, and needs a 2nd-grade explanation. After a rushed diabetes discharge visit with a bad phone interpreter, AutoPostVisit catches an easy-to-miss caregiver comment that Mateo pays attention to a spider hero in a game. It matches that learning hook to the donated spider-hero avatar library, generates a simple Spanish after-visit video script, maps every important line to evidence, and sends the packet to the nurse. The nurse reviews the knowledge map, confirms the video matches the visit and discharge plan, approves it, and sends it to Mateo's mom."

## 5. Primary Demo Patient

### Mateo Rivera

- Age: 7
- Primary language: Spanish
- Reading level: 2nd grade
- Preferred narrator style: none recorded before visit
- Preferred voice style: Spanish voice selected after transcript analysis
- Caregiver: Elena Rivera, mother
- Scenario: Newly diagnosed with type 1 diabetes

Mateo's script should include both:

- Child-facing Spanish version.
- English version for nurse/caregiver review.

The Spanish version should be simple, warm, non-scary, and concrete. Example tone: a donated spider-hero avatar tells Mateo that Nurse Dana called, Mateo is part of the care team, and his job is to tell a grown-up when his body feels wrong.

## 6. MVP Screens

### 1. Demo Home / Scenario Selector

Show an Epic-style nurse worklist with 2-3 preloaded demo patients. Clicking Mateo loads the complete workflow.

Required patient cards:

- Mateo Rivera: 7, Spanish, 2nd grade, new type 1 diabetes, avatar match inferred after transcript analysis.
- Additional synthetic patients can be lighter-weight placeholders, but should still look credible.

### 2. Onboarding Form

Editable form fields:

- Patient name
- Age
- Language
- Reading level
- Preferred narrator style
- Voice style
- Communication preferences
- Caregiver involvement
- Health context

The form should generate a live markdown preview. The app should also ship with preloaded `.md` profiles for stable demo patients.

### 3. PatientProfile.md Preview

Show the generated markdown file in the UI.

Expected structure:

```md
# Patient Education Profile

## Patient
Name: Mateo Rivera
Age: 7
Primary language: Spanish
Education level: 2nd grade
Caregiver: Elena Rivera, mother

## Communication Preferences
Preferred explanation style: simple, warm, reassuring
Preferred format: animated avatar video
Preferred narrator style: none recorded before visit
Avoid: scary medical language, graphic anatomy
Use: short sentences, repetition, visual examples

## Health Context
Relevant history: newly diagnosed type 1 diabetes
Allergies: no known drug allergies
Current medications: insulin per discharge plan

## Visit Education Preferences
Explain to: caregiver and child
Include caregiver instructions: yes
Include return precautions: yes
Include medication instructions: yes

## Avatar
Avatar preference before visit: none recorded before visit
Avatar selection source: transcript learning hook matched to donated pediatric avatar library
Matched avatar image: /assets/avatars/mateo-spider-hero.jpg
Voice style: Spanish voice selected after transcript analysis
Voice ID: elevenlabs_voice_demo_spider_hero
```

### 4. Encounter Transcript Screen

Show a realistic, concise synthetic urgent-care or clinic transcript for Mateo's type 1 diabetes education scenario.

The transcript should be segmented so individual lines can be cited in the evidence map.

### 5. AI Processing Screen

When the user clicks **Generate video**, the app should perform the generation flow.

Visible progress steps:

- Reading encounter transcript
- Reading `PatientProfile.md`
- Extracting visit facts
- Adapting to language and reading level
- Creating dialogue
- Creating evidence map
- Preparing narration
- Preparing avatar video request

The progress sequence may be instant or lightly animated. Do not add a custom sprite animation for the first MVP.

### 6. Generated Script Screen

Show the generated patient-friendly script.

For Mateo, generate:

- Spanish child-facing version.
- English review version.
- Scene-by-scene structure.
- Evidence references for each important line.

### 7. Voice + Avatar Generation Screen

Show:

- Selected avatar image.
- Selected ElevenLabs voice.
- Generated or mocked audio file.
- HeyGen avatar video generation status.

Intended pipeline:

```text
Generated dialogue
  -> ElevenLabs text-to-speech
  -> Audio file
  -> HeyGen avatar video generation
  -> Final video
```

The target demo should generate audio and avatar video live. For reliability, keep mock fallback paths available if credentials, latency, rate limits, or provider outages block the live path.

### 8. Nurse Review Screen

Build the strongest screen here. It should feel like an Epic-adjacent nurse review dashboard.

Layout:

- Left panel: final video preview, patient info, language, reading level, narrator style.
- Middle panel: generated scene-by-scene dialogue.
- Right panel: evidence for selected line, transcript snippets, `PatientProfile.md` snippets.

Actions:

- Approve
- Edit line
- Regenerate simpler
- Flag unsupported claim
- Share with caregiver

The nurse must be able to click or select a generated line and immediately see why the system believes that line is supported.

### 9. Patient View Screen

After nurse approval, show the patient-facing delivery screen.

Include:

- Final video.
- Simple next steps.
- Medication reminder.
- Return precautions.
- Bilingual caregiver discharge instructions without a share button on this page.

## 7. Data Model

### PatientProfile

```ts
type PatientProfile = {
  id: string;
  name: string;
  age: number;
  language: string;
  readingLevel: string;
  caregiver: string;
  healthHistory: string[];
  allergies: string[];
  currentMedications: string[];
  communicationPreferences: string[];
  preferredNarratorStyle: string;
  preferredVoiceStyle: string;
  avatarImageUrl: string;
  voiceId: string;
  markdownProfile: string;
};
```

### EncounterTranscript

```ts
type EncounterTranscript = {
  id: string;
  patientId: string;
  title: string;
  rawTranscript: string;
  transcriptSegments: TranscriptSegment[];
};

type TranscriptSegment = {
  id: string;
  speaker: "clinician" | "patient" | "caregiver" | "nurse" | "system";
  text: string;
};
```

### GeneratedVideoScript

```ts
type GeneratedVideoScript = {
  id: string;
  patientId: string;
  transcriptId: string;
  language: string;
  readingLevel: string;
  scenes: GeneratedScene[];
};

type GeneratedScene = {
  sceneId: string;
  title: string;
  dialogue: string;
  englishReviewText?: string;
  evidenceRefs: EvidenceRef[];
};
```

### EvidenceRef

```ts
type EvidenceRef = {
  sourceType: "transcript" | "patient_profile" | "face_sheet";
  sourceId: string;
  quote: string;
  explanation: string;
};
```

### VideoGenerationJob

```ts
type VideoGenerationJob = {
  id: string;
  patientId: string;
  scriptId: string;
  avatarImageUrl: string;
  audioUrl?: string;
  videoUrl?: string;
  status: "idle" | "generating_script" | "generating_audio" | "generating_video" | "ready" | "approved" | "sent" | "failed";
  errorMessage?: string;
};
```

## 8. Technical Architecture

Because the current folder starts empty, the default implementation should be a minimal **Next.js / React** app.

Recommended structure:

```text
/app
  /api
    /generate-script/route.ts
    /generate-audio/route.ts
    /generate-video/route.ts
  /page.tsx
/components
  AppShell.tsx
  ScenarioSelector.tsx
  OnboardingForm.tsx
  MarkdownPreview.tsx
  TranscriptViewer.tsx
  ProcessingTimeline.tsx
  GeneratedScriptViewer.tsx
  VoiceAvatarPanel.tsx
  NurseReviewDashboard.tsx
  PatientDeliveryView.tsx
/lib
  fixtures.ts
  markdown.ts
  evidence.ts
  generation.ts
  providers/
    openai.ts
    elevenlabs.ts
    heygen.ts
    mock.ts
/public
  /assets
    /avatars
    /videos
    /audio
```

The frontend should use local React state for MVP. A database is not required for the hackathon version.

## 9. Provider Plan

Provider calls should live behind adapters so the demo can run in live API mode with a mock fallback.

### Environment Variables

Add these later in `.env.example`, never with real values:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.5-fast
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
HEYGEN_API_KEY=
NEXT_PUBLIC_DEMO_MODE=live
```

Important: real API keys should go in local `.env.local` during development and deployment provider environment variables for hosting. Do not commit `.env.local` or real keys to source control.

### OpenAI Script Generation

Input:

- Patient profile JSON.
- `PatientProfile.md`.
- Encounter transcript segments.
- Desired output language and reading level.

Output:

- JSON only.
- Patient-facing script scenes.
- English review text if patient-facing text is non-English.
- Evidence references with source IDs and quotes.
- Nurse review summary.
- Unsupported or low-confidence claims list.

### ElevenLabs Audio Generation

Input:

- Approved or generated patient-facing dialogue.
- Voice ID from patient profile.

Output:

- Audio file URL or local demo audio path.

### HeyGen Video Generation

Input:

- Avatar image URL.
- Script text or approved dialogue.
- HeyGen avatar ID created from the selected avatar image.
- HeyGen voice ID or voice settings.
- Optional scene metadata.

Output:

- Video job ID.
- Status.
- Final video URL or local demo video path.

Implementation note: prefer HeyGen's controlled Direct Video / Photo Avatar flow for the judged demo. The app should explicitly pass the selected avatar, script, voice, resolution, and aspect ratio instead of relying on a prompt-only video agent to make creative choices. If a polished Mateo video is generated ahead of time, treat it as a cached provider result and keep the same data shape the live API would return.

### Mock Mode

Mock mode should:

- Return deterministic Mateo script data.
- Return local placeholder audio/video URLs if live generation is unavailable.
- Preserve the same response shape as live mode.
- Keep the demo working if provider rate limits, credentials, or latency fail.

## 10. Grounding and Safety Principle

The app must make grounding visible.

Every generated clinical instruction should be tied to at least one evidence reference from:

- Encounter transcript.
- Patient education profile.
- Face sheet data.

The nurse review screen should make it easy to detect unsupported claims. "Flag unsupported claim" should mark a line as needing edit/regeneration.

The generated content should avoid:

- New diagnosis details not present in the transcript.
- Medication changes not stated by the clinician.
- False reassurance.
- Scary medical language for the child-facing version.
- Replacing clinician judgment.

The UI should frame the generated video as nurse-reviewed education, not autonomous discharge instructions.

## 11. Demo Script Requirements for Mateo

The generated script should cover:

- Mateo has type 1 diabetes.
- Blood sugar is something Mateo and his mom will check together.
- Insulin helps his body use sugar for energy.
- If Mateo feels shaky, sweaty, very tired, confused, or "off," he should tell a grown-up.
- His mom should follow the discharge plan and call/return for urgent symptoms.
- The tone should be calm and brave, not frightening.

Each line should have evidence references such as:

- Transcript segment where clinician explains diagnosis.
- Transcript segment where clinician explains blood sugar checks.
- Transcript segment where clinician explains insulin.
- Transcript segment where clinician gives return precautions.
- Transcript segment where caregiver reveals the game-based learning hook.
- Patient profile segment showing Spanish, 2nd grade, and caregiver involvement.
- Avatar library segment showing a donated spider-hero avatar is available.

## 12. Acceptance Criteria

The MVP is successful when:

- A user can select Mateo's demo scenario.
- The onboarding profile can be viewed and edited.
- A valid `PatientProfile.md` preview is generated.
- The synthetic transcript is visible.
- Clicking generate creates a script.
- The generated dialogue is adapted to Mateo's language and education level.
- The dialogue has evidence references.
- The voice/avatar step shows selected avatar, voice, audio, video status, and pipeline.
- The nurse review screen shows script, evidence, transcript snippets, profile snippets, and video preview.
- The user can approve the video.
- The patient view shows the approved after-visit video and next steps.
- The app can run locally from GitHub with documented setup.

## 13. Build Priorities

Order of work:

1. Scaffold the Next.js app.
2. Create stable fixtures for Mateo, 1-2 other patients, transcripts, scripts, and video jobs.
3. Build the screen navigation and main demo flow.
4. Build the onboarding form and markdown preview.
5. Build the transcript viewer with segment IDs.
6. Build deterministic mock generation for script and evidence map.
7. Build provider adapter interfaces.
8. Build nurse review dashboard.
9. Build patient delivery view.
10. Add live ElevenLabs and HeyGen provider calls after the mock demo flow is solid.

## 14. Demo Video Talking Points

For the Loom demo:

1. Introduce the team and the problem: patients forget or misunderstand after-visit instructions.
2. Show Mateo's profile and explain personalization.
3. Show the transcript and explain the encounter source.
4. Click generate and narrate the pipeline.
5. Show the Spanish child-facing script and English nurse review text.
6. Show evidence references beside generated lines.
7. Show the voice/avatar/video generation step.
8. Approve in the nurse dashboard.
9. Show the patient delivery view.
10. Close with "so what": this makes patient education more understandable while keeping nurses in control.

## 15. Open Decisions

- Whether onboarding is fully editable in v1 or mostly fixture-driven.
- Exact OpenAI model name available in the hackathon account.
- Exact ElevenLabs voice ID for Mateo.
- Exact HeyGen avatar/video API path and required request shape.
