# AutoPostVisit Submission

## Project

AutoPostVisit

## GitHub

https://github.com/johnlewisiv/autopostvisit

## Track

Primary track: AutoHDR Photo-to-Video / AI video pipeline

Secondary fit: Agents

## Short Description

AutoPostVisit turns a rushed clinical encounter into a personalized, nurse-reviewed post-visit discharge video. The demo follows Mateo Rivera, a 7-year-old Spanish-speaking child newly diagnosed with type 1 diabetes. The app reads a synthetic visit transcript, catches an easy-to-miss learning clue that Mateo responds to a spider-hero style explanation, matches that clue to a donated avatar/photo asset, generates Spanish child-facing dialogue, maps every claim back to transcript/profile/discharge evidence, and routes the final avatar video through Nurse Dana before it reaches Mateo's mom.

The point is not to replace the nurse. The point is to give the nurse a grounded, reviewable way to send families a format they can actually absorb after a rushed visit.

## Judging Criteria Mapping

### Technical Execution & Completeness

The app is a working Next.js workflow with a scenario selector, patient profile, transcript, photo/avatar match approval, generation pipeline, bilingual script, evidence map, nurse review, cached provider media, and caregiver-facing patient view. It runs locally and includes deterministic provider fallbacks.

### Partner Ecosystem & Utility

The project adapts the hackathon photo-to-video track concept to a healthcare workflow: transcript evidence plus avatar/photo asset plus generated voice/video becomes a reviewable patient education output. It includes provider hooks for OpenAI Responses, ElevenLabs TTS, and HeyGen video generation, with cached media for reliable judging.

### Value & Impact

Families often leave discharge visits overwhelmed, especially across language barriers and pediatric teaching needs. AutoPostVisit makes the education more personalized while keeping the nurse in control through English review text and evidence references.

### Innovation & Execution

AutoPostVisit extends the photo-to-video pipeline into clinical discharge education while preserving the track's core creative challenge: transforming a source image/avatar and generated audio into a controlled video output. The novel layer is the knowledge map: the generated video is not just creative media, it is nurse-reviewable and grounded in the encounter.

## Safety And Affiliation Notes

This is a synthetic hackathon demo. Mateo Rivera, Elena Rivera, and Nurse Dana are fictional. The Epic-style and Suki-style marks are simulated workflow context only and do not claim live integration, affiliation, endorsement, or partnership. The final video is treated as a cached provider result for demo reliability.

No real patient data or production clinical advice is included. The app intentionally avoids exact insulin dosing and defers dosing to the printed discharge plan and clinical team.

## Local Run

```bash
npm install
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```
