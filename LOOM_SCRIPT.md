# AutoPostVisit Loom Script

Target: 5:00 max
Recording note: the transcript interaction video takes about 2:30. Do not cut it; keep the rest tight.

## 0:00-0:25 - Intro

Hi, I am John Lewis. I am a nurse, and I built AutoPostVisit solo. I started with a partner, but when the track shifted toward photo-to-video, we split paths and I kept going.

I am not a technical founder. Before Codex, I could not have built this. I have been working with AI since November 2022, and this weekend was the first time I could turn a clinical workflow in my head into a working product.

## 0:25-0:50 - Criteria And Track Fit

I want to name the judging criteria out loud. Technical execution and completeness: this is a working app, not a slide deck. Partner ecosystem and utility: it uses a photo/avatar-to-video pipeline with OpenAI, ElevenLabs, and HeyGen-style provider hooks. Value and impact: this solves a real discharge education problem I have seen as a nurse. Innovation and execution: I did not build another real estate app, but I followed the AutoHDR photo-to-video track rules by making photo-to-video the core output inside a useful product.

## 0:50-1:10 - Scenarios And Profile

This is the nurse worklist. Mateo Rivera is 7, Spanish-speaking, and newly diagnosed with type 1 diabetes. The goal is not to replace Nurse Dana. The goal is to help her send Mateo and his mom a post-visit explanation that is age-appropriate, Spanish-first, and reviewable.

On the profile page, you can see the synthetic face sheet and patient education profile. This tells the system the language, reading level, caregiver, and safety constraints.

## 1:10-3:40 - Transcript Video

Now I am going to show the interaction that the transcript is based on.

[Play the QuickTime transcript interaction video here.]

What matters is that this visit is caring, but rushed. The teaching is real, but Mateo and his mom are overwhelmed. The important clue is easy to miss: his mom says he listens to a spider hero from Marvel Rivals more than he listens to her.

## 3:40-4:10 - Generate

In Generate, AutoPostVisit turns that clue into an internal asset match. It identifies the transcript reference, links back to the transcript, matches a donated spider-hero avatar/photo element, and asks Nurse Dana to approve the match before generation.

The intended pipeline is transcript to GPT-5.5 for grounded dialogue, dialogue to ElevenLabs for Spanish audio, then photo plus audio to a video provider. For judging reliability, the final provider result is cached, but the API hooks are where the live providers go.

## 4:10-4:40 - Script And Nurse Review

The Script tab shows the locked Spanish superhero dialogue and the English nurse review text side by side. This is the actual dialogue in the final video.

In Nurse Review, Nurse Dana can watch the final avatar result, click each scene, and see the evidence map. Every important claim points back to transcript, profile, or discharge-plan evidence. This is the safety layer: AI can personalize the explanation, but the nurse approves it.

## 4:40-5:00 - Patient View And Close

The Patient View is what Mateo's mom receives: the video plus bilingual discharge instructions. Since today is Mother's Day, this is the part that hits me. A mom should not have to leave a rushed visit and carry all of this alone.

Thank you to the sponsors, AutoHDR, AITX/TXAI, Jake, Michael, OpenAI, Sam, Greg, and Raghu. Raghu's advice about planning in Codex shaped the build. Sam's question, "what is the most important thing I am missing about this situation," is basically the product: AutoPostVisit catches the thing a rushed visit misses, then turns it into something a family can actually use.
