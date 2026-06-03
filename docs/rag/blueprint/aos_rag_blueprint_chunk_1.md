# AOS RAG Blueprint — Chunk 1: AOS Conceptual Architecture

---

> **Continuity from Chunk 0**: Chunk 0 established the thesis (RAG as evidence authority layer), system goals, anti-goals, phased architecture, deliverable map, and the first 15 decisions. Chunk 1 now details the operating system that RAG must serve.

---

## 1.1 — The AOS Lifecycle

AOS is not a collection of files. It is a lifecycle machine. Every piece of learning, every technical project, every career claim passes through a disciplined sequence. RAG must understand this sequence structurally — not as decoration, but as the authority model it retrieves against.

### The canonical lifecycle

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │   PRODUCE ──► REVIEW ──► REVISE ──► AUDIT ──► COMMIT ──► CLOSE    │
  │      │           │          │          │          │          │       │
  │   artifact    review     revision    audit     commit    closure    │
  │   created    generated   applied    rendered   pushed    recorded   │
  │                                                                     │
  │   Evidence   Evidence    Evidence   Evidence   Evidence  Evidence   │
  │   class:     class:      class:     class:     class:    class:     │
  │   DRAFT      REVIEW      REVISION   AUDIT      COMMIT   CLOSED     │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘
```

Each stage produces a different **evidence class**. These classes are not interchangeable. A draft is not a review. A review is not an audit. An audit is not closure. RAG must know which class a source belongs to and what that class can support.

### Lifecycle stages in detail

| Stage | What happens | Evidence produced | Authority level | Can support career claims? |
|---|---|---|---|---|
| **Produce** | An artifact is created from a template, prompt, or module assignment. It may be a statistical plan, a lesson, a DAG, a code artifact, or a portfolio case. | Draft artifact | Low — work in progress | **No** |
| **Review** | A reviewer agent evaluates the artifact against a rubric. The review identifies strengths, weaknesses, and required revisions. | Review document | Medium — evaluative judgment | **No** (review alone is not evidence of competence) |
| **Revise** | The artifact is revised in response to review feedback. Revisions are applied and tracked. | Revised artifact | Medium — improved but not yet validated | **No** |
| **Audit** | An auditor agent evaluates the revised artifact against the rubric and issues a verdict: PASS, REVISE, or REJECT. | Audit record | High — formal evaluation | **Only if PASS** |
| **Commit** | The artifact and its audit are committed to git. The commit hash anchors the evidence to a specific state. | Commit record | High — version-anchored | **Yes, with audit** |
| **Close** | The loop is closed. The artifact is marked as complete. No further revisions unless a real defect is found. | Closure record | Highest — finalized | **Yes** |

### What RAG must know about each stage

- **DRAFT**: Retrievable for context. Not citable as evidence. Not usable for career claims. RAG must tag retrieved drafts with `[DRAFT — not evidence]`.
- **REVIEW**: Retrievable for understanding artifact quality. Not sufficient alone for claims. RAG must surface the review verdict and required revisions.
- **REVISION**: Retrievable for tracking improvement. Authority depends on whether a subsequent audit exists.
- **AUDIT**: Retrievable and citable. PASS audits are Tier 1 evidence. REVISE audits indicate incomplete work. REJECT audits are negative evidence.
- **COMMIT**: The commit hash is the version anchor. RAG should track commit status where available but must not require git-level verification for every retrieval.
- **CLOSURE**: The highest authority state. A closed loop is a completed evidence chain. RAG must protect it.

---

## 1.2 — Source-of-Truth Logic

AOS has a source-of-truth problem that most AI-adjacent systems ignore: **not all files that exist in a repo are equally true, equally current, or equally authoritative.**

### The problem RAG must solve

Consider these files, all of which exist in the AOS repo:

| File | What it appears to be | What it actually is |
|---|---|---|
| `status.md` | Current system status | Potentially stale — may lag behind actual state |
| `artifacts/ai-writing-dag/artifact.md` | A completed artifact | Tier 1 evidence — closed loop with PASS audit |
| `handoffs/some-handoff.md` | Context transfer | Tier 4 — useful for context, not for claims |
| `learner-state/progress.json` | Learning progress | **Private — must never be indexed** |
| `prompts/agents/auditor.md` | Agent instructions | Tier 5 — design intent, not evidence |
| A brainstorm note | Ideas for future work | Not evidence. Not indexable for claims. |

A naive RAG system treats all of these as equal documents. AOS RAG must not.

### Source-of-truth rules

1. **Authority comes from the lifecycle position, not the file's location.** An artifact in `artifacts/` could be a draft or a closed loop. The file path alone does not determine authority. The lifecycle metadata does.

2. **Recency does not equal authority.** A status file updated yesterday may be less authoritative than an audit from last week, because the audit was formally evaluated against a rubric and the status file was a manual update.

3. **Git state is the ultimate anchor.** If a file is committed, it has a verifiable state. If it is uncommitted, its state is provisional. RAG should prefer committed sources but must not refuse to retrieve uncommitted sources when they are the only available evidence.

4. **Stale sources must be flagged, not silently used.** If `status.md` says an artifact is "in progress" but the audit says PASS, RAG must surface the conflict and defer to the audit.

5. **Absence of evidence is evidence.** If no audit exists for an artifact, RAG must say so. If no review exists, RAG must say so. Silence — skipping the "what is not known" section — is a system failure.

### Source-of-truth hierarchy for retrieval

When sources conflict, RAG resolves by this precedence:

```
  PASS Audit  >  Review  >  Status File  >  Handoff  >  Prompt/Brainstorm
       │             │            │              │              │
   Formal eval   Evaluative   Manual update  Context only  Design intent
   against        judgment     (stale risk)                (not evidence)
   rubric
```

> [!IMPORTANT]
> **The critical insight**: Source-of-truth in AOS is not a property of files. It is a property of lifecycle stages. RAG must resolve truth by consulting lifecycle metadata, not by assuming the most recent file is the most true.

---

## 1.3 — Artifact Authority Model

Not all artifacts are equal. An artifact's authority depends on where it is in the lifecycle. RAG must classify every artifact source by its **evidence class**.

### The six evidence classes

```
  ┌─────────────────────────────────────────────────────────────┐
  │                    EVIDENCE CLASSES                         │
  │                                                             │
  │  CLASS 6: CLOSED      ← Highest authority                  │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Artifact + PASS Audit + Commit + Closure Record      │   │
  │  │ Can support: career claims, portfolio cases,         │   │
  │  │              resume entries, competency evidence     │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  CLASS 5: AUDITED-PASS                                      │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Artifact + PASS Audit (may not be committed/closed)  │   │
  │  │ Can support: career claims (with caveat),            │   │
  │  │              portfolio evidence                      │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  CLASS 4: REVIEWED                                          │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Artifact + Review (no PASS audit yet)                │   │
  │  │ Can support: learning context, progress evidence     │   │
  │  │ Cannot support: career claims                        │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  CLASS 3: REVISED                                           │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Artifact revised after review (audit pending)        │   │
  │  │ Can support: work-in-progress context                │   │
  │  │ Cannot support: career claims, portfolio evidence    │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  CLASS 2: DRAFT                                             │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Artifact exists but has no review or audit           │   │
  │  │ Can support: context only                            │   │
  │  │ Cannot support: any claims                           │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  CLASS 1: SPECULATIVE                                       │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │ Brainstorms, plans, roadmaps, design ideas           │   │
  │  │ Can support: future planning context only            │   │
  │  │ Cannot support: any claims whatsoever                │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

### How RAG uses evidence classes

| Query type | Minimum evidence class required | What happens if below minimum |
|---|---|---|
| "What can I claim on my resume about X?" | CLASS 5 (AUDITED-PASS) | RAG refuses the claim and states what evidence is missing |
| "What is the status of artifact Y?" | CLASS 2 (DRAFT) — any class answers | RAG reports current class and what would advance it |
| "Is this loop closed?" | CLASS 6 (CLOSED) required to confirm | RAG checks for closure record; if missing, reports open |
| "What have I learned about topic Z?" | CLASS 3 (REVISED) for substantive answers | RAG can retrieve drafts for context but must label them |
| "What portfolio evidence supports claim W?" | CLASS 5 (AUDITED-PASS) | RAG refuses if only drafts/brainstorms support it |

### Evidence class determination

RAG determines evidence class by checking (in order):

1. **Closure record exists?** → CLASS 6
2. **PASS audit exists?** → CLASS 5
3. **Review exists?** → CLASS 4 (if post-revision) or CLASS 4 (if pre-revision)
4. **Revision applied after review?** → CLASS 3
5. **Artifact exists but no review/audit?** → CLASS 2
6. **Only brainstorms/plans/notes?** → CLASS 1

This determination is metadata-driven. It does not require reading the full artifact content. The source registry (Chunk 4) will encode this.

---

## 1.4 — Closure Rules

Closure is the most important governance concept in AOS. It is what separates AOS from a note archive.

### What closure means

A closed loop is a completed evidence chain:

```
Artifact created → Reviewed → Revised → Audited (PASS) → Committed → Closed
```

Once closed, the loop represents **finished, reviewable, auditable evidence of learning or competence.** It is the honest unit of value in AOS.

### Proven closed loops (as of current repo state)

Based on the verified AOS repository:

| Loop | Status | Evidence |
|---|---|---|
| AI Writing Assistance DAG / Statistical Analysis Plan | **CLOSED** | Artifact + PASS audit + committed |
| Quant/Options Lesson 1 | **CLOSED** | Artifact + PASS audit + committed |
| AOS Proven Loop Pattern #1 | **CLOSED** | Meta-artifact documenting the pattern |
| Public-release cleanup work | **CLOSED** | Cleanup committed |
| Frontend truthfulness/status cleanup | **CLOSED** | Cleanup committed |

### Closure rules RAG must enforce

| Rule | RAG behavior |
|---|---|
| **No closed loop reopened without a real defect** | If a query implies modifying a closed artifact, RAG must surface closure status and require a defect justification before proceeding |
| **Closure status must be in every retrieval about a closed artifact** | When RAG retrieves a closed artifact, the response must include `[CLOSED — do not reopen without defect]` |
| **Closure is not reversible by retrieval** | RAG finding "new relevant information" is not a defect. A defect is an error in the artifact itself — factual, structural, or rubric-related |
| **Draft-to-closed is one direction** | RAG must never present a closed artifact as if it needs further work, unless a defect is documented |
| **Closure records are Tier 1 evidence** | They outrank all other sources about the artifact's status |

### What constitutes a real defect

A defect justifying reopening must be:

- A **factual error** in the artifact content
- A **structural failure** against the rubric criteria
- A **missing section** required by the template or rubric
- A **governance violation** discovered after closure
- An **external change** that invalidates a core claim (e.g., a library API changed)

The following are **not defects**:

- "I found a related article" — not a defect
- "I want to add more" — not a defect
- "The formatting could be better" — not a defect (unless rubric requires specific formatting)
- "RAG surfaced a similar topic" — not a defect
- "I had a new idea" — not a defect

### How RAG protects closure

```
  Query about closed artifact
         │
         ▼
  ┌─────────────────────┐
  │  Check closure       │
  │  status in registry  │
  └─────────┬───────────┘
            │
     ┌──────┴──────┐
     │  CLOSED?     │
     └──────┬──────┘
        YES │         NO
            ▼          ▼
  ┌─────────────┐  ┌─────────────┐
  │ Surface      │  │ Normal      │
  │ closure      │  │ retrieval   │
  │ status       │  │ flow        │
  │              │  └─────────────┘
  │ Flag if      │
  │ query        │
  │ implies      │
  │ modification │
  │              │
  │ Require      │
  │ defect       │
  │ justification│
  └─────────────┘
```

---

## 1.5 — Review / Revision / Audit Logic

AOS governance defines specific rules for how reviews, revisions, and audits operate. RAG must understand these rules to correctly report artifact status and evidence class.

### Review mechanics

Based on [GOVERNANCE.md](file:///c:/Users/chefi/Projects/analytical-operating-system/governance/GOVERNANCE.md) and the reviewer agent prompt:

- Reviews are generated by the **Reviewer agent** against a specific **rubric**
- Each review evaluates the artifact against rubric criteria and produces:
  - Strengths identified
  - Weaknesses identified
  - Required revisions (specific, actionable)
  - Overall assessment
- Reviews are stored in the artifact's directory or in a reviews subdirectory
- A review does not change the artifact — it produces a separate review document

**RAG implications**: Reviews are Tier 2 evidence. They tell you what an evaluator thought of the artifact. They do not tell you the artifact is complete. RAG must surface review verdicts when asked about artifact quality.

### Revision mechanics

- Revisions are applied to the artifact in response to review feedback
- Each required revision should be addressed
- The revised artifact replaces or updates the original (tracked by git)
- Revisions without a subsequent audit are CLASS 3 — improved but not validated

**RAG implications**: A revised artifact is better than a draft but still not career-claim evidence. RAG must track whether revisions have been audited.

### Audit mechanics

Based on [GOVERNANCE.md](file:///c:/Users/chefi/Projects/analytical-operating-system/governance/GOVERNANCE.md) and the auditor agent prompt:

- Audits are generated by the **Auditor agent** against the rubric
- Each audit evaluates the (revised) artifact and issues one of three verdicts:

| Verdict | Meaning | RAG treatment |
|---|---|---|
| **PASS** | Artifact meets rubric criteria | CLASS 5 — career-claim eligible |
| **REVISE** | Artifact needs further work | CLASS 3 — revision needed, not evidence |
| **REJECT** | Artifact fails rubric criteria | Negative evidence — cannot support claims |

- PASS audits are stored as audit records and are Tier 1 evidence
- REVISE audits require another revision cycle
- REJECT audits are negative evidence — they prove the artifact was evaluated and failed

**RAG implications**:
- PASS audits are the gateway to career claims. RAG must retrieve them when claim questions are asked.
- REVISE audits mean more work is needed. RAG must surface them to prevent premature claims.
- REJECT audits are critical negative evidence. If someone asks "can I claim X?" and the audit says REJECT, RAG must say no and explain why.

### The audit → closure bridge

```
  Audit verdict
       │
   ┌───┴───┐
   │       │        │
  PASS   REVISE   REJECT
   │       │        │
   ▼       ▼        ▼
  Commit  Revise   Archive
  Close   Re-audit  or
  Loop    Loop      Redesign
```

Only PASS audits lead to closure. REVISE loops back. REJECT requires a fundamental rethink.

---

## 1.6 — Career-Claim Grounding

AOS exists partly to produce honest, evidence-backed career claims. This is not a side feature. It is a core system goal. RAG must serve it directly.

### The overclaiming problem

Most professionals overclaim. They list skills they've barely used, projects they partially completed, and competencies they cannot demonstrate. AOS solves this by requiring evidence.

### Claim grounding rules

| Rule | Enforcement |
|---|---|
| No resume claim without artifact evidence | RAG must retrieve supporting artifacts. If none exist, RAG refuses the claim. |
| No portfolio claim without audit evidence | RAG must find a PASS audit. Drafts and reviews are insufficient. |
| No competency claim without closed loop | RAG must verify the loop is closed. Open loops are works-in-progress, not competencies. |
| Overclaiming risk must be assessed | RAG must output risk level: low / medium / high. |
| Safer wording must be suggested | When risk is medium or high, RAG must propose safer language. |
| Missing evidence must be stated | RAG must say what artifact or audit would reduce claim risk. |

### Career-claim answer contract (preview)

When answering career-claim questions, RAG must produce:

```
Proposed claim: [claim text]
Supporting artifacts: [list with source IDs and evidence class]
Audit evidence: [PASS audit source IDs, or "no audit found"]
Missing evidence: [what would strengthen the claim]
Overclaiming risk: LOW / MEDIUM / HIGH
  Rationale: [why this risk level]
Safer wording: [alternative claim text if risk > LOW]
Recommended action: [what to produce to reduce risk]
```

### Examples

**Good claim (LOW risk)**:
> "Designed and implemented a statistical analysis plan for AI writing assistance, including a directed acyclic graph (DAG) for causal structure."
>
> Supporting evidence: `artifacts/ai-writing-dag/` — CLOSED loop, PASS audit, committed.
> Overclaiming risk: LOW — fully audited, closed loop.

**Dangerous claim (HIGH risk)**:
> "Expert in causal inference with production experience in DAG-based analysis."
>
> Supporting evidence: One closed artifact (AI Writing DAG). No production deployment evidence. No multiple artifacts demonstrating breadth.
> Overclaiming risk: HIGH — "expert" and "production experience" are not supported by one artifact.
> Safer wording: "Completed a formally audited statistical analysis plan using DAG-based causal structure for AI writing assistance."

**Unsupported claim (REFUSE)**:
> "Built a quantitative trading system."
>
> Supporting evidence: None in AOS. trade-sim exists as a separate repo but is not yet indexed.
> RAG response: REFUSE — no artifact evidence supports this claim. trade-sim integration is deferred (Phase 11).

---

## 1.7 — How RAG Fits into the Operating Loop

RAG is not a separate system bolted onto AOS. It integrates into the existing operating loop at specific points. Here is where RAG adds value and where it must stay out of the way.

### The operating loop with RAG integration points

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                       AOS OPERATING LOOP                                │
  │                                                                         │
  │  1. ASSIGN ──► 2. PRODUCE ──► 3. REVIEW ──► 4. REVISE ──► 5. AUDIT    │
  │     │              │              │              │              │        │
  │     │          [RAG: template   [RAG: rubric   [RAG: review  [RAG:     │
  │     │           retrieval,      retrieval,      retrieval,    audit     │
  │  [RAG:          module          prior artifact  prior audit   history,  │
  │   module        context,        context]        context]      rubric    │
  │   lookup,       prior work                                    retrieval,│
  │   prerequisite  retrieval]                                    claim     │
  │   check]                                                      check]   │
  │                                                                         │
  │  ──► 6. COMMIT ──► 7. CLOSE ──► 8. CLAIM                              │
  │          │              │             │                                  │
  │      [RAG: commit   [RAG: closure [RAG: career-                        │
  │       verification]  protection]   claim grounding,                    │
  │                                    overclaiming                         │
  │                                    check]                               │
  └─────────────────────────────────────────────────────────────────────────┘
```

### RAG integration by stage

| Stage | RAG function | What RAG retrieves | What RAG does NOT do |
|---|---|---|---|
| **1. Assign** | Module lookup, prerequisite check | Module definitions, prerequisite artifacts, completion status | Does not assign work — that is the roadmap agent's job |
| **2. Produce** | Template and context retrieval | Templates, prior artifacts in same module, rubric criteria | Does not generate the artifact — that is the artifact generator's job |
| **3. Review** | Rubric and context retrieval | Rubric for the artifact type, prior review patterns, module expectations | Does not review — that is the reviewer agent's job |
| **4. Revise** | Review retrieval | The specific review document, required revisions, prior revision patterns | Does not revise — that is the learner's or artifact generator's job |
| **5. Audit** | Audit context retrieval | Rubric, prior audits, artifact history, evidence chain | Does not audit — that is the auditor agent's job |
| **6. Commit** | Commit verification | Commit status, uncommitted changes, working tree state | Does not commit — that is git's job |
| **7. Close** | Closure protection | Closure records, defect justification requirements | Does not close — closure is a governance decision |
| **8. Claim** | Career-claim grounding | Artifacts, audits, evidence chains, overclaiming assessments | Does not write resume text — that is the resume translator's job |

### The boundary principle

> **RAG retrieves. Agents act. Governance decides.**
>
> RAG provides evidence to agents. Agents use that evidence to do their jobs. Governance rules determine what is allowed. RAG must never collapse these roles.

---

## 1.8 — How RAG Protects Closure

Closure protection is not a feature of RAG. It is a **constraint** on RAG. Every retrieval, every answer, every citation must respect closure status.

### Closure protection mechanisms

| Mechanism | Implementation | Phase |
|---|---|---|
| **Closure metadata in source registry** | Every source has a `closure_status` field: `open`, `closed`, `reopened_with_defect` | Phase 2–3 |
| **Closure flag in retrieval results** | Every retrieved source includes its closure status in the retrieval trace | Phase 5 |
| **Closure guard in answer contracts** | Answer contracts require checking closure before suggesting modifications | Phase 8 |
| **Closure guard tool** | A dedicated tool that checks closure status and blocks reopening without defect justification | Phase 8 |
| **Audit on reopening** | If a closed loop is reopened, the reopening itself must be audited | Phase 8+ |

### What closure protection prevents

| Failure mode | How RAG prevents it |
|---|---|
| Agent suggests revising a closed artifact | RAG surfaces closure status; closure guard blocks without defect |
| User asks to "improve" a closed loop | RAG explains the loop is closed and what constitutes a defect |
| Retrieval surfaces closed artifact for active work | Retrieval result includes `[CLOSED]` tag; agent prompt instructs respect |
| New information seems related to closed artifact | RAG surfaces the new information but does not suggest reopening |
| Stale status file says artifact is "in progress" but audit says PASS | RAG defers to audit (higher authority) and flags status file staleness |

---

## 1.9 — How RAG Prevents Unsupported Claims

Unsupported claims are AOS's primary integrity risk. RAG must actively prevent them, not passively allow them.

### Claim prevention hierarchy

```
  Query implies a claim
         │
         ▼
  ┌──────────────────┐
  │ What evidence     │
  │ exists?           │
  └────────┬─────────┘
           │
     ┌─────┴─────┐
     │           │
  Evidence    No evidence
  found       found
     │           │
     ▼           ▼
  ┌──────────┐  ┌──────────────────┐
  │ Check    │  │ REFUSE claim.    │
  │ evidence │  │ State what is    │
  │ class    │  │ missing.         │
  └────┬─────┘  │ Recommend next   │
       │        │ artifact.        │
  ┌────┴────┐   └──────────────────┘
  │         │
  CLASS    CLASS
  ≥ 5      < 5
  │         │
  ▼         ▼
  SUPPORT  ┌──────────────────┐
  CLAIM    │ REFUSE claim.    │
  (with    │ Evidence is      │
  caveats  │ insufficient.    │
  and risk │ State class and  │
  level)   │ what is missing. │
           └──────────────────┘
```

### Claim types and their evidence requirements

| Claim type | Minimum evidence | Example |
|---|---|---|
| Resume skill claim | CLASS 5 artifact + PASS audit | "Proficient in causal inference" requires audited causal inference artifact |
| Portfolio case | CLASS 6 closed loop | "Designed and delivered X" requires closed loop with full evidence chain |
| Competency claim | Multiple CLASS 5+ artifacts in domain | "Strong background in statistics" requires multiple audited statistical artifacts |
| Experience claim | CLASS 5+ artifact showing application | "Applied X in Y context" requires artifact demonstrating applied use |
| Expertise claim | Multiple CLASS 6 closed loops + depth evidence | "Expert in X" requires breadth and depth — hardest to support |

---

## 1.10 — How RAG Distinguishes Source Types

RAG must structurally distinguish between source types. This is not cosmetic labeling — it determines what each source can be used for.

### Source type taxonomy

| Source type | Location pattern | Evidence class | Retrievable? | Citable for claims? | Notes |
|---|---|---|---|---|---|
| **Audited artifact** | `artifacts/*/` with PASS audit | CLASS 5–6 | Yes | Yes | Core evidence unit |
| **PASS audit** | `audits/*/` with PASS verdict | CLASS 5–6 | Yes | Yes | Authority record |
| **REVISE audit** | `audits/*/` with REVISE verdict | CLASS 3 | Yes | No — negative evidence | Proves work is incomplete |
| **REJECT audit** | `audits/*/` with REJECT verdict | CLASS 1 | Yes | No — strong negative evidence | Proves work was evaluated and failed |
| **Review** | `artifacts/*/review*` or similar | CLASS 4 | Yes | No | Evaluative, not conclusive |
| **Draft artifact** | `artifacts/*/` without audit | CLASS 2 | Yes (labeled) | No | Work in progress |
| **Module definition** | `modules/*/` | N/A (structural) | Yes | No | Defines learning structure |
| **Rubric** | `rubrics/*/` | N/A (structural) | Yes | No | Defines evaluation criteria |
| **Template** | `templates/*/` | N/A (structural) | Yes | No | Defines artifact structure |
| **Governance doc** | `governance/*/` | Tier 2 (system rules) | Yes | As system rules | Defines how AOS works |
| **Status file** | `status.md`, handoffs | CLASS 2 (stale risk) | Yes (flagged) | No | Must flag staleness risk |
| **Handoff** | `handoffs/*/` | CLASS 2 (context) | Yes | No | Context transfer only |
| **Prompt** | `prompts/*/` | CLASS 1 (design) | Yes | No | Design intent only |
| **Brainstorm** | Various | CLASS 1 | Yes (labeled) | No | Not evidence |
| **Private/excluded** | `learner-state/`, `chat-logs/`, etc. | N/A | **No** | **No** | Never indexed |

### The critical distinction: retrievable vs. citable

A source being **retrievable** means RAG can find it and include it in context. A source being **citable** means RAG can use it to support a claim. These are different.

- All non-excluded sources are retrievable (with appropriate labels).
- Only CLASS 5+ sources are citable for career/portfolio claims.
- CLASS 2–4 sources are citable for status and context answers, but not for claims.
- CLASS 1 sources are retrievable for context only, never citable.

### How agents should see retrieval results

When RAG provides retrieval results to an agent, each result must include:

```
Source: [source ID]
Path: [file path]
Type: [source type from taxonomy]
Evidence Class: [CLASS 1-6]
Closure Status: [open / closed / reopened_with_defect]
Claim Support: [yes / no / insufficient]
Staleness Risk: [low / medium / high]
Authority Tier: [1-5]
---
[Retrieved content]
```

This metadata wrapper is not optional. It is the mechanism by which RAG enforces evidence governance through retrieval.

---

## 1.11 — AOS Governance Rules That Constrain RAG

The AOS governance system (as defined in [GOVERNANCE.md](file:///c:/Users/chefi/Projects/analytical-operating-system/governance/GOVERNANCE.md) and [AGENT_LANES.md](file:///c:/Users/chefi/Projects/analytical-operating-system/governance/AGENT_LANES.md)) establishes rules that RAG must obey.

### Agent lane discipline

Each AOS agent has a defined lane. RAG must not enable agents to operate outside their lanes:

| Agent | Lane | RAG provides | RAG does NOT provide |
|---|---|---|---|
| Artifact Generator | Produces artifacts from templates and prompts | Templates, rubric criteria, module context, prior work | Audit verdicts, closure decisions, resume text |
| Reviewer | Evaluates artifacts against rubrics | Rubric, artifact to review, prior review patterns | Audit verdicts, revisions, closure decisions |
| Auditor | Audits revised artifacts, issues verdicts | Rubric, artifact, review, revision history | Revisions, generation, closure decisions |
| Resume Translator | Translates evidence into resume language | PASS audits, closed loops, evidence chains, overclaiming assessments | Artifact generation, review, audit |
| Roadmap Agent | Plans learning sequences | Module graph, completion status, prerequisites | Artifact content, audit verdicts |
| Debugger | Investigates technical failures | Error context, code artifacts, technical documentation | Audit verdicts, career claims |
| MERIDIAN | Master Evidence-Reasoning Integrator | Cross-domain evidence synthesis, conflict resolution | Specialized domain work |
| AOS Architect | Designs AOS system improvements | Governance docs, system architecture, design patterns | Artifact content work |
| Context Compressor | Summarizes context for handoffs | Full context, handoff history | Decision-making |
| Frontend Agent | Manages public-facing documentation | Public-safe artifacts, status, documentation | Private learner-state, raw audits |
| Security/Public Release | Enforces privacy and public safety | Privacy policy, public/private boundaries, sanitization rules | Content generation |

### Status rules

From [AOS_STATUS_RULES.md](file:///c:/Users/chefi/Projects/analytical-operating-system/governance/AOS_STATUS_RULES.md):

- Status must reflect actual state, not aspirational state
- Status files may lag — RAG must prefer authoritative sources (audits, commits) over status files
- Status transitions must be evidence-backed

### RAG must not violate governance

RAG is a retrieval and evidence layer. It does not make governance decisions. It does not override agent lanes. It does not change artifact status. It retrieves, labels, and presents evidence so that agents and governance rules can do their jobs.

---

## Chunk Completed

**Chunk 1 — AOS Conceptual Architecture** is complete.

---

## What This Chunk Covered

1. **AOS Lifecycle**: The 6-stage canonical lifecycle (Produce → Review → Revise → Audit → Commit → Close) with evidence classes at each stage
2. **Source-of-Truth Logic**: Why not all files are equally true, the staleness problem, and the source-of-truth hierarchy
3. **Artifact Authority Model**: Six evidence classes (SPECULATIVE → DRAFT → REVISED → REVIEWED → AUDITED-PASS → CLOSED) with claim support rules for each
4. **Closure Rules**: What closure means, proven closed loops, what constitutes a defect, and how RAG protects closure
5. **Review/Revision/Audit Logic**: Mechanics of each stage, the three audit verdicts (PASS/REVISE/REJECT), and the audit-to-closure bridge
6. **Career-Claim Grounding**: Overclaiming problem, claim grounding rules, career-claim answer contract preview, examples of good/dangerous/unsupported claims
7. **How RAG Fits the Operating Loop**: Integration points at each lifecycle stage, what RAG retrieves vs. what agents do
8. **How RAG Protects Closure**: 5 closure protection mechanisms, failure modes prevented
9. **How RAG Prevents Unsupported Claims**: Claim prevention hierarchy, claim types and evidence requirements
10. **Source Type Taxonomy**: 15 source types with evidence classes, retrievability, and citability rules
11. **Governance Constraints**: Agent lane discipline, status rules, and the boundary principle

---

## Running Decision Log

*Decisions from Chunk 0 (D1–D15) are preserved. New decisions from Chunk 1:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1 | RAG is evidence authority layer, not knowledge base | Governance-first design | **Accepted** |
| D2 | Source registry is first deliverable | Cannot retrieve against uncatalogued authority | **Accepted** |
| D3 | Metadata → keyword → embedding retrieval order | Each layer validates the next | **Accepted** |
| D4 | Phase 0 cleanup is a hard gate | No RAG on dirty tree | **Accepted** |
| D5 | No external connectors in v0.1 | Local governance first | **Accepted** |
| D6 | No chat UI before answer contracts | Contracts govern the chatbot, not vice versa | **Accepted** |
| D7 | Closed loops protected by default | AOS invariant enforced by RAG | **Accepted** |
| D8 | Privacy exclusions are structural | Code-enforced, not just documented | **Accepted** |
| D9 | Embeddings are Phase 9 | Prove simpler retrieval first | **Accepted** |
| D10 | trade-sim deferred to Phase 11 | Local AOS RAG must work first | **Accepted** |
| D11 | Drafts cannot support career claims | AOS invariant | **Accepted** |
| D12 | Negative evidence is reported | Silence is a failure mode | **Accepted** |
| D13 | Agent roles preserved, not expanded | No new agents for RAG in v0.1 | **Accepted** |
| D14 | Tools are Python/PowerShell, Windows-compatible | AOS runs on Windows | **Tentative** |
| D15 | Generated files are `.gitignore`-tracked | Derived artifacts are regenerable | **Tentative** |
| D16 | Six evidence classes define artifact authority | Evidence class is the atomic unit of authority determination. Finer-grained than source tiers (which classify file types); evidence classes classify lifecycle position. | **Accepted** |
| D17 | Evidence class is metadata-driven, not content-derived | Class is determined by presence/absence of reviews, audits, commits, closure records — not by reading artifact text | **Accepted** |
| D18 | Retrieval results include mandatory metadata wrapper | Every retrieval result carries source type, evidence class, closure status, claim support, staleness risk, authority tier | **Accepted** |
| D19 | REJECT audits are negative evidence | A REJECT audit proves evaluation happened and the artifact failed. This is more informative than absence of audit. | **Accepted** |
| D20 | RAG retrieves, agents act, governance decides | RAG does not make governance decisions, override lanes, or change status. It provides evidence. | **Accepted** |
| D21 | Governance documents are Tier 2, not Tier 1 | Governance docs define system rules and are high authority for system behavior, but they are not artifacts in the lifecycle sense. Tier 2 is appropriate. Resolves UQ7 from Chunk 0. | **Accepted** |
| D22 | Claim types have minimum evidence class requirements | Resume claims require CLASS 5+. Portfolio cases require CLASS 6. Competency claims require multiple CLASS 5+. | **Accepted** |
| D23 | Staleness risk is a required field in retrieval metadata | Status files, handoffs, and other time-sensitive sources must be flagged for staleness. Audit records and closed loops have low staleness risk. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ2 | Should `source_registry.seed.json` be committed to git or generated? | Affects git hygiene and versioning strategy | Chunk 4 |
| UQ3 | Python vs PowerShell for primary tooling — user preference? | Affects all tool deliverables | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects where this document lives | Chunk 10 |
| UQ5 | Are there additional closed loops beyond the 5 listed? | Affects source registry completeness | Chunk 3–4 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| ~~UQ7~~ | ~~Should governance files be Tier 1 or Tier 2?~~ | ~~Resolved: Tier 2~~ | ~~D21~~ |
| UQ8 | How should RAG handle artifacts that exist across multiple files (e.g., a DAG artifact with supporting code, data, and documentation)? | Affects chunking strategy and source relationships | Chunk 6 |
| UQ9 | Should evidence class be computed dynamically at retrieval time or stored in the source registry? | Affects registry design and retrieval performance | Chunk 4 |
| UQ10 | How should RAG handle in-flight artifacts (currently being reviewed or audited)? Concurrent lifecycle stages may exist. | Affects evidence class determination | Chunk 4 |

---

## Next Chunk to Request

**Chunk 2 — RAG Requirements and Failure Modes**

This chunk will catalog the specific failure modes that AOS RAG must prevent, including hallucination types, repo-state fabrication, closure violations, unsupported claims, privacy leakage, stale context, and more — with mitigations and failure-mode-to-control mappings.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 2 — RAG Requirements and Failure Modes.

Continue the same blueprint started in Chunk 0 and continued through Chunk 1.

Preserve and update the running decision log from Chunks 0–1 (D1–D23).

Do not repeat Chunk 0 or Chunk 1 content except for brief continuity references.

Chunk 2 must include:
- hallucination failure modes
- repo-state hallucination
- reopening closed loops
- unsupported resume claims
- private data leakage
- stale context
- draft treated as evidence
- retrieval without authority
- citations without real support
- semantic similarity mistaken for proof
- embeddings overpowering metadata
- mitigations for each failure mode
- failure-mode-to-control mapping

Stop after completing Chunk 2 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 3
```
