# AutoPostVisit GitHub + Video Checklist

This checklist is reset around what matters most now: a public GitHub repo and a strong Loom demo. The media proof is already good, so the job is to package it into a runnable product story.

## Critical Path

- [x] Project renamed to AutoPostVisit.
- [x] Mateo EHR/face image copied into `public/assets/facesheets`.
- [x] Licensed pediatric spider hero avatar copied into `public/assets/avatars`.
- [x] ElevenLabs audio copied into `public/assets/audio`.
- [x] Next.js app scaffold created.
- [x] Fixture-based Mateo happy path created.
- [x] Deterministic script and evidence map created.
- [x] Nurse review dashboard created.
- [x] Patient delivery view created.
- [x] Export/download the real HeyGen MP4.
- [x] Place it at `public/assets/videos/mateo-avatar-video.mp4`.
- [x] Run `npm install`.
- [x] Run `npm run dev`.
- [x] Verify copied app at `http://localhost:3001`.
- [ ] Initialize `/Users/johnlewis/Documents/Hackathon-AutoPostVisit-Dana-Run` as its own Git repo.
- [ ] Push public repo named `johnlewisiv/autopostvisit`.
- [ ] Record Loom under 5 minutes.

## Missing Source Artifacts

These are now represented in fixtures, but can be refined before final video:

- [x] Mateo face sheet
- [x] `PatientProfile.md`
- [x] Transcript between nurse, mom, and Mateo
- [x] Spanish child-facing dialogue
- [x] English nurse-review translation
- [x] Evidence map tying script lines to transcript/profile
- [ ] Final revised Spanish dialogue for the second HeyGen render, if you want to regenerate

## App Walkthrough Checklist

Use this order when testing and recording:

1. Open the app.
2. Show AutoPostVisit headline.
3. Select Mateo in Scenarios.
4. Open Profile and show face sheet plus `PatientProfile.md`.
5. Open Transcript and show segment IDs.
6. Open Generate and show tx-05 identifying the superhero preference.
7. Approve the donated photo/avatar match.
8. Click **Generate video packet** and show the provider trace.
9. Open Script and show always-visible Spanish plus English review text.
10. Open Nurse Review.
11. Select a script scene and show bilingual text plus evidence.
12. Approve.
13. Share with caregiver.
14. Show Patient View with bilingual discharge instructions and the video.

## GitHub Checklist

- [ ] Confirm `.env.local` is not present or is ignored.
- [ ] Confirm `.env.example` has placeholders only.
- [ ] Confirm no real API keys are in the repo.
- [ ] Confirm no public files use copyrighted character/studio names.
- [ ] Confirm README says how to run the app.
- [ ] Confirm assets are in `public/assets`.
- [ ] Confirm the repo root is `Hackathon-AutoPostVisit-Dana-Run`, not the parent `Documents` folder.
- [ ] Push to GitHub after the app builds.

## Loom Script

Target: 3-5 minutes.

- 0:00 Team/product intro.
- 0:20 Problem: patients and parents leave overwhelmed.
- 0:45 Mateo profile and personalization.
- 1:20 Transcript and grounded evidence.
- 1:50 Generate flow: transcript clue, photo/avatar match, approval, provider trace.
- 2:20 Spanish hero dialogue and English nurse review.
- 2:50 Nurse Review with HeyGen video result or cached provider slot.
- 3:20 Nurse evidence review and approval.
- 4:10 Patient delivery view.
- 4:40 Close: licensed/donated avatars for pediatric education, nurse in control.

Main line:

> AutoPostVisit does not replace the nurse. It turns nurse-reviewed after-visit education into a format a child and caregiver can actually absorb.

## If You Get Disoriented

Do not add more features. Do this:

1. Make the Mateo path look good.
2. Make the evidence map obvious.
3. Make the photo-to-video pipeline convincing.
4. Make GitHub run cleanly.
5. Record the Loom.
