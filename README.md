# AutoPostVisit

AutoPostVisit is a hackathon demo for personalized, nurse-reviewed post-visit custom discharge videos.

After a pediatric visit, the app uses the encounter transcript and a pre-visit patient education profile to create a child-friendly video script, map each important claim back to evidence, and route the final avatar video through a nurse review dashboard before it is sent to the caregiver.

## Demo Story

Mateo Rivera is 7, Spanish-speaking, and newly diagnosed with type 1 diabetes. His profile says he needs a simple 2nd-grade explanation. The rushed visit transcript reveals a game-based spider-hero learning hook, which AutoPostVisit matches to a donated avatar/photo asset for a Spanish after-visit video.

AutoPostVisit demonstrates:

- A simulated Epic-style nurse worklist and patient profile.
- A synthetic Suki-style encounter transcript with a phone interpreter barrier.
- A gated photo-to-video generation flow: transcript clue, avatar/photo match, nurse approval, generated dialogue, audio, and video.
- Spanish child-facing dialogue with English nurse-review text.
- Evidence references for every important generated scene.
- A Nurse Dana review dashboard with final approval before caregiver delivery.
- A caregiver-facing patient view with the reviewed video and bilingual discharge instructions.

## Why This Matters

Patients and caregivers often leave clinical encounters overwhelmed. Written after-visit summaries can be too generic, too advanced, or not adapted to language, age, caregiver involvement, or explanation style.

AutoPostVisit does not replace the nurse. It turns nurse-reviewed education into a format a child and caregiver can actually absorb.

## Hackathon Track Fit

Primary track: AutoHDR Photo-to-Video / AI video pipeline.

AutoPostVisit applies the photo-to-video pipeline to clinical discharge education while preserving the track's core requirement: turning a source image/avatar plus generated audio into a controlled video output. The important product layer is verification: the nurse can inspect the generated script next to transcript, profile, discharge, and avatar-match evidence before the caregiver receives the video.

## Run Locally

```bash
npm install
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```

## Demo Assets

Required demo assets are stored under `public/assets`:

- `public/assets/facesheets/mateo-ehr-profile.png`
- `public/assets/avatars/mateo-spider-hero.jpg`
- `public/assets/audio/mateo-spider-hero-dialogue-2.mp3`
- `public/assets/videos/mateo-avatar-video.mp4`

The transcript source artifact is stored at `artifacts/mateo-office-visit-transcript.md`.

## Provider Mode

The app runs by default in cached demo mode using deterministic fixture data and the included audio/video assets. Set `DEMO_MODE=live` or `NEXT_PUBLIC_DEMO_MODE=live` to call live providers:

- OpenAI Responses for nurse-review metadata while keeping the final Spanish video dialogue locked to the reviewed demo script.
- ElevenLabs for MP3 generation.
- HeyGen for an asynchronous avatar-video job.

HeyGen requires public image/audio URLs or uploaded assets. Local private files fall back to the cached MP4.

Use `.env.example` as the public template. Do not commit `.env.local` or real API keys.

## Safety And Affiliation Notes

This is a synthetic hackathon demo. Mateo Rivera, Elena Rivera, and Nurse Dana are fictional. The Epic-style and Suki-style marks are simulated workflow context only and do not claim live integration, affiliation, endorsement, or partnership.

No real patient data or production clinical advice is included. The app intentionally avoids exact insulin dosing and defers dosing to the printed discharge plan and clinical team.
