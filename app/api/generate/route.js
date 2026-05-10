import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { encounterTranscript, generatedScript, mateoProfile, videoJob } from "@/lib/fixtures";

export const runtime = "nodejs";

const SCRIPT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["language", "readingLevel", "scenes", "unsupportedClaims"],
  properties: {
    language: { type: "string" },
    readingLevel: { type: "string" },
    scenes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["sceneId", "title", "dialogue", "englishReviewText", "evidenceRefs"],
        properties: {
          sceneId: { type: "string" },
          title: { type: "string" },
          dialogue: { type: "string" },
          englishReviewText: { type: "string" },
          evidenceRefs: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["sourceType", "sourceId", "quote", "explanation"],
              properties: {
                sourceType: { type: "string" },
                sourceId: { type: "string" },
                quote: { type: "string" },
                explanation: { type: "string" }
              }
            }
          }
        }
      }
    },
    unsupportedClaims: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["claim", "reason"],
        properties: {
          claim: { type: "string" },
          reason: { type: "string" }
        }
      }
    }
  }
};

function trace(step, status, detail) {
  return { step, status, detail };
}

function shouldUseLiveProviders() {
  return process.env.DEMO_MODE === "live" || process.env.NEXT_PUBLIC_DEMO_MODE === "live";
}

function getPublicBaseUrl() {
  if (process.env.PUBLIC_BASE_URL) return process.env.PUBLIC_BASE_URL;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "";
}

function toPublicUrl(assetUrl) {
  if (!assetUrl) return null;
  if (/^https?:\/\//i.test(assetUrl)) return assetUrl;
  const base = getPublicBaseUrl();
  if (!base) return null;
  return new URL(assetUrl, base).toString();
}

function readOpenAIText(payload) {
  if (typeof payload?.output_text === "string") {
    return payload.output_text;
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item.content) ? item.content : [];
    for (const part of content) {
      if (typeof part.text === "string") return part.text;
      if (typeof part.output_text === "string") return part.output_text;
    }
  }

  return "";
}

function normalizeScript(candidate) {
  if (!candidate || !Array.isArray(candidate.scenes) || candidate.scenes.length === 0) {
    return generatedScript;
  }

  return {
    ...generatedScript,
    language: candidate.language || generatedScript.language,
    readingLevel: candidate.readingLevel || generatedScript.readingLevel,
    scenes: generatedScript.scenes.map((lockedScene, index) => {
      const scene = candidate.scenes[index] || {};
      return {
        sceneId: lockedScene.sceneId,
        title: lockedScene.title,
        dialogue: lockedScene.dialogue,
        englishReviewText: scene.englishReviewText || lockedScene.englishReviewText,
        evidenceRefs: Array.isArray(scene.evidenceRefs) && scene.evidenceRefs.length > 0
          ? scene.evidenceRefs
          : lockedScene.evidenceRefs
      };
    })
  };
}

async function generateScriptWithOpenAI(providerTrace, fallbackReasons) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5.5";

  if (!apiKey) {
    fallbackReasons.push("OPENAI_API_KEY is not configured, so fixture dialogue was used.");
    providerTrace.push(trace("OpenAI Responses", "cached", "No OPENAI_API_KEY found; returned deterministic Mateo script."));
    return { script: generatedScript, unsupportedClaims: [], source: "cached" };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "You generate nurse-reviewable pediatric discharge video review data. The Spanish dialogue is already locked to the rendered video and must not be changed. Keep every medical claim grounded in provided evidence. You may refine English review text and evidence references for an English-speaking nurse. Do not invent doses."
          },
          {
            role: "user",
            content: JSON.stringify({
              patient: {
                name: mateoProfile.name,
                age: mateoProfile.age,
                language: mateoProfile.language,
                readingLevel: mateoProfile.readingLevel,
                caregiver: mateoProfile.caregiver,
                scenario: mateoProfile.scenario
              },
              transcript: encounterTranscript.transcriptSegments,
              requiredEvidenceIds: ["tx-01", "tx-05", "tx-07", "tx-09", "tx-10", "tx-12"],
              avatarMatch:
                "tx-05 identifies a Spider Guy / Marvel Rivals learning hook. Use the donated pediatric spider hero avatar; do not claim official studio affiliation.",
              lockedSpanishDialogue: generatedScript.scenes.map((scene) => ({
                sceneId: scene.sceneId,
                title: scene.title,
                dialogue: scene.dialogue
              })),
              dischargeGuardrails: [
                "The printed plan controls exact insulin doses.",
                "A grown-up helps with insulin and blood sugar checks.",
                "Call the diabetes team or go to the emergency department for vomiting, fast breathing, confusion, trouble waking, moderate or large ketones, or blood sugar outside the plan range.",
                "Discharge warning-sign language may include shaky, sweaty, very tired, confused, or not feeling right as reasons to tell an adult quickly.",
                "School and physical education references are allowed only as plan-based adult support, not as independent self-management.",
                "Call 911 if it feels like an emergency."
              ],
              targetSceneCount: generatedScript.scenes.length,
              currentFixtureForShape: generatedScript
            })
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "autopostvisit_script",
            strict: true,
            schema: SCRIPT_SCHEMA
          }
        }
      })
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`OpenAI ${response.status}: ${message.slice(0, 240)}`);
    }

    const payload = await response.json();
    const text = readOpenAIText(payload);
    const parsed = JSON.parse(text);
    const script = normalizeScript(parsed);
    providerTrace.push(trace("OpenAI Responses", "live", `Generated structured script with ${model}.`));
    return {
      script,
      unsupportedClaims: Array.isArray(parsed.unsupportedClaims) ? parsed.unsupportedClaims : [],
      source: "live"
    };
  } catch (error) {
    fallbackReasons.push(`OpenAI generation failed: ${error.message}`);
    providerTrace.push(trace("OpenAI Responses", "fallback", `Live call failed; fixture script used. ${error.message}`));
    return { script: generatedScript, unsupportedClaims: [], source: "fallback" };
  }
}

async function generateAudioWithElevenLabs(script, providerTrace, fallbackReasons) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    fallbackReasons.push("ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID is missing, so cached MP3 was used.");
    providerTrace.push(trace("ElevenLabs TTS", "cached", "No ElevenLabs credentials found; returned Spider Hero Dialogue 2 MP3."));
    return { audioUrl: videoJob.audioUrl, source: "cached" };
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text: script.scenes.map((scene) => scene.dialogue).join("\n\n"),
          model_id: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2"
        })
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`ElevenLabs ${response.status}: ${message.slice(0, 240)}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const publicDir = path.join(process.cwd(), "public", "generated");
    await mkdir(publicDir, { recursive: true });
    const filename = `mateo-elevenlabs-${Date.now()}.mp3`;
    await writeFile(path.join(publicDir, filename), buffer);
    const audioUrl = `/generated/${filename}`;
    providerTrace.push(trace("ElevenLabs TTS", "live", "Generated Spanish MP3 from the approved dialogue."));
    return { audioUrl, source: "live" };
  } catch (error) {
    fallbackReasons.push(`ElevenLabs generation failed: ${error.message}`);
    providerTrace.push(trace("ElevenLabs TTS", "fallback", `Live call failed; cached MP3 used. ${error.message}`));
    return { audioUrl: videoJob.audioUrl, source: "fallback" };
  }
}

async function generateVideoWithHeyGen(audioUrl, providerTrace, fallbackReasons) {
  const apiKey = process.env.HEYGEN_API_KEY;

  if (!apiKey) {
    fallbackReasons.push("HEYGEN_API_KEY is not configured, so cached MP4 was used.");
    providerTrace.push(trace("HeyGen video", "cached", "No HeyGen API key found; returned cached avatar MP4."));
    return { videoUrl: videoJob.videoUrl, source: "cached", heygenVideoId: null };
  }

  const publicAudioUrl = process.env.HEYGEN_AUDIO_URL || toPublicUrl(audioUrl);
  const publicImageUrl = process.env.HEYGEN_IMAGE_URL || toPublicUrl(videoJob.avatarImageUrl);
  const avatarId = process.env.HEYGEN_AVATAR_ID;
  const imageAssetId = process.env.HEYGEN_IMAGE_ASSET_ID;

  if (!publicAudioUrl || (!avatarId && !imageAssetId && !publicImageUrl)) {
    fallbackReasons.push(
      "HeyGen needs a public audio URL plus avatar_id, image_asset_id, or public image_url; cached MP4 was used."
    );
    providerTrace.push(
      trace(
        "HeyGen video",
        "fallback",
        "Local private media cannot be reached by HeyGen without PUBLIC_BASE_URL, HEYGEN_IMAGE_URL, or uploaded assets."
      )
    );
    return { videoUrl: videoJob.videoUrl, source: "fallback", heygenVideoId: null };
  }

  try {
    const body = {
      title: "AutoPostVisit Mateo Rivera discharge video",
      audio_url: publicAudioUrl,
      resolution: "720p",
      aspect_ratio: "9:16",
      motion_prompt: "Warm pediatric superhero explainer, calm supportive gestures, clinic-friendly delivery.",
      expressiveness: "medium"
    };

    if (avatarId) {
      body.avatar_id = avatarId;
    } else if (imageAssetId) {
      body.image_asset_id = imageAssetId;
    } else {
      body.image_url = publicImageUrl;
    }

    const response = await fetch("https://api.heygen.com/v2/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey
      },
      body: JSON.stringify(body)
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(`HeyGen ${response.status}: ${JSON.stringify(payload).slice(0, 240)}`);
    }

    const heygenVideoId = payload?.data?.video_id || payload?.video_id || payload?.id || null;
    providerTrace.push(
      trace(
        "HeyGen video",
        "started",
        heygenVideoId
          ? `HeyGen async video job started: ${heygenVideoId}. Cached MP4 remains visible until status polling returns the final URL.`
          : "HeyGen async video job started. Cached MP4 remains visible until status polling returns the final URL."
      )
    );

    return { videoUrl: videoJob.videoUrl, source: "started", heygenVideoId };
  } catch (error) {
    fallbackReasons.push(`HeyGen generation failed: ${error.message}`);
    providerTrace.push(trace("HeyGen video", "fallback", `Live call failed; cached MP4 used. ${error.message}`));
    return { videoUrl: videoJob.videoUrl, source: "fallback", heygenVideoId: null };
  }
}

function generationStatusFor(sources) {
  if (sources.video === "started") {
    return "heygen_generation_started_cached_preview";
  }

  if (Object.values(sources).some((source) => source === "live")) {
    return "mixed_provider_result";
  }

  return "cached_provider_result";
}

export async function POST(request) {
  await request.json().catch(() => ({}));
  const providerTrace = [
    trace("Transcript clue", "complete", "tx-05 identifies Mateo's Spider Guy / Marvel Rivals learning hook."),
    trace("Photo match", "complete", "Nurse-approved internal match selected the donated pediatric spider hero photo.")
  ];
  const fallbackReasons = [];

  if (!shouldUseLiveProviders()) {
    providerTrace.push(
      trace("OpenAI Responses", "cached", "Demo mode is cached; returned locked Mateo script without calling live providers."),
      trace("ElevenLabs TTS", "cached", "Demo mode is cached; returned Spider Hero Dialogue 2 MP3."),
      trace("HeyGen video", "cached", "Demo mode is cached; returned final Mateo avatar MP4.")
    );
    const fallbackReason = "Demo mode uses deterministic cached provider results. Set DEMO_MODE=live or NEXT_PUBLIC_DEMO_MODE=live to call live providers.";
    return Response.json({
      script: generatedScript,
      audioUrl: videoJob.audioUrl,
      videoUrl: videoJob.videoUrl,
      videoJob: {
        ...videoJob,
        status: "cached_provider_result",
        providerTrace,
        fallbackReason
      },
      providerTrace,
      generationStatus: "cached_provider_result",
      fallbackReason,
      nurseReviewSummary:
        "The generated script stays within the encounter and discharge facts, catches the caregiver's learning hook, adapts the message for a Spanish-speaking 7-year-old, and flags urgent symptoms with caregiver involvement.",
      unsupportedClaims: []
    });
  }

  const scriptResult = await generateScriptWithOpenAI(providerTrace, fallbackReasons);
  const audioResult = await generateAudioWithElevenLabs(scriptResult.script, providerTrace, fallbackReasons);
  const videoResult = await generateVideoWithHeyGen(audioResult.audioUrl, providerTrace, fallbackReasons);
  const generationStatus = generationStatusFor({
    script: scriptResult.source,
    audio: audioResult.source,
    video: videoResult.source
  });

  const nextVideoJob = {
    ...videoJob,
    audioUrl: audioResult.audioUrl,
    videoUrl: videoResult.videoUrl,
    status: generationStatus,
    providerTrace,
    heygenVideoId: videoResult.heygenVideoId,
    fallbackReason: fallbackReasons.join(" "),
    note:
      videoResult.source === "started"
        ? "HeyGen accepted the live job. The cached MP4 stays in review until the asynchronous provider result is ready."
        : videoJob.note
  };

  return Response.json({
    script: scriptResult.script,
    audioUrl: nextVideoJob.audioUrl,
    videoUrl: nextVideoJob.videoUrl,
    videoJob: nextVideoJob,
    providerTrace,
    generationStatus,
    fallbackReason: nextVideoJob.fallbackReason,
    nurseReviewSummary:
      "The generated script stays within the encounter and discharge facts, catches the caregiver's learning hook, adapts the message for a Spanish-speaking 7-year-old, and flags urgent symptoms with caregiver involvement.",
    unsupportedClaims: scriptResult.unsupportedClaims
  });
}
