export const assessmentMeta = {
  adhd: {
    id: "adhd",
    title: "ADHD",
    fullTitle: "Adult ADHD Screener",
    description:
      "A quick ADHD screen focused on organization, memory, restlessness, and follow-through in daily adult life.",
    estimate: "2-3 min",
    accentHex: "#FF6B6B",
    accentRgb: "255 107 107",
    badge: "Focus and follow-through",
    introHeading: "A short check-in for adult attention patterns",
    designedFor:
      "Adults aged 18 years or older who want an early screening signal around attention-deficit and hyperactivity symptoms.",
    limitations:
      "This prototype uses the publicly available 6-item ASRS-v1.1 screener. The full 18-item checklist requires separate permission to reproduce, so the ADHD flow here is intentionally a validated short screen rather than the full checklist.",
    questionWindow: "Past 6 months",
    source:
      "ASRS-v1.1 Screener developed with the World Health Organization and Harvard Medical School collaborators.",
    ranges: [
      {
        min: 0,
        max: 1,
        label: "Few positive responses",
        summary:
          "Your answers did not place many items in the positive screening range. If concentration or restlessness is still interfering with daily life, it may still be worth discussing with a clinician.",
      },
      {
        min: 2,
        max: 3,
        label: "Some elevated patterns",
        summary:
          "A few responses landed in the positive screening range. This does not confirm ADHD, but it may be useful to track where attention, organization, or impulsivity are affecting work, routines, or relationships.",
      },
      {
        min: 4,
        max: 6,
        label: "Positive screener",
        summary:
          "Four or more positive responses is the range the ASRS screener flags for a fuller clinical evaluation. A licensed professional can help determine whether ADHD or another factor best explains these patterns.",
      },
    ],
  },
  autism: {
    id: "autism",
    title: "Autism",
    fullTitle: "AQ-10 Autism Referral Screen",
    description:
      "A brief autism referral screen that looks at detail focus, social inference, and sensory noticing patterns.",
    estimate: "3-4 min",
    accentHex: "#4ECDC4",
    accentRgb: "78 205 196",
    badge: "Social processing and patterning",
    introHeading: "A brief referral guide for adults who wonder about autism",
    designedFor:
      "Adults who may be exploring autistic traits and do not have a moderate or severe learning disability.",
    limitations:
      "The AQ-10 is designed as a referral aid, not a diagnosis. A score above the referral threshold suggests that a specialist assessment may be worth considering.",
    questionWindow: "Current preferences and patterns",
    source:
      "AQ-10 from the Autism Research Centre and recommended by NICE as a quick adult referral aid.",
    ranges: [
      {
        min: 0,
        max: 3,
        label: "Below referral threshold",
        summary:
          "Your score stayed well below the AQ-10 referral threshold. That does not rule out autism, but the screener did not strongly flag autistic trait patterns today.",
      },
      {
        min: 4,
        max: 5,
        label: "Close to threshold",
        summary:
          "Your score sits just below the AQ-10 referral threshold. If these traits feel long-standing and important in daily life, discussing them with a specialist may still be useful.",
      },
      {
        min: 6,
        max: 10,
        label: "Referral recommended",
        summary:
          "A score of 6 or above is the AQ-10 referral threshold. This does not diagnose autism, but it suggests a specialist autism assessment may be worth pursuing.",
      },
    ],
  },
  depression: {
    id: "depression",
    title: "Depression",
    fullTitle: "PHQ-9 Depression Screen",
    description:
      "A standard two-week mood screen covering sleep, energy, appetite, concentration, and thoughts of self-harm.",
    estimate: "3-4 min",
    accentHex: "#FFB347",
    accentRgb: "255 179 71",
    badge: "Mood and daily functioning",
    introHeading: "A gentle two-week check-in on low mood and functioning",
    designedFor:
      "People who want a structured screening conversation about depressive symptoms over the past two weeks.",
    limitations:
      "PHQ-9 scores support screening and symptom tracking. They should be interpreted alongside clinical context, safety concerns, and everyday impairment.",
    questionWindow: "Past 2 weeks",
    source:
      "Patient Health Questionnaire-9 (PHQ-9), a widely used depression screener.",
    ranges: [
      {
        min: 0,
        max: 4,
        label: "Minimal",
        summary:
          "Your responses suggest minimal depressive symptom burden right now. If your lived experience feels heavier than the score suggests, trust that and reach out anyway.",
      },
      {
        min: 5,
        max: 9,
        label: "Mild",
        summary:
          "Your score lands in the mild range. Symptoms may be present without fully dominating day-to-day life, but they still deserve attention and care.",
      },
      {
        min: 10,
        max: 14,
        label: "Moderate",
        summary:
          "Your score falls in the moderate range. This often means symptoms are showing up often enough to affect work, rest, relationships, or motivation.",
      },
      {
        min: 15,
        max: 19,
        label: "Moderately severe",
        summary:
          "Your score suggests a heavier depression symptom load. Reaching out to a mental health professional would be a strong next step.",
      },
      {
        min: 20,
        max: 27,
        label: "Severe",
        summary:
          "Your score is in the severe range, which can reflect persistent symptoms and meaningful impairment. Please consider seeking professional care promptly.",
      },
    ],
  },
  anxiety: {
    id: "anxiety",
    title: "Anxiety",
    fullTitle: "GAD-7 Anxiety Screen",
    description:
      "A structured anxiety screen that checks for worry, tension, restlessness, irritability, and dread over the past two weeks.",
    estimate: "2-3 min",
    accentHex: "#A78BFA",
    accentRgb: "167 139 250",
    badge: "Worry, tension, and agitation",
    introHeading: "A short two-week check-in for worry and physical tension",
    designedFor:
      "People who want a quick screen for generalized anxiety symptoms and how intensely they have been showing up lately.",
    limitations:
      "The GAD-7 is a screening tool and severity measure. It cannot confirm a diagnosis or identify the full cause of anxiety symptoms on its own.",
    questionWindow: "Past 2 weeks",
    source:
      "Generalized Anxiety Disorder 7-item scale (GAD-7), a validated anxiety screener.",
    ranges: [
      {
        min: 0,
        max: 4,
        label: "Minimal",
        summary:
          "Your responses suggest minimal anxiety symptom burden right now. If stress still feels disruptive, support can still be appropriate even with a lower score.",
      },
      {
        min: 5,
        max: 9,
        label: "Mild",
        summary:
          "Your score suggests mild anxiety symptoms. You may be feeling the strain, even if it is still possible to function through it most days.",
      },
      {
        min: 10,
        max: 14,
        label: "Moderate",
        summary:
          "Your score falls in the moderate range. This is often the point where anxiety starts to interfere more clearly with rest, concentration, and daily rhythm.",
      },
      {
        min: 15,
        max: 21,
        label: "Severe",
        summary:
          "Your score suggests a high anxiety burden. A conversation with a clinician, therapist, or counselor would be a sensible next step.",
      },
    ],
  },
};

export const medicalDisclaimer =
  "MindCompass is a self-screening tool based on WHO-recommended questionnaires. It does not provide medical diagnoses. Please consult a licensed mental health professional for clinical evaluation.";

export function rgbWithAlpha(rgb, alpha) {
  return `rgb(${rgb} / ${alpha})`;
}
