# AGENTS.md — AI & Human Collaboration Guide

Welcome to **Attachment Map** (`vibeCode-attachementMaps`). This document defines engineering conventions, architecture standards, and collaboration rules for humans and autonomous AI coding agents.

---

## 1. Project Mission & Core Tenets

Attachment Map is a public, free, educational web application based on the peer-reviewed **ECR-RS (Experiences in Close Relationships–Relationship Structures, Fraley et al., 2011)** questionnaire.

### Critical Product Rules (PRD Ground Truth):
1. **Dimensional, Not Typological:** Attachment is measured along two continuous dimensions: Avoidance (X) and Anxiety (Y). Regions are descriptive prototypes, never hard diagnoses or labels.
2. **Language Safety (§8.1):**
   - **BANNED words/phrases:** "You are [style]", "diagnosis", "disorder", "toxic", "red flag", or diagnosing any other person.
   - **MANDATORY framing:** "Your answers suggest", "region most like the [prototype] prototype", "right now".
3. **Pure Client-Side Privacy:** No external telemetry, no remote user accounts. Everything stays in the user's browser (IndexedDB).
4. **Delivery Target:** Self-contained single `.html` file built via Vite + `vite-plugin-singlefile`, suitable for publishing as a Claude artifact (<16 MB).

---

## 2. Technical Architecture & Directory Structure

We adhere to Clean Architecture with strict separation of domain rules from UI and persistence:

```
src/
├── domain/                  # 100% pure psychometric & scoring logic (No DOM, no storage)
│   ├── ecr-rs.js            # Questionnaire items, rekeying (8 - x), avoidance/anxiety calculations
│   ├── summary-engine.js    # Rule-based pattern detection & reflection library (§8.1)
│   └── models.js            # Data types, schemas & validation
├── storage/                 # Persistence layer
│   ├── indexed-db.js        # Local database wrapper with in-memory fallback
│   └── io.js                # JSON export, import, schema validation
├── ui/                      # Presentation layer (Vanilla JS + CSS tokens)
│   ├── components/          # Reusable UI widgets (Header, Modal, QuestionCard, DotList)
│   ├── chart/               # SVG Attachment Map renderer (Gradients, axes, dots)
│   └── views/               # Screen orchestrators (ManagePeople, Questionnaire, Results, About)
├── export/                  # Export adapters
│   ├── image-export.js      # SVG & PNG canvas renderer
│   └── pdf-sheet.js         # jsPDF one-page printable sheet
├── index.css                # Design system tokens, dark/light theme, typography
└── main.js                  # Application entry point
tests/                       # Vitest test suite
├── scoring.test.js          # Verification against §6.4 test vectors
├── summary.test.js          # Rules engine test cases
└── storage.test.js          # IndexedDB & JSON import/export tests
```

---

## 3. Scrum Sprint Workflow for Agents & Humans

All work is tracked via GitHub Issues and Milestones.

### Sprints Map Directly to Milestones:
- **Milestone 1:** `Sprint 0: Architecture & AI-Agent Infrastructure`
- **Milestone 2:** `Sprint 1: Core ECR-RS Questionnaire & People Management (P0)`
- **Milestone 3:** `Sprint 2: Visual Attachment Map Chart & Offline Insights (P0)`
- **Milestone 4:** `Sprint 3: Export, PDF Sheet & Data Governance (P0 MVP Release)`
- **Milestone 5:** `Sprint 4: v1.1 Snapshots & AI Reflection (P1)`

### Picking Up a Task:
1. Filter issues by the active Sprint Milestone and label `agent-friendly`.
2. Inspect the linked PRD section in `docs/attachment-map-PRD.md`.
3. Create a feature branch: `feat/issue-<number>-<short-description>`.
4. Ensure tests cover all acceptance criteria before raising a Pull Request.

---

## 4. Scoring Algorithm Reference (§6.1 & §6.4)

```javascript
rekey(x) = 8 - x
avoidance = mean( rekey(i1), rekey(i2), rekey(i3), rekey(i4), i5, i6 )
anxiety   = mean( i7, i8, i9 )
```

### Verified Test Vectors:
| i1–i9 Responses | Avoidance | Anxiety |
|---|---|---|
| `[7, 7, 7, 7, 1, 1, 1, 1, 1]` | `1.00` | `1.00` |
| `[1, 1, 1, 1, 7, 7, 7, 7, 7]` | `7.00` | `7.00` |
| `[4, 4, 4, 4, 4, 4, 4, 4, 4]` | `4.00` | `4.00` |
| `[6, 5, 6, 5, 2, 3, 5, 4, 6]` | `2.50` | `5.00` |

*Any PR modifying calculation logic MUST ensure these 4 vectors and edge cases continue to pass.*

---

## 5. Development Commands

```bash
# Run local development server
npm run dev

# Run unit tests (Vitest)
npm test

# Build single-file artifact bundle (dist/index.html)
npm run build

# Preview built bundle
npm run preview
```
