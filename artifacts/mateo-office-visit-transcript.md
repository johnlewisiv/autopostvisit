# Mateo Rivera Office Visit Transcript

Synthetic demo artifact for AutoPostVisit. This is fictional, non-PHI encounter content designed to start the transcript-to-video workflow.

Scenario: Mateo Rivera is a 7-year-old Spanish-speaking child. His mother, Elena Rivera, noticed about three weeks of constant thirst and waking to urinate. She first thought it was heat, a growth spurt, or a stomach bug. Mateo then lost weight, became exhausted, and vomited. At the emergency visit, high glucose and ketones led to a new-onset type 1 diabetes diagnosis with concern for diabetic ketoacidosis.

Demo purpose: the office visit is intentionally short, strained, and incomplete. Nurse Dana is caring but rushed, the interpreter line is poor, and the family leaves with paper instructions plus a promised Spanish video summary. AutoPostVisit is the part that saves the day after the transcript ends by detecting the caregiver's learning hook, matching the donated avatar, generating the kid-level dialogue, and routing it through nurse review.

Clinical grounding: general education language was kept conservative and checked against CDC pages on type 1 diabetes, diabetic ketoacidosis, and being newly diagnosed with type 1 diabetes. This transcript is a demo artifact, not discharge instructions.

## Transcript

**tx-01 | Nurse Dana:** Mrs. Rivera, I am Dana, one of the nurses helping with Mateo's discharge teaching. Mateo's blood sugar was very high and he had ketones. With three weeks of drinking water constantly, waking up to pee, losing weight, feeling exhausted, and vomiting today, this fits new-onset type 1 diabetes with concern for DKA. I know that is a lot, and I am going to get the interpreter so we can move safely.

**tx-02 | Automated Phone System:** Thank you for calling the interpreter service. For Spanish, please press or say 1. Para Espanol, oprima o diga el numero uno. Please hold for the next available interpreter.

**tx-03 | Phone Interpreter:** [static] Spanish interpreter 4821. I can help. Please speak in short sections; the connection is not clear.

**tx-04 | Nurse Dana:** We have about ten minutes before the discharge papers print, and I have another family waiting. I am sorry. I am going to cover the essentials: insulin, blood sugar checks, ketones, warning signs, follow-up, and school.

**tx-05 | Mrs. Rivera:** Por semanas tomo agua todo el dia y se despertaba para ir al bano. Pense que era el calor o un virus del estomago. A mi casi no me escucha; solo le hace caso a ese Spider Guy del juego Marvel Rivals. No se como voy a hacer que entienda esto.

English review translation: For weeks he drank water all day and woke up to use the bathroom. I thought it was the heat or a stomach virus. He barely listens to me; he only pays attention to that Spider Guy from Marvel Rivals. I do not know how I am going to help him understand this.

**tx-06 | Mateo:** Mami, tengo miedo. Tengo sed otra vez. Did I do something bad?

English review translation: Mom, I am scared. I am thirsty again. Did I do something bad?

**tx-07 | Nurse Dana:** No, buddy. You did not cause this, and your mom did not cause this. Type 1 diabetes means your body is not making enough insulin. Insulin is the medicine that helps sugar move from the blood into the cells for energy.

**tx-08 | Phone Interpreter:** [static] El no causo esto. La diabetes tipo 1 significa que su cuerpo necesita insulina. La insulina ayuda con el azucar en la sangre... I am sorry, Nurse, the audio cut out after that.

English review translation: [static] He did not cause this. Type 1 diabetes means his body needs insulin. Insulin helps with blood sugar... I am sorry, Nurse, the audio cut out after that.

**tx-09 | Nurse Dana:** Okay. The printed plan has the exact insulin doses. Check blood sugar at the times listed, give insulin exactly as prescribed, write the numbers down, and call the diabetes team with the numbers. A grown-up helps Mateo every time.

**tx-10 | Nurse Dana:** If Mateo vomits, breathes fast, is very confused, is hard to wake up, has moderate or large ketones, or his sugar stays outside the range on the plan, call the diabetes team or go to the emergency department. If it feels like an emergency, call 911.

**tx-11 | Phone Interpreter:** Si vomita, respira rapido, esta confundido, cuesta despertarlo, o hay cetonas... [static] ...llame al equipo o emergencias. La enfermera dice que use el plan escrito.

English review translation: If he vomits, breathes fast, is confused, is hard to wake up, or has ketones... [static] ...call the team or emergency services. The nurse says to use the written plan.

**tx-12 | Nurse Dana:** I know this is not enough time. You will get a Spanish video summary after the visit with the medicine plan, warning signs, school reminder, follow-up, and who to call. Please review it and call us if anything does not match what you understood today.

## End Transcript

AutoPostVisit workflow begins here: the app ingests the transcript above, pairs it with Mateo's patient education profile, detects the game-based learning hook, matches the donated spider hero avatar, generates a Spanish child-facing after-visit script, maps each generated claim to transcript/profile/discharge evidence, and routes it to nurse review before patient delivery.

## Extraction Targets

- Diagnosis context: new-onset type 1 diabetes with high glucose, ketones, vomiting, and DKA concern.
- Workflow pressure: rushed nurse, bad interpreter connection, discharge papers printing, another family waiting.
- Missed learning hook: Mrs. Rivera mentions a game-based spider-hero cue in Spanish that the rushed visit does not turn into teaching.
- Family strengths: Mrs. Rivera noticed symptoms, wants Mateo to understand, and is trying to participate.
- Child needs: Mateo is thirsty, scared, and worried he caused the illness.
- Education targets: insulin basics, blood sugar checks, ketones, warning signs, school reminder, follow-up, phone numbers.
- AutoPostVisit moment: infer the avatar match, write kid-level dialogue, and show the nurse a knowledge map before sending.

## Sources Used For Clinical Guardrails

- CDC Type 1 Diabetes: https://www.cdc.gov/diabetes/about/about-type-1-diabetes.html
- CDC Diabetic Ketoacidosis: https://www.cdc.gov/diabetes/about/diabetic-ketoacidosis.html
- CDC Just Diagnosed With Type 1 Diabetes: https://www.cdc.gov/diabetes/signs-symptoms/just-diagnosed-type-1.html
