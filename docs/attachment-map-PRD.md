# PRD — Attachment Map: A Relationship-Specific Anxiety × Avoidance Tool

| Field | Value |
|---|---|
| Document status | Draft v1.0 (for review) |
| Date | October 9, 2026 |
| Product type | Public, free, non-commercial, educational web app |
| Hosting | Published Claude artifact (single self-contained HTML page at a claude.ai link, shared publicly by the owner) |
| Primary instrument | ECR-RS (Fraley, Heffernan, Vicary & Brumbaugh, 2011), 9 items, 1–7 scale |
| Inspired by | Amir Levine, *Secure* (2026): the "attachment map" / "attachment topography" idea |

> **Positioning statement:** Attachment Map helps readers of *Secure* (and anyone curious about attachment research) plot how they feel in each of their close relationships on an anxiety × avoidance chart, without doing the arithmetic by hand. It is for self-reflection and education. It is **not** a diagnosis, a clinical assessment, or an official tool from the book.

---

## 1. Problem and context

### 1.1 Problem
*Secure* asks readers to build an "attachment map": rate several relationships and plot each one on a grid with an anxiety axis and an avoidance axis. Doing this by hand means answering the items per person, reverse-scoring, averaging, plotting, and keeping track of results across sessions. That is tedious and easy to get wrong (reverse-keying errors are common).

### 1.2 Evidence context (drives several requirements)
These findings come from the project knowledge base and are treated as design constraints:

- Adult attachment is **dimensional, not typological** (Fraley & Waller, 1998; Fraley, Hudson, Heffernan & Segal, 2015). Quadrant labels are shorthand; any cut-off is arbitrary.
- Attachment is **partly relationship-specific**. One person can score differently with their mother, father, partner and friend (Fraley et al., 2011). This is the evidence behind the "map" idea.
- Scores are **moderately stable and can change**. ECR-RS 30-day test–retest is about .65 for romantic relationships and about .80 for parents (Fraley lab).
- **No adult self-report attachment measure has clinical cut-offs.** "Attachment style" is not a DSM-5 or ICD-11 diagnosis.
- Levine's website quiz is a modified ECR-RS: items 1–7 and 9 match the public ECR-RS, item 8 is reworded, and a 10th proprietary "CARRP" item is added. No published validation was found for the modified version. Those two items are © Secure LLC.

### 1.3 Decision: which questionnaire
**Use the original, public 9-item ECR-RS, not Levine's modified 10-item version.**

| Option | Validated? | Licensing | Decision |
|---|---|---|---|
| Original ECR-RS (9 items) | Yes (Fraley et al., 2011) | Freely posted by Fraley's lab; non-commercial norms apply | ✅ Use |
| Levine's website quiz (10 items) | No published validation found | Items 8 (reworded) and 10 (CARRP) are proprietary | ❌ Do not reproduce |
| *Attached* quiz (Levine & Heller, 2010) | No | © 2010 Levine & Heller | ❌ Do not reproduce |

Consequence for users, stated in the app: dots may sit slightly differently from where Levine's website would place them, because one item differs and one is absent.

---

## 2. Goals and non-goals

### 2.1 Goals
1. Let a user add the people they want to map, answer 9 items per person, and see an accurate, automatically scored chart.
2. Persist responses in the user's browser so they can come back, edit, add people, and retest later.
3. Let the user download the chart (PNG/SVG) and a polished one-page "attachment map sheet" (PDF) with the chart, scores, summary and reflections.
4. Give a plain-language summary of patterns across relationships, from a rule-based engine (default) and, optionally, from an AI model.
5. Communicate the evidence honestly: what is established, what is debated, and what is the book author's framework.

### 2.2 Non-goals
- **Diagnosing** anyone, or producing clinical output. The product will not use the word "diagnosis" except to say it is not one.
- **Rating or guessing another person's attachment style.** Each dot is *the user's* attachment toward that person, never that person's own style. (*Secure* itself warns against diagnosing partners.)
- Reproducing any copyrighted quiz content from *Attached* or *Secure*.
- User accounts, cloud sync, or social sharing of results in v1.
- Use by minors. The instruments were normed on adults.
- Monetization of any kind (ads, paid tiers, data sale).

---

## 3. Users

| Persona | Description | Key need |
|---|---|---|
| **The reader** (primary) | Reading *Secure*, wants to do the attachment-map exercise for family and close people | Fast, correct scoring and a nice chart to keep |
| **The curious learner** | Heard about attachment styles online, wants a research-based self-check | Clear explanation of what scores mean and don't mean |
| **The returner** | Mapped relationships months ago, wants to see if anything changed | Saved history and comparison over time |

Assumed user: adult (18+), non-expert, on mobile or desktop, English-speaking (v1).

---

## 4. User stories and acceptance criteria

Priority: **P0** = MVP, **P1** = next release, **P2** = later.

### Epic A — Mapping relationships
**A1 (P0, main story).** *As a reader of the book, I want a tool that creates the chart of my attachment with each family member, so that I don't have to do the computations by hand.*
- Given I have answered all 9 items for a person, when I save, then their avoidance and anxiety scores are computed exactly per §6 and a dot appears on the chart.
- Scores shown match a hand calculation for the test vectors in §6.4.

**A2 (P0).** *As a user, I want to add, rename, edit and delete people*, choosing a relationship type (mother, father, partner, sibling, child, friend, other family, other) and a display name or nickname.
- Deleting a person asks for confirmation and removes their responses from storage.

**A3 (P0).** *As a user, I want to rate "close relationships in general"* as an optional extra point, so I can compare my general pattern with specific relationships.
- Uses the ECR-RS global item set (§5.2) and appears on the chart with a distinct marker.

**A4 (P0).** *As a user whose parent has died, I want the option to skip, or to answer about how I felt when they were alive.*
- Follows Fraley's conditional instructions (§5.3).

**A5 (P1).** *As a returner, I want to retake the questionnaire for a person and see how my dot moved over time.*
- Each completed rating is saved as a dated snapshot. The chart can show the previous snapshot as a faded dot with an arrow to the current one.
- The app explains that short-term movement is normal (§9).

### Epic B — Understanding results
**B1 (P0).** *As a user, I want a plain-language summary of my map* from the rule-based engine (§8.1), with no network calls.

**B2 (P1).** *As a user, I want an optional AI-written reflection* that personalizes the summary (§8.2), and I want to explicitly agree before any data leaves my device.

**B3 (P0).** *As a user, I want to know what's evidence and what's the book author's framework.* Every educational statement carries a tier label: **Established**, **Debated**, or **Author's framework**.

### Epic C — Saving and downloading
**C1 (P0).** *As a user, I want my responses to persist in my browser* so that I can close the tab and come back later.

**C2 (P0).** *As a user, I want to download the chart* as PNG and SVG.

**C3 (P0).** *As a user, I want to download a nice "attachment map sheet"* (PDF, one page, A4/Letter) with my chart, scores, summary and reflections (§7.4).

**C4 (P0).** *As a user, I want to export all my data to a file and import it later* so I don't lose it when browser storage is cleared or I switch devices.

**C5 (P0).** *As a user, I want a single "delete all my data" button.*

---

## 5. Questionnaire specification

### 5.1 Relationship-specific items (verbatim from Fraley's lab page)
Instruction template: *"Please answer the following questions about [display name] ([relationship type])."*

| # | Item | Scale | Reverse |
|---|---|---|---|
| 1 | It helps to turn to this person in times of need. | Avoidance | Yes |
| 2 | I usually discuss my problems and concerns with this person. | Avoidance | Yes |
| 3 | I talk things over with this person. | Avoidance | Yes |
| 4 | I find it easy to depend on this person. | Avoidance | Yes |
| 5 | I don't feel comfortable opening up to this person. | Avoidance | No |
| 6 | I prefer not to show this person how I feel deep down. | Avoidance | No |
| 7 | I often worry that this person doesn't really care for me. | Anxiety | No |
| 8 | I'm afraid that this person may abandon me. | Anxiety | No |
| 9 | I worry that this person won't care about me as much as I care about **them**. | Anxiety | No |

**Wording change:** the original item 9 ends "him or her." We use "them." Fraley's lab explicitly endorses adapting target wording. This change is noted on the About page.

### 5.2 General / global items (verbatim from Fraley's lab, 2014 update)
Instruction: *"Please read each of the following statements and rate the extent to which you believe each statement best describes your feelings about close relationships in general."*

1. It helps to turn to people in times of need. (R)
2. I usually discuss my problems and concerns with others. (R)
3. I talk things over with people. (R)
4. I find it easy to depend on others. (R)
5. I don't feel comfortable opening up to others.
6. I prefer not to show others how I feel deep down.
7. I often worry that other people do not really care for me.
8. I'm afraid that other people may abandon me.
9. I worry that others won't care about me as much as I care about them.

Same keying: items 1–6 avoidance (1–4 reversed), items 7–9 anxiety.

### 5.3 Conditional instructions (adapted from Fraley's lab)
- **Parent (mother/father type):** ask "Is this person alive?" If no, show: *"We'd like you to answer these questions about how you felt when they were alive, if you're comfortable doing so."* with options **Answer** / **Skip this person**.
- **Partner, not currently in a relationship:** *"Answer about your most recent meaningful relationship. If you have never been in a romantic relationship, imagine what such a relationship would be like."*

### 5.4 Response scale
- 7 points, labeled at minimum: **1 = Strongly disagree**, **4 = Neither disagree nor agree**, **7 = Strongly agree**. This matches the 2011 publication.
- The 1–7 scale is fixed for the product. Fraley's lab now uses 5 points, but mixing scales would make snapshots incomparable.

### 5.5 Administration rules
- Randomize item order **within** each person's set. Store the order shown for reproducibility.
- Show one person at a time. Display progress (e.g., "4 of 9").
- All 9 items are required to score a person. Partial answers are saved as a draft and not plotted.
- A "Prefer not to answer about this person" exit is always available.

---

## 6. Scoring specification

### 6.1 Algorithm (per person, per snapshot)
```
rekey(x) = 8 - x
avoidance = mean( rekey(i1), rekey(i2), rekey(i3), rekey(i4), i5, i6 )
anxiety   = mean( i7, i8, i9 )
```
- Range 1.00–7.00 for both. Store full precision; display to 2 decimals.
- Compute scores at read time from raw responses (raw responses are the source of truth), so a scoring bug fix never requires migrating data.

### 6.2 Global score
- Preferred: the separate general item set (§5.2), scored the same way.
- Do **not** silently average relationship scores into a "global" score. If shown at all (P2), label it "Average across the people you added" and explain that it weights everyone equally.

### 6.3 What is not computed
- No type classification output (e.g., "You are avoidant"). Regions are descriptive only (§7.2).
- No "security score" single index in v1. Averaging the two dimensions collapses meaningful differences.

### 6.4 Test vectors (must pass in unit tests)
| Responses i1–i9 | Avoidance | Anxiety |
|---|---|---|
| 7,7,7,7,1,1,1,1,1 | 1.00 | 1.00 |
| 1,1,1,1,7,7,7,7,7 | 7.00 | 7.00 |
| 4,4,4,4,4,4,4,4,4 | 4.00 | 4.00 |
| 6,5,6,5,2,3,5,4,6 | 2.50 | 5.00 |

(Row 4: rekeyed 2,3,2,3 + 2,3 → 15/6 = 2.50; anxiety 15/3 = 5.00.)

---

## 7. Chart and outputs

### 7.1 Chart layout
- X axis: **Avoidance** (1 → 7, left to right). Y axis: **Anxiety** (1 → 7, bottom to top). The low–low corner is the prototypically secure region.
  - Note: Levine's book orients its grid differently (per the Slate interview, X = secure→anxious, Y = secure→avoidant). We follow the research-standard orientation and state it on the chart. *Open question Q4 if you'd rather match the book.*
- Each person = one dot, labeled with display name, colored by relationship type, with a distinct shape for the "In general" point.
- Accessible: labels never rely on color alone; dots have text labels; data table view available.

### 7.2 Regions (soft, not hard borders)
- Gradient shading, centered on the scale midpoint (4.0), with region captions written as prototypes:
  - Low anxiety / low avoidance: *"most like the secure prototype"*
  - High anxiety / low avoidance: *"most like the anxious (preoccupied) prototype"*
  - Low anxiety / high avoidance: *"most like the avoidant (dismissing) prototype"*
  - High anxiety / high avoidance: *"most like the fearful-avoidant prototype"*
- **Why the midpoint:** it has a clear meaning on the response scale ("neither disagree nor agree") and doesn't depend on a sample. This is a design choice, not an empirical boundary, and the About page says so. Using the midpoint labels fewer people "avoidant" than a median split would.
- A dot within the **boundary band** (initially ±0.5 of 4.0 on that dimension; configurable) is described as "near the border between regions." The ±0.5 value is a UX choice, not derived from data.

### 7.3 Measurement-uncertainty halo (P1)
- Each dot can show a faint halo representing measurement error.
- **Open item:** the knowledge base only has an error estimate for the 36-item ECR-R (about ±0.7 for a 95% band). The 3-item anxiety scale will have a **wider** band. The halo size must be computed from published ECR-RS reliability and SD values before release. Until then, ship without the halo rather than show an invented number.

### 7.4 Normative reference (P1, conditional)
- Show reference lines **only if** ECR-RS norms by relationship type are sourced (candidate sources: Fraley et al., 2011; Fraley et al., 2015, which reports large-sample means and SDs).
- Do **not** reuse the ECR-R norms (avoidance 2.92, anxiety 3.56) as if they were ECR-RS norms. They come from a different, longer instrument.
- Any norm shown names its sample (internet sample, mostly young and female, WEIRD) and its age.

### 7.5 Downloads
| Output | Priority | Spec |
|---|---|---|
| Chart PNG | P0 | 2× resolution, white or dark background matching theme, includes title, date, axis labels and legend |
| Chart SVG | P0 | Same content, vector |
| **Attachment Map Sheet (PDF)** | P0 | See below |
| Data export (JSON) | P0 | Full data per §10, versioned schema |
| Data import (JSON) | P0 | Validates schema; offers "merge" or "replace" |

**Delivery mechanism:** in a published artifact, plain download links and script-triggered saves do nothing. All five outputs are generated in the page and handed to the viewer through the `downloads` capability (`await claude.use("downloads")`, then `downloads.save({ filename, data })`), only on an explicit click. The viewer sees a confirmation and can decline, so the UI handles rejection quietly. If the capability resolves `null`, hide the download buttons and show "Downloads aren't available in this view." Import works without a capability, through a normal file picker read with `FileReader`.

**Attachment Map Sheet — one page, A4 or Letter (user choice):**
1. Header: "My Attachment Map," user-chosen title, date.
2. The chart (vector, large).
3. Score table: person, relationship type, avoidance, anxiety, region description, date rated.
4. Summary: the rule-based summary (and the AI reflection, if the user generated and chose to include it, clearly labeled "AI-generated").
5. "Reflections to take with you": 3–5 evidence-tiered prompts chosen by the rules engine (§8.1).
6. Footer: "For self-reflection and education. Not a diagnosis or clinical assessment." Instrument citation: Fraley, Heffernan, Vicary & Brumbaugh (2011). "Inspired by, not affiliated with, *Secure* by Amir Levine."
- Generated client-side; no data sent to a server.
- Option to hide names (replace with initials or relationship type) for privacy before sharing.

---

## 8. Summary engines

### 8.1 Rule-based summary (P0, default, offline)
Deterministic templates triggered by score patterns. Requirements:

**Per-person sentences** — e.g., *"With Mom, your answers sit in the region most like the secure prototype: you report finding it fairly easy to depend on her and you don't worry much about her caring for you."* Built from region + which items drove the score (e.g., highest-scoring items on each dimension).

**Cross-relationship patterns** (only when ≥ 2 people are scored):
| Pattern | Rule (initial) | Message theme | Tier |
|---|---|---|---|
| Spread | Range on a dimension ≥ 2.0 points | Your feelings differ a lot between relationships; this is common | Established (relationship specificity) |
| Consistency | All dots within 1.0 on both dimensions | You report a similar pattern across these relationships | Established |
| Most secure relationship | Lowest (avoidance + anxiety) | Levine calls these "kernels of security" | Author's framework |
| Parents vs. others | Mean difference ≥ 1.0 between parent and non-parent dots | Parent ratings tend to be more stable over time than partner ratings | Established |
| General vs. specific | "In general" dot differs ≥ 1.0 from the average of specific dots | General and specific attachment are related but distinct | Established |

The numeric thresholds above are initial UX choices, not evidence-based cut-offs, and must be labeled as such in code comments and the About page.

**Reflections library** (3–5 selected per sheet), each tagged with a tier, e.g.:
- *Established:* "These scores describe how you see these relationships right now. Attachment is moderately stable but can change; consider retaking this in a few months."
- *Established:* "High scores aren't a disorder. Attachment style isn't a clinical diagnosis."
- *Debated:* "Brief reminders of supportive people can shift how secure you feel in the moment; whether this produces lasting change is not well established."
- *Author's framework:* "*Secure* suggests looking for small, reliable interactions in your relationships. This idea hasn't been tested in published trials."

**Language rules (apply to all copy):**
- Never: "You are [style]," "diagnosis," "disorder," "toxic," "red flag," or any statement about the *other* person's style.
- Always: "your answers suggest," "region most like," "right now."
- Avoid stigmatizing framing of avoidance.

### 8.2 AI reflection (P1, opt-in)
- **Off by default.** Before first use, a consent dialog states exactly what is sent and to whom.
- **Data minimization:** send scores, relationship *types* and the rule-based summary. Never send display names (replace with "Person A, B…"), never send raw item responses unless needed (decision: not needed).
- **Prompt guardrails (system prompt requirements):** no diagnosis, no claims about other people's styles, no therapy recommendations beyond a generic "consider talking with a professional if this brings up distress," evidence-tier labeling, educational tone, must not contradict the rule-based numbers, length cap (~250 words).
- **Post-processing:** a client-side filter rejects outputs containing banned phrases (e.g., "you are avoidant," "diagnos") and falls back to the rule-based summary.
- Output is labeled "AI-generated reflection; may contain errors."
- **Architecture:** AI calls use the published artifact's `sample` runtime capability (`await claude.use("sample")`), which the claude.ai viewer provides. There is no API key, no proxy, and no server for us to run. The platform asks the viewer for consent on the first call.
  - Do **not** use `fetch("https://api.anthropic.com/v1/messages")`. That only works in the chat's artifact preview; a published page's content-security policy blocks it.
  - If `claude.use("sample")` resolves `null` (signed-out visitor, capability not granted, or unavailable), hide the AI button and show only the rule-based summary.
  - On `not_granted`, hide the feature for that page load; on `rate_limited`, show "Try again later" and never retry in a loop.
  - Use `sample.json` with a strict output schema (`{ reflection: string, tiers: [...] }`), `modelTier: "default"`, and `cache: false`.
  - Usage is handled by the claude.ai platform for the viewer. The platform documentation available to us doesn't state exactly which account's limits a viewer's calls count against; confirm with a second test account before launch (Q1).

---

## 9. Educational content (P0)
Short pages, each statement tier-labeled, sourced from the knowledge base:
- **What the two dimensions mean** (anxiety ≈ worry about closeness and abandonment; avoidance ≈ discomfort with dependence and opening up).
- **Why there are no real "types"** (taxometric evidence).
- **Why your dots differ by person** (relationship specificity).
- **Can it change?** (modest change over time and in therapy; quick fixes not established).
- **About this tool**: instrument, citation, wording changes, cut-off choices, relationship to *Secure* and Levine's website quiz, what's not validated.
- **If this brings up something hard**: links to mental-health and crisis resources (localized by browser locale where possible; at minimum US 988 and an international directory). No categorical claims about confidentiality of those services.

---

## 10. Data and storage

### 10.1 Storage
- **IndexedDB** (via a small wrapper) as primary store; `localStorage` only for UI preferences (theme, last-opened tab). Both work in published artifacts and are private to this artifact in each viewer's own browser. Neither the owner nor Claude can see another viewer's data. All reads/writes wrapped in try/catch; app works (in-memory) if storage comes back empty or unavailable, with a visible warning to export data.
- **Not used in v1:** the artifact `db` capability. It could sync a viewer's map across devices (private per-user rows under `data/users/<id>`), but it stores relationship data on claude.ai servers. That conflicts with the "stays on your device" promise, so it's a possible P2 opt-in.
- Nothing is sent to any server except, if the user opts in, the minimized AI payload (§8.2).
- Banner on first save: "Your answers are stored only in this browser. Clearing browser data deletes them. Export a copy to keep it safe."

### 10.2 Data model (v1)
```jsonc
{
  "schemaVersion": 1,
  "instrument": { "id": "ECR-RS", "scale": "1-7", "itemWordingVersion": "2026-10-them" },
  "people": [
    {
      "id": "uuid",
      "displayName": "Mom",
      "relationshipType": "mother",       // mother|father|partner|sibling|child|friend|other_family|other|general
      "isAlive": true,                    // parents only, optional
      "color": "#...",                    // optional override
      "snapshots": [
        {
          "id": "uuid",
          "completedAt": "2026-10-09T18:00:00Z",
          "itemOrder": [3,7,1,9,5,2,8,4,6],
          "responses": { "1": 6, "2": 5, "3": 6, "4": 5, "5": 2, "6": 3, "7": 5, "8": 4, "9": 6 },
          "context": "currently_in_relationship"   // partner only, optional
        }
      ],
      "draft": null
    }
  ],
  "settings": { "pdfPaper": "A4", "hideNamesOnExport": false, "aiConsent": false }
}
```
- Scores are **derived**, not stored.
- Import validates `schemaVersion`, response ranges (integers 1–7), and item completeness; rejects with a clear message on failure.

---

## 11. Technical architecture

| Layer | Choice (proposed) | Notes |
|---|---|---|
| Delivery | One self-contained `.html` file, published as a Claude artifact | Owner shares the claude.ai link publicly. Must stay under 16 MB. |
| Front end | Vanilla JS or React 18 loaded as a UMD `<script>` from cdnjs/jsDelivr at an exact pinned version | Content-security policy allows scripts only from cdnjs, jsDelivr, the Tailwind play CDN and code.jquery.com; no remote images; inline all CSS |
| Charting | Hand-built inline SVG | Full control of gradients, halos, labels; SVG export is trivial |
| PNG export | Render SVG to canvas, then `downloads.save` | |
| PDF sheet | jsPDF (UMD from cdnjs, pinned) with the chart drawn as vector, then `downloads.save` | Spike needed: confirm one-page layout on mobile |
| Storage | IndexedDB / localStorage, per viewer | §10 |
| AI | `sample` capability | No key, no proxy, no server (§8.2) |
| Declared capabilities | `{ sample: {}, downloads: true }` | Nothing else; no `db`, `user`, `assets` or `mcp` |
| Analytics | None | Artifacts can't call third-party analytics anyway |
| i18n | Strings externalized from day one; English only in v1 | Translated items must use published translations listed on Fraley's site |
| Theme | CSS color tokens on `:root`, dark-mode overrides, `viewport-fit=cover` and safe-area padding | Required for published artifacts on phones |

**Browser support:** last two versions of Chrome, Safari (incl. iOS), Firefox, Edge.

---

## 12. Non-functional requirements
- **Privacy:** no accounts, no cookies beyond functional storage, no third-party trackers. Privacy page in plain language.
- **Accessibility:** WCAG 2.2 AA. Response scale usable by keyboard and screen reader (radio group with labeled anchors). Chart has a table alternative.
- **Performance:** first load < 2 s on mid-range mobile over 4G; PDF generation < 3 s.
- **Reliability:** scoring covered by unit tests (§6.4) and property tests (scores always within 1–7).
- **Age gate:** simple 18+ confirmation on first launch.
- **Content safety:** all copy reviewed against §8.1 language rules before release.

---

## 13. Legal and licensing
| Item | Requirement |
|---|---|
| ECR-RS items | Freely posted by Fraley's lab with no separate licence; ECR-R terms allow non-commercial research use and require permission for commercial use. **Before launch, email R. Chris Fraley (UIUC) to confirm a free, public, educational app is acceptable.** |
| Citation | Cite Fraley, Heffernan, Vicary & Brumbaugh (2011) in-app and on the PDF sheet |
| *Secure* / *Attached* | No reproduction of quiz items, figures or proprietary terms beyond brief, attributed mentions (e.g., "Levine calls these 'kernels of security'") |
| Trademarks | Don't use "Secure," Levine's name or "CARRP" in the app name or logo; state non-affiliation |
| Disclaimer | Persistent "educational, not a diagnosis" notice on results, sheet and About page |

*Not legal advice. If in doubt about naming or the book's trademarks, check with someone qualified.*

---

## 14. Success metrics (privacy-preserving)
- Users who complete ≥ 2 people (from aggregate, anonymous event counts only, if analytics enabled).
- Sheet downloads per completed map.
- Zero reported scoring errors (validated against test vectors and hand calculation).
- Qualitative: user feedback that the summary was clear and didn't feel like a label.

---

## 15. Release plan
| Phase | Scope |
|---|---|
| **MVP (P0)** | People management, 9-item questionnaire + general set, scoring, chart with soft regions, rule-based summary, PNG/SVG/PDF downloads, JSON export/import, educational pages, disclaimers |
| **v1.1 (P1)** | Snapshots over time, uncertainty halo (once sourced), norms overlay (once sourced), AI reflection via `sample` |
| **Later (P2)** | Translations, "average across people" view, themes for the sheet |

---

## 16. Open questions and risks
| # | Question / risk | Recommendation |
|---|---|---|
| Q1 | ~~Who pays for AI calls?~~ **Resolved:** the `sample` capability of the published artifact, no key or proxy. Remaining check: confirm with a second claude.ai account which account's limits a viewer's calls use, and what a signed-out visitor sees | Test before launch |
| Q2 | ECR-RS norms by relationship type are not in the knowledge base | Source from Fraley et al. (2011, 2015) before enabling the overlay |
| Q3 | Halo size for 3- and 6-item scales not yet calculated | Compute from published reliabilities; ship without halo until then |
| Q4 | Chart orientation: research standard vs. the book's grid | Research standard by default; possible toggle |
| Q5 | Fraley's permission for public educational use | Email before launch |
| R1 | Users treat region captions as labels/diagnoses | Soft gradients, prototype wording, persistent disclaimers, no "you are X" copy |
| R2 | Data loss from cleared browser storage | Prominent export reminders |
| R3 | AI output drifts from evidence or labels people | Guardrails, banned-phrase filter, fallback to rules |
| R5 | Signed-out visitors or viewers who decline consent get no AI reflection | Rule-based summary is always complete on its own; AI is an extra |
| R4 | Distress triggered by results (e.g., parent who died, abandonment items) | Skip options, gentle copy, visible support resources |

---

## 17. References
- Fraley, R. C., Heffernan, M. E., Vicary, A. M., & Brumbaugh, C. C. (2011). The Experiences in Close Relationships–Relationship Structures questionnaire. *Psychological Assessment, 23*(3), 615–625. https://doi.org/10.1037/a0022898
- Fraley, R. C. Relationship Structures (ECR-RS) Questionnaire [lab page; items, scoring, 2014 global items, conditional logic]. https://labs.psychology.illinois.edu/~rcfraley/measures/relstructures.htm
- Fraley, R. C., Hudson, N. W., Heffernan, M. E., & Segal, N. (2015). Are adult attachment styles categorical or dimensional? *Journal of Personality and Social Psychology, 109*(2), 354–368. https://doi.org/10.1037/pspp0000027
- Fraley, R. C., Vicary, A. M., Brumbaugh, C. C., & Roisman, G. I. (2011). Patterns of stability in adult attachment. *Journal of Personality and Social Psychology, 101*(5), 974–992. https://doi.org/10.1037/a0024150
- Bartholomew, K., & Horowitz, L. M. (1991). Attachment styles among young adults. *Journal of Personality and Social Psychology, 61*(2), 226–244. https://doi.org/10.1037/0022-3514.61.2.226
- Levine, A. (2026). *Secure: The Revolutionary Guide to Creating a Secure Life.* Tarcher.
- Project knowledge base: *Adult Attachment and the Anxiety × Avoidance Model: A Knowledge Base for an Attachment App.*
