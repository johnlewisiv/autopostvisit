# AutoPostVisit

AutoPostVisit is a hackathon demo for personalized, nurse-reviewed post-visit custom discharge videos.

The core idea: after a pediatric visit, the app uses the encounter transcript and a pre-visit patient education profile to create a child-friendly video script, map every important line back to evidence, and route the final avatar video through a nurse review dashboard before it is sent to the caregiver.

## Demo Story

Mateo Rivera is 7, Spanish-speaking, and newly diagnosed with type 1 diabetes. His profile says he needs a simple 2nd-grade explanation; the rushed transcript reveals a game-based spider-hero learning hook that AutoPostVisit matches to the donated avatar library.

AutoPostVisit shows:

- Mateo's simulated Epic-style EHR face sheet.
- His generated `PatientProfile.md`.
- A synthetic Suki-style nurse-mom-child transcript with a phone interpreter barrier.
- A Spanish child-facing avatar script generated after the visit.
- English nurse-review text.
- Evidence references for every generated scene, including the detected learning hook.
- A gated photo-to-video generation flow: transcript clue, donated photo/avatar match, nurse approval, script, audio, and video.
- ElevenLabs audio using the updated Spider Hero Dialogue 2 file when live keys are absent.
- The cached HeyGen avatar video result when public provider URLs or credentials are absent.
- Nurse approval and patient delivery.

## Why This Matters

Patients and caregivers often leave clinical encounters overwhelmed. Written after-visit summaries can be too generic, too advanced, or not adapted to language, age, caregiver involvement, or explanation style.

AutoPostVisit does not replace the nurse. It turns nurse-reviewed education into a format a child and caregiver can actually absorb.

## Hackathon Track Fit

Primary track: AutoHDR Photo-to-Video / AI video pipeline.

The app demonstrates a practical video generation workflow where transcript clues, discharge facts, a donated avatar image, and voice become a personalized after-visit video. The important product layer is control and verification: the nurse can inspect the generated script next to transcript, profile, discharge, and avatar-match evidence.

## Current Demo Assets

Safe demo assets are stored under `public/assets`:

- `public/assets/facesheets/mateo-ehr-profile.png`
- `public/assets/avatars/mateo-spider-hero.jpg`
- `public/assets/audio/mateo-spider-hero-dialogue-2.mp3`
- `public/assets/videos/mateo-avatar-video.mp4`

The standalone transcript source artifact is stored at `artifacts/mateo-office-visit-transcript.md`.

The app uses real image lockups for `Simulated Epic` and `Synthetic Suki Transcript` as demo-only context markers. They show where the workflow could live; they do not claim live vendor integration, partnership, or endorsement.

The exported HeyGen MP4 is intentionally treated as a cached provider result for judging reliability. The copied Dana run points directly to the cached MP4 unless live provider keys and public media URLs are configured.

## Run Locally

```bash
npm install
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```

## Environment Variables

Create `.env.local` for real keys. Do not commit it.

Use `.env.example` as the public template:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.5
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
HEYGEN_API_KEY=
HEYGEN_AVATAR_ID=
HEYGEN_IMAGE_ASSET_ID=
HEYGEN_IMAGE_URL=
HEYGEN_AUDIO_URL=
PUBLIC_BASE_URL=
NEXT_PUBLIC_DEMO_MODE=cached
```

The app runs by default in cached demo mode using deterministic fixture data. Set `DEMO_MODE=live` or `NEXT_PUBLIC_DEMO_MODE=live` to call live providers: OpenAI Responses for nurse-review metadata while keeping the final Spanish video dialogue locked to the cached MP4, ElevenLabs for MP3 generation, and HeyGen for an asynchronous avatar-video job. HeyGen requires public image/audio URLs or uploaded assets; local private files fall back to the cached MP4.

## Judge Walkthrough

Suggested Loom flow:

1. Introduce the problem: families leave overwhelmed after clinical visits.
2. Select Mateo from the nurse worklist.
3. Show his face sheet and education profile.
4. Show the short rushed transcript and the missed learning hook.
5. Open Generate, show tx-05 identifying the superhero preference, and approve the donated photo/avatar match.
6. Click Generate video packet and show the provider trace.
7. Show bilingual Spanish superhero dialogue and English nurse review text.
8. Show evidence mapped to transcript/profile/discharge/avatar snippets.
9. Approve the video in Nurse Review.
10. Share with caregiver and show Patient View bilingual discharge instructions.

## GitHub Safety

- Do not commit `.env.local`.
- Do not commit real API keys.
- Use vendor-style labels as simulated workflow context only; do not claim live integration or affiliation unless permissions are actually documented.
- Public-facing language should say `licensed pediatric spider hero avatar` or `studio-donated pediatric avatar library`.

## Final Submission Notes

- The finalized Mateo avatar video is locked at `public/assets/videos/mateo-avatar-video.mp4`.
- The demo is intended to run locally on `http://localhost:3001`.
- The 5-minute Loom walkthrough script is in `LOOM_SCRIPT.md`.
- The copy/paste submission description is in `SUBMISSION.md`.
