import { buildPatientMarkdown } from "./markdown";

export const nurseDana = {
  name: "Nurse Dana",
  role: "Charge nurse reviewer",
  imageUrl: "/assets/staff/nurse-dana.webp",
  reviewNote: "Final clinical check before caregiver delivery"
};

export const patients = [
  {
    id: "mateo-rivera",
    name: "Mateo Rivera",
    age: 7,
    language: "Spanish",
    readingLevel: "2nd grade",
    caregiver: "Elena Rivera, mother",
    scenario: "New type 1 diabetes education",
    preferredNarratorStyle: "no narrator preference recorded before visit",
    preferredVoiceStyle: "Spanish voice selected after transcript analysis",
    avatarImageUrl: "/assets/avatars/mateo-spider-hero.jpg",
    faceSheetImageUrl: "/assets/facesheets/mateo-ehr-profile.png",
    voiceId: "elevenlabs_voice_demo_spider_hero_dialogue_2",
    avatarSelectionSource:
      "No avatar was selected before the visit. AutoPostVisit matches the donated spider hero avatar from the transcript learning hook.",
    healthHistory: [
      "newly diagnosed type 1 diabetes",
      "three weeks of constant thirst and waking to urinate",
      "recent weight loss, exhaustion, vomiting, and ketones at emergency visit"
    ],
    allergies: ["no known drug allergies"],
    currentMedications: ["insulin per discharge plan"],
    communicationPreferences: ["simple", "warm", "reassuring", "Spanish first", "caregiver included"],
    status: "Identified superhero preference Ready for nurse review"
  },
  {
    id: "gregory-brockman",
    name: "Gregory Brockman",
    age: 38,
    language: "English",
    readingLevel: "some college",
    caregiver: "Self",
    scenario: "Critically High Test.",
    preferredNarratorStyle: "Froge based communication",
    status: "Prefers Froge based communication"
  },
  {
    id: "wojciech-zaremba",
    name: "Wojciech Zaremba",
    age: 37,
    language: "English",
    readingLevel: "PhD in Computer Science",
    caregiver: "Self",
    scenario: "Rubik's Cube related Carpal Tunnel Syndrome",
    preferredNarratorStyle: "quietly brilliant explainer",
    status: "Prefers his personal clinicians avatar"
  }
];

export const mateoFaceSheet = {
  mrn: "APV-0007",
  dob: "2018-08-14",
  visitType: "Urgent care follow-up education",
  location: "Pediatric urgent care",
  primaryLanguage: "Spanish",
  caregiver: "Elena Rivera, mother",
  consent: "Demo consent on file",
  educationNeed: "New diagnosis teaching, insulin basics, ketones, warning signs, caregiver teach-back"
};

export const mateoProfile = {
  ...patients[0],
  markdownProfile: buildPatientMarkdown(patients[0])
};

export const transcriptSegments = [
  {
    id: "tx-01",
    speaker: "Nurse Dana",
    text:
      "Mrs. Rivera, I am Dana, one of the nurses helping with Mateo's discharge teaching. Mateo's blood sugar was very high and he had ketones. With three weeks of drinking water constantly, waking up to pee, losing weight, feeling exhausted, and vomiting today, this fits new-onset type 1 diabetes with concern for DKA. I know that is a lot, and I am going to get the interpreter so we can move safely."
  },
  {
    id: "tx-02",
    speaker: "Automated Phone System",
    text:
      "Thank you for calling the interpreter service. For Spanish, please press or say 1. Para Espanol, oprima o diga el numero uno. Please hold for the next available interpreter.",
    englishText:
      "The automated line repeats the Spanish selection prompt: for Spanish, press or say the number one."
  },
  {
    id: "tx-03",
    speaker: "Phone Interpreter",
    text:
      "[static] Spanish interpreter 4821. I can help. Please speak in short sections; the connection is not clear."
  },
  {
    id: "tx-04",
    speaker: "Nurse Dana",
    text:
      "We have about ten minutes before the discharge papers print, and I have another family waiting. I am sorry. I am going to cover the essentials: insulin, blood sugar checks, ketones, warning signs, follow-up, and school."
  },
  {
    id: "tx-05",
    speaker: "Mrs. Rivera",
    text:
      "Por semanas tomo agua todo el dia y se despertaba para ir al bano. Pense que era el calor o un virus del estomago. A mi casi no me escucha; solo le hace caso a ese Spider Guy del juego Marvel Rivals. No se como voy a hacer que entienda esto.",
    englishText:
      "For weeks he drank water all day and woke up to use the bathroom. I thought it was the heat or a stomach virus. He barely listens to me; he only pays attention to that Spider Guy from Marvel Rivals. I do not know how I am going to help him understand this."
  },
  {
    id: "tx-06",
    speaker: "Mateo",
    text: "Mami, tengo miedo. Tengo sed otra vez. Did I do something bad?",
    englishText: "Mom, I am scared. I am thirsty again. Did I do something bad?"
  },
  {
    id: "tx-07",
    speaker: "Nurse Dana",
    text:
      "No, buddy. You did not cause this, and your mom did not cause this. Type 1 diabetes means your body is not making enough insulin. Insulin is the medicine that helps sugar move from the blood into the cells for energy."
  },
  {
    id: "tx-08",
    speaker: "Phone Interpreter",
    text:
      "[static] El no causo esto. La diabetes tipo 1 significa que su cuerpo necesita insulina. La insulina ayuda con el azucar en la sangre... I am sorry, Nurse, the audio cut out after that.",
    englishText:
      "[static] He did not cause this. Type 1 diabetes means his body needs insulin. Insulin helps with blood sugar... I am sorry, Nurse, the audio cut out after that."
  },
  {
    id: "tx-09",
    speaker: "Nurse Dana",
    text:
      "Okay. The printed plan has the exact insulin doses. Check blood sugar at the times listed, give insulin exactly as prescribed, write the numbers down, and call the diabetes team with the numbers. A grown-up helps Mateo every time."
  },
  {
    id: "tx-10",
    speaker: "Nurse Dana",
    text:
      "If Mateo vomits, breathes fast, is very confused, is hard to wake up, has moderate or large ketones, or his sugar stays outside the range on the plan, call the diabetes team or go to the emergency department. If it feels like an emergency, call 911."
  },
  {
    id: "tx-11",
    speaker: "Phone Interpreter",
    text:
      "Si vomita, respira rapido, esta confundido, cuesta despertarlo, o hay cetonas... [static] ...llame al equipo o emergencias. La enfermera dice que use el plan escrito.",
    englishText:
      "If he vomits, breathes fast, is confused, is hard to wake up, or has ketones... [static] ...call the team or emergency services. The nurse says to use the written plan."
  },
  {
    id: "tx-12",
    speaker: "Nurse Dana",
    text:
      "I know this is not enough time. You will get a Spanish video summary after the visit with the medicine plan, warning signs, school reminder, follow-up, and who to call. Please review it and call us if anything does not match what you understood today."
  }
];

export const encounterTranscript = {
  id: "enc-mateo-001",
  patientId: "mateo-rivera",
  title: "Rushed pediatric diabetes discharge teaching with phone interpreter",
  transcriptSegments
};

export const generatedScript = {
  id: "script-mateo-001",
  patientId: "mateo-rivera",
  transcriptId: "enc-mateo-001",
  language: "Spanish",
  readingLevel: "2nd grade",
  scenes: [
    {
      sceneId: "scene-01",
      title: "No-rush hero check-in",
      dialogue:
        "Mateo, campeón.\n\nSoy tu héroe araña. La enfermera Dana me contó la batalla que acabas de pasar. Yo también vengo de una misión, pero ahora estoy aquí contigo. No tengo prisa. Vamos paso a paso.",
      englishReviewText:
        "Mateo, champ. I am your spider hero. Nurse Dana told me about the battle you just went through. I also came from a mission, but now I am here with you. I am not in a hurry. We will go step by step.",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-05",
          quote: "solo le hace caso a ese Spider Guy del juego Marvel Rivals",
          explanation: "Supports using a spider-hero communication style Mateo already notices."
        },
        {
          sourceType: "transcript",
          sourceId: "tx-04",
          quote: "We have about ten minutes before the discharge papers print",
          explanation: "Supports the video explicitly slowing down the rushed visit."
        },
        {
          sourceType: "transcript",
          sourceId: "tx-12",
          quote: "You will get a Spanish video summary after the visit",
          explanation: "Supports a post-visit explanation that revisits teaching calmly."
        }
      ]
    },
    {
      sceneId: "scene-02",
      title: "Insulin is the helper key",
      dialogue:
        "Mateo, tu cuerpo ahora necesita un ayudante que se llama insulina. La insulina es como una llavecita. Ayuda a que el azúcar de tu sangre entre a tus células para darte energía.",
      englishReviewText:
        "Mateo, your body now needs a helper called insulin. Insulin is like a little key. It helps the sugar in your blood enter your cells to give you energy.",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-07",
          quote: "Insulin is the medicine that helps sugar move from the blood into the cells for energy",
          explanation: "Supports the child-level insulin-as-helper explanation."
        },
        {
          sourceType: "transcript",
          sourceId: "tx-09",
          quote: "give insulin exactly as prescribed",
          explanation: "Supports naming insulin as part of Mateo's home plan without inventing doses."
        }
      ]
    },
    {
      sceneId: "scene-03",
      title: "Mom and adults help",
      dialogue:
        "Tú y mamá van a revisar tu azúcar juntos. No tienes que hacerlo solo. Un adulto te ayuda con la insulina y con los números del plan.",
      englishReviewText:
        "You and Mom will check your sugar together. You do not have to do it alone. A grown-up helps you with insulin and with the numbers in the plan.",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-09",
          quote: "Check blood sugar at the times listed, give insulin exactly as prescribed, write the numbers down",
          explanation: "Supports blood sugar checks, insulin help, and tracking numbers."
        },
        {
          sourceType: "transcript",
          sourceId: "tx-09",
          quote: "A grown-up helps Mateo every time",
          explanation: "Supports reassuring Mateo that an adult helps every time."
        },
        {
          sourceType: "patient_profile",
          sourceId: "profile-caregiver",
          quote: "Caregiver: Elena Rivera, mother",
          explanation: "Supports naming Mom as the home helper."
        }
      ]
    },
    {
      sceneId: "scene-04",
      title: "Ask for help fast",
      dialogue:
        "Y si un día te sientes raro, tembloroso, sudado, muy cansado, confundido, o si algo en tu cuerpo no se siente bien, díselo rápido a un adulto: “Necesito ayuda.”",
      englishReviewText:
        "And if one day you feel strange, shaky, sweaty, very tired, confused, or if something in your body does not feel right, tell an adult quickly: \"I need help.\"",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-10",
          quote: "vomits, breathes fast, is very confused, is hard to wake up, has moderate or large ketones",
          explanation: "Supports urgent symptom teaching and fast adult escalation."
        },
        {
          sourceType: "discharge_plan",
          sourceId: "printed-avs-warning-signs",
          quote: "Warning signs include feeling shaky, sweaty, unusually tired, confused, or not right",
          explanation: "Supports adding common symptom language from the discharge warning-sign handout without adding dosing."
        }
      ]
    },
    {
      sceneId: "scene-05",
      title: "School and PE still count",
      dialogue:
        "También vi algo importante en tu historia, Mateo. Tú corres, juegas, y tienes educación física. Eso no se acaba. Solo vamos a tener un plan para que los adultos en la escuela sepan cómo ayudarte.",
      englishReviewText:
        "I also saw something important in your story, Mateo. You run, play, and have physical education. That does not end. We will just have a plan so the adults at school know how to help you.",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-04",
          quote: "I am going to cover the essentials: insulin, blood sugar checks, ketones, warning signs, follow-up, and school",
          explanation: "Supports including school planning as part of discharge education."
        },
        {
          sourceType: "discharge_plan",
          sourceId: "school-activity-plan",
          quote: "School plan includes diabetes support for meals, blood sugar checks, activity, and PE",
          explanation: "Supports the activity/PE reassurance while keeping adults responsible for the plan."
        }
      ]
    },
    {
      sceneId: "scene-06",
      title: "Brave, not blamed",
      dialogue:
        "Eres valiente, Mateo. Tener diabetes tipo 1 no significa que hiciste algo malo. Significa que tu equipo — tu mamá, tus enfermeras, tus doctores y tu héroe araña — va a ayudarte paso a paso.",
      englishReviewText:
        "You are brave, Mateo. Having type 1 diabetes does not mean you did something wrong. It means your team - your mom, your nurses, your doctors, and your spider hero - will help you step by step.",
      evidenceRefs: [
        {
          sourceType: "transcript",
          sourceId: "tx-07",
          quote: "You did not cause this, and your mom did not cause this",
          explanation: "Supports the no-blame reassurance."
        },
        {
          sourceType: "transcript",
          sourceId: "tx-12",
          quote: "review it and call us if anything does not match what you understood today",
          explanation: "Supports ongoing team support after the visit."
        },
        {
          sourceType: "patient_profile",
          sourceId: "profile-caregiver",
          quote: "Caregiver: Elena Rivera, mother",
          explanation: "Supports naming Mateo's mom as part of the care team."
        }
      ]
    }
  ]
};

export const videoJob = {
  id: "video-job-mateo-cached-002",
  patientId: "mateo-rivera",
  scriptId: "script-mateo-001",
  avatarImageUrl: "/assets/avatars/mateo-spider-hero.jpg",
  audioUrl: "/assets/audio/mateo-spider-hero-dialogue-2.mp3",
  videoUrl: "/assets/videos/mateo-avatar-video.mp4",
  status: "cached_provider_result",
  provider: "HeyGen",
  avatarMatchLabel: "Matched donated spider hero avatar",
  avatarMatchReason:
    "AutoPostVisit detected the caregiver's game-based learning hook in tx-05 and matched it to the donated pediatric spider hero avatar.",
  note:
    "Cached provider result generated from the revised rushed transcript, discharge facts, Spanish narration, and avatar-library match.",
  fallbackReason:
    "Demo-safe cached MP4 is used unless OpenAI, ElevenLabs, and HeyGen environment variables are configured with public media URLs.",
  providerTrace: [
    {
      step: "Transcript clue",
      status: "complete",
      detail: "tx-05 identifies Mateo's Spider Guy / Marvel Rivals learning hook."
    },
    {
      step: "Photo match",
      status: "complete",
      detail: "Internal match selected the donated pediatric spider hero photo/avatar element."
    },
    {
      step: "OpenAI Responses",
      status: "cached",
      detail: "Fixture Spanish dialogue and English review text are ready until OPENAI_API_KEY is configured."
    },
    {
      step: "ElevenLabs TTS",
      status: "cached",
      detail: "Spider Hero Dialogue 2 MP3 is served until ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID are configured."
    },
    {
      step: "HeyGen video",
      status: "cached",
      detail: "Final avatar MP4 is served until HEYGEN_API_KEY and public image/audio URLs are configured."
    }
  ]
};

export const caregiverDischargeInstructions = [
  {
    topic: "For Mateo's mom",
    spanish:
      "Sra. Rivera, este video repasa la ensenanza de alta para ayudarle a explicarle a Mateo lo mas importante en casa.",
    english:
      "Mrs. Rivera, this video reviews the discharge teaching so you can help Mateo understand the most important home-care points."
  },
  {
    topic: "The printed plan controls doses",
    spanish:
      "Use el plan impreso para las dosis exactas de insulina, los horarios, los rangos de azucar y los telefonos. Este video no cambia ninguna dosis.",
    english:
      "Use the printed plan for exact insulin doses, timing, blood sugar ranges, and phone numbers. This video does not change any dose."
  },
  {
    topic: "Blood sugar checks",
    spanish:
      "Revise el azucar de Mateo en los momentos escritos en el plan. Escriba los numeros y comparta esos registros con el equipo de diabetes.",
    english:
      "Check Mateo's blood sugar at the times listed in the plan. Write the numbers down and share those records with the diabetes team."
  },
  {
    topic: "Insulin help",
    spanish:
      "Un adulto debe ayudar cada vez que Mateo reciba insulina. Siga las etiquetas y el plan escrito, y llame al equipo si algo no coincide.",
    english:
      "A grown-up should help every time Mateo receives insulin. Follow the labels and the written plan, and call the team if anything does not match."
  },
  {
    topic: "Ketones and urgent symptoms",
    spanish:
      "Llame al equipo de diabetes o vaya a emergencias si Mateo vomita, respira rapido, esta muy confundido, cuesta despertarlo, tiene cetonas moderadas o grandes, o el azucar queda fuera del rango del plan.",
    english:
      "Call the diabetes team or go to the emergency department if Mateo vomits, breathes fast, is very confused, is hard to wake up, has moderate or large ketones, or blood sugar stays outside the plan range."
  },
  {
    topic: "Emergency and follow-up",
    spanish:
      "Si parece una emergencia, llame al 911. Lleve el plan a la escuela, avise a la enfermera escolar y mantenga la cita de seguimiento con el equipo de diabetes.",
    english:
      "If it feels like an emergency, call 911. Bring the plan to school, tell the school nurse, and keep the follow-up visit with the diabetes team."
  }
];
