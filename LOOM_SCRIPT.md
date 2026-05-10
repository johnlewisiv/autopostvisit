# AutoPostVisit Loom Script

Target: 5:00 max
Recording note: the transcript interaction video takes about 2:30. Do not cut it; keep the rest tight.

## 0:00-0:25 - Intro

Hi, I am John Lewis. I am a nurse, and I built AutoPostVisit solo. I started with a partner, but when the track shifted toward photo-to-video, we split paths and I kept going.

I am not a technical founder. Before Codex, I could not have built this. I have been working with AI since November 2022, and this weekend was the first time I could turn a clinical workflow in my head into a working product. So for technical execution and completeness, I want to show the judges an actual app, not a slide deck.

## 0:25-0:50 - Track Fit

AutoPostVisit is submitted for the AutoHDR photo-to-video track. I did not build another real estate app, but I followed the rule that photo-to-video generation has to be core to the value.

The same idea applies here: take a source image or avatar, combine it with generated audio and clinical context, and produce a polished video output. The innovation is applying that pipeline to discharge education, where accuracy and review matter as much as creativity.

## 0:50-1:10 - Scenarios And Profile

This is the nurse worklist. Mateo Rivera is 7, Spanish-speaking, and newly diagnosed with type 1 diabetes. The goal is not to replace Nurse Dana. The goal is to help her send Mateo and his mom a post-visit explanation that is age-appropriate, Spanish-first, and reviewable.

On the profile page, you can see the synthetic face sheet and patient education profile. The value and impact is that the system knows the language, reading level, caregiver, and safety constraints before it generates anything.

## 1:10-3:40 - Transcript Video

Now I am going to show the interaction that the transcript is based on.

[Play the QuickTime transcript interaction video here.]

What matters is that this visit is caring, but rushed. The teaching is real, but Mateo and his mom are overwhelmed. The important clue is easy to miss: his mom says he listens to a spider hero from Marvel Rivals more than he listens to her.

## 3:40-4:10 - Generate

In Generate, AutoPostVisit turns that clue into an internal asset match. It identifies the transcript reference, links back to the transcript, matches a donated spider-hero avatar/photo element, and asks Nurse Dana to approve the match before generation.

This is where the partner ecosystem and utility comes in: the intended pipeline is transcript to GPT-5.5 for grounded dialogue, dialogue to ElevenLabs for Spanish audio, then photo plus audio to a video provider. For judging reliability, the final provider result is cached, but the API hooks are where the live providers go.

## 4:10-4:40 - Script And Nurse Review

The Script tab shows the locked Spanish superhero dialogue and the English nurse review text side by side. This is the actual dialogue in the final video.

In Nurse Review, Nurse Dana can watch the final avatar result, click each scene, and see the evidence map. This is the technical completeness layer I care about most: every important claim points back to transcript, profile, or discharge-plan evidence. AI can personalize the explanation, but the nurse approves it.

## 4:40-5:00 - Patient View And Close

The Patient View is what Mateo's mom receives: the video plus bilingual discharge instructions. Since today is Mother's Day, this is the part that hits me. A mom should not have to leave a rushed visit and carry all of this alone.

Thank you to the sponsors, AutoHDR, AITX/TXAI, Jake, Michael, OpenAI, Sam, Greg, and Raghu. Raghu's advice about planning in Codex shaped the build. My thesis is simple: Codex let a nurse build software for a problem nurses actually see. AutoPostVisit is what happens when AI helps clinicians upskill into builders, instead of leaving clinical judgment outside the product.
