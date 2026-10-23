/**
 * ECR-RS Psychometric Scoring & Questionnaire Engine
 * Based on Fraley, Heffernan, Vicary & Brumbaugh (2011)
 *
 * Ground truth rules from PRD:
 * - Avoidance: mean(rekey(i1), rekey(i2), rekey(i3), rekey(i4), i5, i6)
 * - Anxiety: mean(i7, i8, i9)
 * - rekey(x) = 8 - x
 * - Scale: 1 to 7 integer responses
 */

export const RELATIONSHIP_TYPES = Object.freeze({
  MOTHER: 'mother',
  FATHER: 'father',
  PARTNER: 'partner',
  SIBLING: 'sibling',
  CHILD: 'child',
  FRIEND: 'friend',
  OTHER_FAMILY: 'other_family',
  OTHER: 'other',
  GENERAL: 'general'
});

export const RELATIONSHIP_LABELS = Object.freeze({
  [RELATIONSHIP_TYPES.MOTHER]: 'Mother',
  [RELATIONSHIP_TYPES.FATHER]: 'Father',
  [RELATIONSHIP_TYPES.PARTNER]: 'Partner',
  [RELATIONSHIP_TYPES.SIBLING]: 'Sibling',
  [RELATIONSHIP_TYPES.CHILD]: 'Child',
  [RELATIONSHIP_TYPES.FRIEND]: 'Friend',
  [RELATIONSHIP_TYPES.OTHER_FAMILY]: 'Other Family',
  [RELATIONSHIP_TYPES.OTHER]: 'Other',
  [RELATIONSHIP_TYPES.GENERAL]: 'Close Relationships in General'
});

/**
 * 9 Relationship-specific ECR-RS Items (Fraley et al., 2011)
 * Item 9 adapts "him or her" to modern gender-neutral "them".
 */
export const RELATIONSHIP_ITEMS = Object.freeze([
  { id: 1, text: "It helps to turn to this person in times of need.", dimension: 'avoidance', reverse: true },
  { id: 2, text: "I usually discuss my problems and concerns with this person.", dimension: 'avoidance', reverse: true },
  { id: 3, text: "I talk things over with this person.", dimension: 'avoidance', reverse: true },
  { id: 4, text: "I find it easy to depend on this person.", dimension: 'avoidance', reverse: true },
  { id: 5, text: "I don't feel comfortable opening up to this person.", dimension: 'avoidance', reverse: false },
  { id: 6, text: "I prefer not to show this person how I feel deep down.", dimension: 'avoidance', reverse: false },
  { id: 7, text: "I often worry that this person doesn't really care for me.", dimension: 'anxiety', reverse: false },
  { id: 8, text: "I'm afraid that this person may abandon me.", dimension: 'anxiety', reverse: false },
  { id: 9, text: "I worry that this person won't care about me as much as I care about them.", dimension: 'anxiety', reverse: false }
]);

/**
 * 9 General / Global ECR-RS Items (Fraley Lab 2014)
 */
export const GLOBAL_ITEMS = Object.freeze([
  { id: 1, text: "It helps to turn to people in times of need.", dimension: 'avoidance', reverse: true },
  { id: 2, text: "I usually discuss my problems and concerns with others.", dimension: 'avoidance', reverse: true },
  { id: 3, text: "I talk things over with people.", dimension: 'avoidance', reverse: true },
  { id: 4, text: "I find it easy to depend on others.", dimension: 'avoidance', reverse: true },
  { id: 5, text: "I don't feel comfortable opening up to others.", dimension: 'avoidance', reverse: false },
  { id: 6, text: "I prefer not to show others how I feel deep down.", dimension: 'avoidance', reverse: false },
  { id: 7, text: "I often worry that other people do not really care for me.", dimension: 'anxiety', reverse: false },
  { id: 8, text: "I'm afraid that other people may abandon me.", dimension: 'anxiety', reverse: false },
  { id: 9, text: "I worry that others won't care about me as much as I care about them.", dimension: 'anxiety', reverse: false }
]);

export const LIKERT_SCALE = Object.freeze([
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Slightly disagree" },
  { value: 4, label: "Neither disagree nor agree" },
  { value: 5, label: "Slightly agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly agree" }
]);

/**
 * Rekey an inverted Likert response on a 1-7 scale.
 * @param {number} x Response value between 1 and 7
 * @returns {number} 8 - x
 */
export function rekey(x) {
  if (typeof x !== 'number' || x < 1 || x > 7) {
    throw new Error(`Invalid response for rekeying: ${x}. Must be between 1 and 7.`);
  }
  return 8 - x;
}

/**
 * Validates that an answers object or array contains all 9 valid responses.
 * @param {Record<number|string, number> | number[]} responses
 * @returns {Record<number, number>} Normalized 1-indexed response map
 */
export function normalizeResponses(responses) {
  const normalized = {};

  if (Array.isArray(responses)) {
    if (responses.length !== 9) {
      throw new Error(`Expected exactly 9 responses, got ${responses.length}.`);
    }
    for (let i = 0; i < 9; i++) {
      const val = responses[i];
      if (!Number.isInteger(val) || val < 1 || val > 7) {
        throw new Error(`Item ${i + 1} value ${val} is not an integer between 1 and 7.`);
      }
      normalized[i + 1] = val;
    }
  } else if (typeof responses === 'object' && responses !== null) {
    for (let id = 1; id <= 9; id++) {
      const val = responses[id] ?? responses[String(id)];
      if (val === undefined || val === null) {
        throw new Error(`Missing response for item ${id}.`);
      }
      if (!Number.isInteger(val) || val < 1 || val > 7) {
        throw new Error(`Item ${id} value ${val} is not an integer between 1 and 7.`);
      }
      normalized[id] = val;
    }
  } else {
    throw new Error("Invalid responses format. Expected an array of 9 integers or an object keyed 1-9.");
  }

  return normalized;
}

/**
 * Computes Avoidance and Anxiety dimensions from 9 responses.
 * @param {Record<number|string, number> | number[]} responses
 * @returns {{ avoidance: number, anxiety: number }}
 */
export function scoreResponses(responses) {
  const norm = normalizeResponses(responses);

  // Rekey items 1, 2, 3, 4
  const avoidanceValues = [
    rekey(norm[1]),
    rekey(norm[2]),
    rekey(norm[3]),
    rekey(norm[4]),
    norm[5],
    norm[6]
  ];

  const anxietyValues = [
    norm[7],
    norm[8],
    norm[9]
  ];

  const avoidanceMean = avoidanceValues.reduce((sum, v) => sum + v, 0) / avoidanceValues.length;
  const anxietyMean = anxietyValues.reduce((sum, v) => sum + v, 0) / anxietyValues.length;

  return {
    avoidance: avoidanceMean,
    anxiety: anxietyMean
  };
}

/**
 * Formats score for display (2 decimal places).
 * @param {number} score
 * @returns {string} e.g. "2.50"
 */
export function formatScore(score) {
  return score.toFixed(2);
}

export const REGION_PROTOTYPES = Object.freeze({
  SECURE: 'secure',
  ANXIOUS: 'anxious',
  AVOIDANT: 'avoidant',
  FEARFUL: 'fearful'
});

export const REGION_DESCRIPTIONS = Object.freeze({
  [REGION_PROTOTYPES.SECURE]: "most like the secure prototype",
  [REGION_PROTOTYPES.ANXIOUS]: "most like the anxious (preoccupied) prototype",
  [REGION_PROTOTYPES.AVOIDANT]: "most like the avoidant (dismissing) prototype",
  [REGION_PROTOTYPES.FEARFUL]: "most like the fearful-avoidant prototype"
});

/**
 * Classifies coordinates into descriptive prototype region and boundary proximity.
 * PRD §7.2: Soft midpoint 4.0. Border band is +/- 0.5 of 4.0 (3.50 to 4.50).
 * @param {number} avoidance
 * @param {number} anxiety
 * @param {number} [midpoint=4.0]
 * @param {number} [borderBand=0.5]
 * @returns {{
 *   prototype: string,
 *   description: string,
 *   isNearBorder: boolean,
 *   borderNotes: string[]
 * }}
 */
export function classifyRegion(avoidance, anxiety, midpoint = 4.0, borderBand = 0.5) {
  const isHighAvoidance = avoidance > midpoint;
  const isHighAnxiety = anxiety > midpoint;

  let prototype;
  if (!isHighAvoidance && !isHighAnxiety) {
    prototype = REGION_PROTOTYPES.SECURE;
  } else if (!isHighAvoidance && isHighAnxiety) {
    prototype = REGION_PROTOTYPES.ANXIOUS;
  } else if (isHighAvoidance && !isHighAnxiety) {
    prototype = REGION_PROTOTYPES.AVOIDANT;
  } else {
    prototype = REGION_PROTOTYPES.FEARFUL;
  }

  const borderNotes = [];
  const nearAvoidanceBorder = Math.abs(avoidance - midpoint) <= borderBand;
  const nearAnxietyBorder = Math.abs(anxiety - midpoint) <= borderBand;

  if (nearAvoidanceBorder) {
    borderNotes.push("near the border on avoidance");
  }
  if (nearAnxietyBorder) {
    borderNotes.push("near the border on anxiety");
  }

  return {
    prototype,
    description: REGION_DESCRIPTIONS[prototype],
    isNearBorder: borderNotes.length > 0,
    borderNotes
  };
}
