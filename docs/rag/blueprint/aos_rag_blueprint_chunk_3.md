# AOS RAG Blueprint — Chunk 3: Evidence Hierarchy and Source Authority Model

---

> **Continuity from Chunks 0–2**: Chunk 0 established the thesis and architecture. Chunk 1 detailed the AOS lifecycle and six evidence classes. Chunk 2 cataloged 12 failure modes and 40 controls. Chunk 3 now formalizes the evidence hierarchy and source authority model that the source registry (Chunk 4), retrieval engine (Chunk 7), and answer contracts (Chunk 8) will implement.

---

## 3.0 — Why This Chunk Exists

The evidence hierarchy is the load-bearing structure of AOS RAG. Every retrieval decision, every ranking, every citation, every refusal depends on it. If the hierarchy is wrong, retrieval is wrong. If authority is misassigned, claims are misjudged. If staleness is untracked, answers decay.

This chunk defines:
1. What sources exist and what tier they belong to
2. What each source can and cannot support
3. How authority and relevance differ
4. How sources age and conflict
5. How authority is weighted in retrieval
6. What constitutes acceptable and unacceptable claim support

This is not a taxonomy exercise. It is the specification that the source registry schema (Chunk 4), indexing policy (Chunk 5), retrieval engine (Chunk 7), and answer contracts (Chunk 8) will implement directly.

---

## 3.1 — Source Authority Tiers (Detailed)

AOS RAG uses a 6-tier source authority hierarchy. Higher tiers outrank lower tiers in all conflict resolution and claim support decisions.

### Tier 1 — Highest Authority: Audited Evidence

**What belongs here**: Final audited artifacts with PASS verdicts, PASS audit records, committed portfolio-ready artifacts, closed loop records.

**Why Tier 1**: These sources have passed formal evaluation against rubrics. They represent completed evidence chains. They are the only sources that can support career and portfolio claims.

**AOS sources at Tier 1**:

| Source | Path Pattern | Evidence Class | Claim Support |
|---|---|---|---|
| PASS semantic audit | `audits/semantic/*` with PASS verdict | CLASS 5–6 | Career, portfolio, competency |
| PASS structural audit | `audits/reports/*` with PASS verdict | CLASS 5–6 | Structural quality |
| Portfolio-ready artifact | `artifacts/portfolio/*` post-PASS-audit | CLASS 5–6 | Portfolio case, resume |
| Closed loop record | Documented in proven loop patterns | CLASS 6 | All claim types |
| Committed audited artifact | `artifacts/projects/*` or `artifacts/lessons/*` post-PASS-audit, committed | CLASS 5–6 | Career, portfolio |

**Specific Tier 1 sources in current AOS repo**:
- `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md` — PASS
- `audits/semantic/ai_writing_assistant_memo_case_study.semantic_audit.md` — PASS_WITH_MINOR_FIXES (treated as PASS after repair)
- `audits/reports/` — 3 structural audits, all PASS
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study_v2.md` — portfolio-ready
- `artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md` — audited

**Authority characteristics**:
- Staleness risk: **LOW** — audits are point-in-time evaluations; they don't become stale unless the artifact is modified after audit
- Conflict resolution: Tier 1 wins all conflicts against lower tiers
- Negative evidence: If no Tier 1 source exists for a domain, that is significant negative evidence

---

### Tier 2 — High Authority: Evaluative and Structural

**What belongs here**: Reviews, revision audits (REVISE verdicts), final repair plans, official rubrics, module definitions, governance documents, proven loop documentation.

**Why Tier 2**: These sources define evaluation criteria, system structure, and governance rules. They are authoritative for how AOS works but are not themselves evidence of learner competence. Rubrics define what "good" looks like; they don't prove something is good. Reviews evaluate but don't conclude.

**AOS sources at Tier 2**:

| Source | Path Pattern | Evidence Class | Claim Support |
|---|---|---|---|
| Rubrics | `rubrics/*.md` | N/A (structural) | Defines evaluation criteria |
| Module definitions | `modules/*.md` | N/A (structural) | Defines learning scope |
| Module index | `modules/_module_index.md` | N/A (structural) | Defines routing and structure |
| Rubric index | `rubrics/_rubric_index.md` | N/A (structural) | Maps modules to rubrics |
| Governance rules | `governance/*.md` | N/A (governance) | Defines system behavior |
| Proven loop pattern | `docs/aos_proven_loop_pattern_01.md` | N/A (governance) | Defines closure discipline |
| Reviews | `artifacts/reviews/*` | CLASS 4 | Progress evidence only |
| REVISE audits | `audits/semantic/*` with REVISE | CLASS 3 | Negative — work incomplete |
| Dependency graph | `curriculum/pathways/dependency_graph.md` | N/A (structural) | Defines prerequisites |
| Synthesis protocol | `curriculum/cross_module_synthesis_protocol.md` | N/A (structural) | Defines synthesis requirements |
| Architecture agent prompt | `prompts/agents/aos_architecture_strategy_agent.prompt.md` | N/A (governance) | Defines agent ecology and rules |

**Specific Tier 2 sources in current AOS repo**:
- 6 rubrics: `assumption_awareness.md`, `causal_reasoning_quality.md`, `institutional_analysis_depth.md`, `responsible_system_design.md`, `synthesis_portfolio_quality.md`, `technical_artifact_quality.md`
- 25 module cards (`modules/01_*.md` through `modules/25_*.md`)
- `governance/CONTRIBUTING.md`, `governance/CHANGELOG.md`
- `docs/aos_proven_loop_pattern_01.md`
- `curriculum/pathways/dependency_graph.md`
- `curriculum/cross_module_synthesis_protocol.md`

**Authority characteristics**:
- Staleness risk: **LOW to MEDIUM** — rubrics and module definitions are relatively stable; reviews may become outdated if the artifact is subsequently revised
- Conflict resolution: Tier 2 wins against Tiers 3–5; defers to Tier 1
- Negative evidence: If no review exists, that means the artifact has not been evaluated

---

### Tier 3 — Medium Authority: Committed Content

**What belongs here**: Committed lessons (even if unaudited), templates, documentation, README, public website/docs when aligned with current status, artifact review templates, curriculum content.

**Why Tier 3**: These sources are committed to the repository and represent intentional, version-controlled content. They are not evaluative (Tier 2) or audited (Tier 1), but they are real work product. They provide context and structure but cannot support career claims.

**AOS sources at Tier 3**:

| Source | Path Pattern | Evidence Class | Claim Support |
|---|---|---|---|
| README | `README.md` | N/A (documentation) | System description only |
| Quick reference | `AOS-QUICK-REF.md` | N/A (documentation) | System usage only |
| Lesson artifacts (unaudited) | `artifacts/lessons/*` without PASS audit | CLASS 2 | Context only |
| Templates | `templates/**/*.md` | N/A (structural) | Defines artifact structure |
| Documentation | `docs/*.md` (non-governance) | N/A (documentation) | System description |
| Public docs/landing page | `docs/index.html`, `apps/aos-landing/` | N/A (public) | Public-facing (truthfulness-sensitive) |
| Curriculum JSON | `apps/aos-landing/src/data/curriculum.json` | N/A (derived) | Public-facing representation |
| AOS runner | `ops/aos.ps1` | N/A (operational) | Tool documentation |

**Specific Tier 3 sources in current AOS repo**:
- `README.md` (13.5KB)
- `AOS-QUICK-REF.md` (1.2KB)
- 10 templates across `templates/`, `templates/portfolio/`, `templates/projects/`, `templates/reviews/`
- `artifacts/lessons/03_causal_inference/lesson_01_fundamental_problem.md` — unaudited lesson
- `artifacts/lessons/07_data_engineering_infrastructure/lesson_01_data_is_produced_not_found.md` — unaudited lesson
- `artifacts/lessons/08_quantitative_finance/lesson_01_alpha_options_directionality.md` — unaudited lesson

**Authority characteristics**:
- Staleness risk: **MEDIUM** — documentation and templates may lag behind current practices
- Conflict resolution: Tier 3 wins against Tiers 4–5; defers to Tiers 1–2
- Negative evidence: Limited — Tier 3 sources don't prove or disprove claims

---

### Tier 4 — Low Authority: Operational Context

**What belongs here**: Status files, handoffs, context compression summaries, implementation plans, session state transfer documents, generated state updates.

**Why Tier 4**: These sources capture point-in-time operational context. They are useful for understanding what was happening when, but they are the most staleness-prone sources in AOS. A status file from last week may describe work that has since been completed, abandoned, or restructured.

**AOS sources at Tier 4**:

| Source | Path Pattern | Evidence Class | Claim Support |
|---|---|---|---|
| Status file | `status.md` | CLASS 2 (stale risk) | Never — operational context only |
| Handoffs | `handoffs/*.md` | CLASS 2 (context) | Never — session context only |
| State update proposals | `artifacts/generated/state_updates/*.json` | CLASS 2 (derived) | Never — proposed changes only |
| Legacy ops scripts | `ops/legacy/*.ps1` | N/A (operational) | Never — tool history only |

**Specific Tier 4 sources in current AOS repo**:
- `status.md` (9.9KB, last updated 2026-05-25)
- `handoffs/session_handoff_2026-05-25.md` (1.6KB)
- 3 state update proposals in `artifacts/generated/state_updates/`

**Authority characteristics**:
- Staleness risk: **HIGH** — these sources age rapidly and may not reflect current state
- Conflict resolution: Tier 4 loses to all higher tiers; when a Tier 4 source conflicts with a Tier 1–3 source, the higher tier wins and the Tier 4 source is flagged as potentially stale
- Negative evidence: If a status file says "in progress" but an audit says "PASS," the status file is stale, not the audit

> [!WARNING]
> **`status.md` is the most dangerous source in AOS RAG.** It looks authoritative (it's the "status" file), it's easy to retrieve (high keyword match for status queries), and it ages fastest. RAG must always prefer audit records and commit history over status files for artifact state questions.

---

### Tier 5 — Lowest Indexed Authority: Design Intent

**What belongs here**: Prompts, brainstorms, speculative roadmaps, design ideas, generation prompts, repair prompts, review prompts.

**Why Tier 5**: These sources represent design intent, not evidence. A prompt used to generate an artifact is not evidence of the artifact's quality. A brainstorm about future work is not evidence of completed work. These sources are retrievable for understanding context and intent, but they have no evidentiary weight.

**AOS sources at Tier 5**:

| Source | Path Pattern | Evidence Class | Claim Support |
|---|---|---|---|
| Agent prompts | `prompts/agents/*.md` | CLASS 1 (design) | Never — design intent only |
| Generation prompts | `prompts/lessons/*.txt`, `prompts/projects/*.txt` | CLASS 1 (design) | Never — generation input only |
| Repair prompts | `prompts/repairs/*.txt` | CLASS 1 (design) | Never — fix intent only |
| Review prompts | `prompts/reviews/*.txt` | CLASS 1 (design) | Never — review input only |
| Portfolio prompts | `prompts/portfolio/*.txt` | CLASS 1 (design) | Never — translation input only |
| Frontend prompts | `prompts/frontend/*.md` | CLASS 1 (design) | Never — UI design intent only |
| Brainstorms | Various | CLASS 1 (speculative) | Never |
| Speculative roadmaps | Various | CLASS 1 (speculative) | Never |
| Canvas files | `*.canvas` | CLASS 1 (scratch) | Never |

**Specific Tier 5 sources in current AOS repo**:
- `prompts/agents/aos_architecture_strategy_agent.prompt.md`
- `prompts/agents/aos_debugger_agent.prompt.md`
- `prompts/lessons/generate_quant_options_lesson_01.prompt.txt`
- `prompts/projects/generate_ai_writing_dag_analysis_plan.prompt.txt`
- `prompts/portfolio/ai_writing_assistant_case_study.prompt.txt`
- `prompts/repairs/finalize_ai_writing_dag_analysis_plan.prompt.txt`
- `prompts/repairs/repair_ai_writing_case_study.prompt.txt`
- `prompts/reviews/readme_orientation_revision.prompt.txt`
- `prompts/frontend/cinematic-landing-page-builder.md`

**Authority characteristics**:
- Staleness risk: **LOW** (paradoxically) — prompts don't become stale because they were never claims about current state
- Conflict resolution: Tier 5 loses to everything; if a prompt says "generate an artifact about X" and no artifact exists, the prompt is not evidence of X
- Negative evidence: Prompts can establish intent ("we planned to do X") but never completion

---

### Tier 6 — Excluded: Private and Non-Evidence

**What belongs here**: Private learner-state, chat logs, local debugger prompts, provider topology, `.hermes/` internal state, `.obsidian/` metadata, `copy-paste/` scratch, `audits/quarantine/`, `.env*` files, secrets, raw outputs, scratch files.

**Why Tier 6 (Excluded)**: These sources are either private (learner-state, chat logs), tool-internal (`.hermes/`, `.obsidian/`), failed outputs (quarantine), temporary (scratch, raw outputs), or security-sensitive (`.env*`, secrets). They must never be indexed, retrieved, or cited.

**AOS sources at Tier 6 (Excluded)**:

| Source | Path Pattern | Why Excluded |
|---|---|---|
| Learner state | `learner-state/*` | Private personal data |
| Chat logs | `chat-logs/*` | Private, ephemeral, not evidence |
| Hermes internals | `.hermes/*` | Tool-internal state |
| Obsidian metadata | `.obsidian/*` | Tool-internal config |
| Copy-paste scratch | `copy-paste/*` | Temporary scratch |
| Quarantine | `audits/quarantine/*` | Failed/rejected outputs |
| Audit logs | `audits/logs/*` | Operational logs, not evidence |
| Raw outputs | `artifacts/generated/raw_outputs/*` | Unprocessed, not evidence |
| Scratch files | `artifacts/generated/scratch/*` | Temporary scratch |
| Hermes session files | `artifacts/hermes_session_*.txt` | Session transcripts, not evidence |
| Environment files | `.env*` | Secrets/configuration |
| Key/cert files | `*.key`, `*.pem` | Security credentials |
| Secrets directory | `secrets/*` | Security credentials |

**Authority characteristics**:
- These sources have **no authority**. They are not retrievable, not citable, not indexable.
- The exclusion is **structural** (enforced in code), not policy-based.
- If a query can only be answered by referencing excluded sources, the answer is: "This information is in private/excluded sources and cannot be retrieved by RAG. [Explain what the user can do instead.]"

---

## 3.2 — Source Type Profiles

Each source type has a complete metadata profile that the source registry (Chunk 4) will implement. Here are the 15 indexable source types:

### Profile format

```
Source Type: [name]
Tier: [1-5]
Evidence Class: [CLASS 1-6 or N/A]
Path Pattern: [glob pattern]
Claim Support: [what it can support]
Staleness Risk: [LOW / MEDIUM / HIGH]
Index Policy: [ALWAYS / CONDITIONAL / NEVER]
Chunk Strategy: [how to chunk — detailed in Chunk 6]
Retrieval Weight: [base authority weight for ranking]
Conflict Priority: [what it wins/loses against]
Negative Evidence: [what absence means]
```

### 1. PASS Audit Record
```
Source Type: pass_audit
Tier: 1
Evidence Class: CLASS 5–6
Path Pattern: audits/semantic/*.md, audits/reports/*.md (with PASS verdict)
Claim Support: Career claims, portfolio claims, competency evidence
Staleness Risk: LOW — audits are anchored evaluations
Index Policy: ALWAYS
Chunk Strategy: Full document (audits are typically short and self-contained)
Retrieval Weight: 1.0 (maximum)
Conflict Priority: Wins against all lower tiers
Negative Evidence: "No PASS audit exists for this artifact/domain"
```

### 2. Portfolio-Ready Artifact
```
Source Type: portfolio_artifact
Tier: 1
Evidence Class: CLASS 5–6 (requires associated PASS audit)
Path Pattern: artifacts/portfolio/**/*.md
Claim Support: Portfolio cases, resume claims, competency demonstration
Staleness Risk: LOW — committed, audited
Index Policy: ALWAYS
Chunk Strategy: Section-based (preserve heading hierarchy)
Retrieval Weight: 1.0
Conflict Priority: Wins against all lower tiers; equal to audits
Negative Evidence: "No portfolio-ready artifact exists for this domain"
```

### 3. Audited Project Artifact
```
Source Type: audited_project
Tier: 1
Evidence Class: CLASS 5 (PASS audit exists but may not be portfolio-translated)
Path Pattern: artifacts/projects/**/*.md (with associated PASS audit)
Claim Support: Career claims, competency evidence
Staleness Risk: LOW
Index Policy: ALWAYS
Chunk Strategy: Section-based
Retrieval Weight: 1.0
Conflict Priority: Wins against all lower tiers
Negative Evidence: "No audited project artifact exists for this domain"
```

### 4. Rubric
```
Source Type: rubric
Tier: 2
Evidence Class: N/A (structural — defines evaluation criteria)
Path Pattern: rubrics/*.md
Claim Support: Defines what "good" looks like; does not prove claims
Staleness Risk: LOW — rubrics are stable
Index Policy: ALWAYS
Chunk Strategy: Per-criterion (each rubric criterion is a chunk)
Retrieval Weight: 0.8
Conflict Priority: Authoritative for evaluation criteria
Negative Evidence: "No rubric exists for this artifact type"
```

### 5. Module Definition
```
Source Type: module_definition
Tier: 2
Evidence Class: N/A (structural — defines learning scope)
Path Pattern: modules/*.md
Claim Support: Defines what a module covers; does not prove learning
Staleness Risk: LOW — modules are stable
Index Policy: ALWAYS
Chunk Strategy: Section-based (preserve competency, topic, and assessment sections)
Retrieval Weight: 0.8
Conflict Priority: Authoritative for module scope and prerequisites
Negative Evidence: "Module definition exists but no artifacts produced"
```

### 6. Governance Document
```
Source Type: governance
Tier: 2
Evidence Class: N/A (governance — defines system rules)
Path Pattern: governance/*.md, docs/aos_proven_loop_pattern_01.md
Claim Support: Defines AOS rules; does not prove learning
Staleness Risk: LOW
Index Policy: ALWAYS
Chunk Strategy: Section-based
Retrieval Weight: 0.8
Conflict Priority: Authoritative for system rules and closure discipline
Negative Evidence: N/A — governance docs define rules, not evidence
```

### 7. Review
```
Source Type: review
Tier: 2
Evidence Class: CLASS 4
Path Pattern: artifacts/reviews/**/*.md
Claim Support: Progress evidence only — shows evaluation happened
Staleness Risk: MEDIUM — may be outdated if artifact was subsequently revised
Index Policy: ALWAYS
Chunk Strategy: Full document or section-based
Retrieval Weight: 0.7
Conflict Priority: Defers to audits; wins against status files
Negative Evidence: "No review exists for this artifact"
```

### 8. Curriculum Document
```
Source Type: curriculum
Tier: 2
Evidence Class: N/A (structural)
Path Pattern: curriculum/**/*.md
Claim Support: Defines learning structure; does not prove learning
Staleness Risk: LOW
Index Policy: ALWAYS
Chunk Strategy: Section-based
Retrieval Weight: 0.7
Conflict Priority: Authoritative for learning pathways and prerequisites
Negative Evidence: N/A
```

### 9. Unaudited Lesson/Artifact
```
Source Type: draft_artifact
Tier: 3
Evidence Class: CLASS 2
Path Pattern: artifacts/lessons/**/*.md, artifacts/projects/**/*.md (without PASS audit)
Claim Support: Context only — shows work started, not completed
Staleness Risk: MEDIUM
Index Policy: ALWAYS (but labeled as DRAFT in retrieval)
Chunk Strategy: Section-based
Retrieval Weight: 0.5
Conflict Priority: Defers to audits, reviews, and rubrics
Negative Evidence: "Artifact exists as draft — no audit evidence"
```

### 10. Template
```
Source Type: template
Tier: 3
Evidence Class: N/A (structural)
Path Pattern: templates/**/*.md
Claim Support: Defines artifact structure; does not prove anything
Staleness Risk: LOW
Index Policy: ALWAYS
Chunk Strategy: Full document
Retrieval Weight: 0.5
Conflict Priority: Authoritative for artifact structure expectations
Negative Evidence: N/A
```

### 11. Documentation
```
Source Type: documentation
Tier: 3
Evidence Class: N/A
Path Pattern: README.md, AOS-QUICK-REF.md, docs/*.html
Claim Support: System description only
Staleness Risk: MEDIUM — may lag behind actual system state
Index Policy: ALWAYS
Chunk Strategy: Section-based
Retrieval Weight: 0.5
Conflict Priority: Defers to governance; wins against status files for system description
Negative Evidence: N/A
```

### 12. Status File
```
Source Type: status_file
Tier: 4
Evidence Class: CLASS 2 (high staleness risk)
Path Pattern: status.md
Claim Support: NEVER — operational context only
Staleness Risk: HIGH
Index Policy: CONDITIONAL — index but always flag staleness
Chunk Strategy: Section-based
Retrieval Weight: 0.3
Conflict Priority: LOSES to all higher tiers; if status conflicts with audit, audit wins
Negative Evidence: N/A — status files are not reliable enough for negative evidence
```

### 13. Handoff
```
Source Type: handoff
Tier: 4
Evidence Class: CLASS 2 (context transfer)
Path Pattern: handoffs/*.md
Claim Support: NEVER — session context only
Staleness Risk: HIGH — handoffs are point-in-time
Index Policy: CONDITIONAL — index recent handoffs, skip old ones
Chunk Strategy: Full document
Retrieval Weight: 0.3
Conflict Priority: LOSES to all higher tiers
Negative Evidence: N/A
```

### 14. Agent/Generation Prompt
```
Source Type: prompt
Tier: 5
Evidence Class: CLASS 1 (design intent)
Path Pattern: prompts/**/*.md, prompts/**/*.txt
Claim Support: NEVER — design intent only
Staleness Risk: LOW (intent doesn't become stale)
Index Policy: CONDITIONAL — index for context, not for evidence
Chunk Strategy: Full document
Retrieval Weight: 0.2
Conflict Priority: LOSES to everything
Negative Evidence: "A prompt exists but no artifact was produced from it"
```

### 15. Operational Script
```
Source Type: ops_script
Tier: 3–4 (depending on whether current or legacy)
Evidence Class: N/A
Path Pattern: ops/*.ps1, ops/legacy/*.ps1
Claim Support: NEVER — tooling only
Staleness Risk: MEDIUM (legacy scripts may be outdated)
Index Policy: CONDITIONAL — index current ops, skip legacy unless queried
Chunk Strategy: Full document
Retrieval Weight: 0.3
Conflict Priority: Authoritative for how to run AOS tools
Negative Evidence: N/A
```

---

## 3.3 — Negative Evidence

Negative evidence — the documented absence of expected evidence — is a first-class concept in AOS RAG. It is not a gap to be papered over. It is information.

### Negative evidence taxonomy

| Type | What it means | Example | RAG behavior |
|---|---|---|---|
| **Missing audit** | An artifact exists but has never been formally evaluated | Lesson 03-01 exists, no audit | "No audit exists for this artifact. Evidence class: DRAFT. Cannot support claims." |
| **Missing artifact** | A module or domain has no associated artifacts | 22 of 25 modules have no artifacts | "No artifacts exist for Module [X]. This module has not been started." |
| **REJECT audit** | An artifact was evaluated and failed | (None currently in AOS, but the mechanism exists) | "This artifact was audited and REJECTED. It failed rubric criteria [X, Y, Z]. It is negative evidence against claims in this domain." |
| **Missing review** | An artifact exists but has not been reviewed | Some artifacts may lack formal reviews | "No review exists for this artifact. It has not been evaluated." |

### Negative evidence rules

1. **Always report negative evidence.** If a query implies evidence should exist and it doesn't, say so explicitly.
2. **Negative evidence outranks silence.** An answer that says "no audit exists" is better than an answer that ignores the absence.
3. **REJECT audits are stronger negative evidence than missing audits.** A missing audit means "not yet evaluated." A REJECT audit means "evaluated and failed."
4. **Count negatives in progress queries.** "3 of 25 modules have artifacts" is more honest than "you have artifacts in 3 modules."
5. **Negative evidence affects overclaiming risk.** Missing evidence increases risk level.

---

## 3.4 — Claim Support Rules

### The claim support matrix

This matrix defines which evidence classes can support which claim types. This is a hard constraint — not a guideline, not a suggestion.

```
                        CLASS 1    CLASS 2    CLASS 3    CLASS 4    CLASS 5    CLASS 6
                        Specul.    Draft      Revised    Reviewed   Aud-PASS   Closed
                        ─────────────────────────────────────────────────────────────
Resume skill claim       ✗          ✗          ✗          ✗          ✓          ✓
Portfolio case           ✗          ✗          ✗          ✗          ✗          ✓
Competency claim         ✗          ✗          ✗          ✗          ✓*         ✓
Experience claim         ✗          ✗          ✗          ✗          ✓          ✓
Expertise claim          ✗          ✗          ✗          ✗          ✗          ✓**
Progress report          ✓†         ✓          ✓          ✓          ✓          ✓
Learning context         ✓          ✓          ✓          ✓          ✓          ✓
System description       ✓          ✓          ✓          ✓          ✓          ✓

✓* = requires multiple CLASS 5+ artifacts for "strong" competency claims
✓** = requires multiple CLASS 6 closed loops demonstrating breadth and depth
✓† = speculative sources contribute only as "planned" or "intended" context
```

### Claim support rules (explicit)

**Rule CS-01**: No claim type above "Progress report" may be supported by sources below CLASS 5.

**Rule CS-02**: Portfolio cases require CLASS 6 (closed loop) because a portfolio case represents complete, finished work. An audited-but-unclosed artifact may have additional revisions pending.

**Rule CS-03**: Expertise claims require multiple CLASS 6 closed loops. A single closed loop demonstrates competence in a specific artifact, not domain expertise. "Expert" implies breadth and depth that a single artifact cannot demonstrate.

**Rule CS-04**: When evidence is mixed (some CLASS 5+, some below), the claim must be scoped to what the CLASS 5+ evidence supports. The lower-class evidence is mentioned as "additional context" but not as claim support.

**Rule CS-05**: Progress reports can use any evidence class because they describe what exists, not what is proven. But they must label each source by evidence class.

**Rule CS-06**: Negative evidence must be included in claim assessments. If evidence is missing, the claim answer must state what is missing and how it affects the claim.

**Rule CS-07**: Overclaiming risk is calculated from the gap between the claim's implied competence level and the evidence class supporting it:

| Gap | Risk Level | Example |
|---|---|---|
| Claim matches evidence | LOW | "Completed a formally audited analysis" backed by CLASS 6 closed loop |
| Claim slightly exceeds evidence | MEDIUM | "Proficient in causal inference" backed by one CLASS 5 artifact (proficiency usually implies multiple demonstrations) |
| Claim significantly exceeds evidence | HIGH | "Expert in data engineering" backed by one CLASS 2 draft |
| No evidence exists | REFUSE | "Built production ML systems" with no artifacts at all |

---

## 3.5 — Source Authority vs. Relevance

This is the most important architectural distinction in AOS RAG. Getting it wrong causes FM-07 (authority-blind retrieval) and FM-09 (semantic similarity mistaken for proof).

### The distinction

| Concept | What it measures | How it is determined | What it is used for |
|---|---|---|---|
| **Relevance** | How topically related a source is to the query | Keyword match, semantic similarity, topic overlap | Finding candidate sources |
| **Authority** | How much evidentiary weight a source carries | Source tier, evidence class, closure status, audit verdict | Ranking, claim support, conflict resolution |

### Why they must be separated

A brainstorm about causal inference is **highly relevant** to a query about causal inference competency. But it has **zero authority** for supporting a competency claim.

A module definition is **highly relevant** to a query about what a module covers. But it has **no authority** for claiming the learner has completed the module.

A PASS audit record may have **moderate relevance** to a broad domain query (audits are short and specific). But it has **maximum authority** for supporting claims about the audited artifact.

### The retrieval principle

> **Relevance finds candidates. Authority ranks them. Evidence class determines what they can support.**

The retrieval pipeline must:
1. Use relevance (keyword, metadata, eventually embedding) to find candidate sources
2. Use authority (tier, evidence class) to rank candidates
3. Use claim support rules to determine what each candidate can be used for
4. Present all of this metadata to the agent/answer contract

### What goes wrong when they are collapsed

| Failure | What happened | Consequence |
|---|---|---|
| Brainstorm outranks audit | High relevance score overcame low authority | Speculative ideas presented as evidence |
| Module definition treated as completion proof | Highly relevant to domain query | System says "you've covered X" when only the module card exists |
| Verbose draft outranks terse audit | More text = higher embedding match | Draft (CLASS 2) presented over PASS audit (CLASS 5) |
| Status file treated as ground truth | Keyword match on "status" query | Stale status file overrides audit records |

---

## 3.6 — Source Decay and Staleness

Sources age differently. Some remain authoritative indefinitely. Others become unreliable within days.

### Staleness categories

| Category | Decay Rate | Sources | Staleness Signal |
|---|---|---|---|
| **Anchored** | None — stable indefinitely | PASS audits, closed loop records, rubrics, module definitions, templates | These sources are evaluations or definitions anchored to a specific point. They don't become stale unless the system rules change. |
| **Slow decay** | Months | README, governance docs, curriculum, proven loop pattern | These sources change infrequently but may drift from actual practice over time. |
| **Medium decay** | Weeks | Reviews (pre-revision), draft artifacts (pre-audit), documentation | These sources describe work-in-progress states that will change as the lifecycle advances. |
| **Rapid decay** | Days | Status files, handoffs, state update proposals | These sources capture point-in-time operational context. A handoff from last week describes a session that has passed. A status file from last week may not reflect current artifact states. |

### Staleness handling rules

**Rule ST-01**: Anchored sources are never flagged for staleness. Their `staleness_risk` is permanently LOW.

**Rule ST-02**: Rapid-decay sources are always flagged with `[STALENESS WARNING: last verified {date}]` when retrieved. The answer must include "live verification recommended" for any answer based primarily on rapid-decay sources.

**Rule ST-03**: When a rapid-decay source conflicts with an anchored source, the anchored source wins. Always.

**Rule ST-04**: Staleness risk increases with age. A status file updated yesterday has lower staleness risk than one updated two weeks ago. The registry should track `last_modified` or `last_verified` dates.

**Rule ST-05**: Staleness is not grounds for exclusion. A stale source is still retrievable — it is just flagged and ranked lower. Only Tier 6 sources are excluded.

---

## 3.7 — Source Conflict Resolution

When multiple sources disagree about the same fact, RAG must resolve the conflict systematically.

### Conflict resolution protocol

```
  Two sources disagree
         │
         ▼
  ┌──────────────────────┐
  │ Compare source tiers  │
  └──────────┬───────────┘
             │
      ┌──────┴──────┐
      │  Same tier?  │
      └──────┬──────┘
         NO  │  YES
             │
  ┌──────────┴──────────┐
  │                     │
  ▼                     ▼
Higher tier         ┌──────────────────────┐
wins                │ Compare staleness     │
                    └──────────┬───────────┘
                               │
                        ┌──────┴──────┐
                        │  Same       │
                        │  staleness? │
                        └──────┬──────┘
                           NO  │  YES
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
                Fresher source        ┌──────────────────┐
                wins                  │ Report conflict.  │
                                      │ Present both.     │
                                      │ Flag uncertainty. │
                                      └──────────────────┘
```

### Resolution rules

**Rule CR-01**: Higher tier always wins. A Tier 1 audit verdict overrides a Tier 4 status file claim about the same artifact. No exceptions.

**Rule CR-02**: Within the same tier, fresher source wins. A review from this week outranks a review from last month for the same artifact.

**Rule CR-03**: When sources are same-tier and same-freshness, report the conflict. Present both sources, flag the uncertainty, and recommend verification.

**Rule CR-04**: Anchored sources are never overridden by rapid-decay sources, regardless of recency. A PASS audit from last month is more authoritative than a status file from today.

**Rule CR-05**: Negative evidence (REJECT audit) overrides positive but lower-tier evidence. If a status file says "in progress" and an audit says "REJECT," the artifact failed evaluation.

**Rule CR-06**: Absence conflicts with presence. If a status file says "artifact exists" but the source registry has no entry for it, flag the discrepancy and recommend verification.

**Rule CR-07**: Multiple agreeing sources strengthen confidence. If a PASS audit and a portfolio artifact and a closed loop record all agree, the answer is high-confidence.

---

## 3.8 — Authority Weighting

Authority weights are used in retrieval ranking (Chunk 7) to modulate relevance scores. Here is the base weighting model:

### Base authority weights

| Tier | Base Weight | Rationale |
|---|---|---|
| Tier 1 | 1.0 | Maximum authority — audited, committed evidence |
| Tier 2 | 0.8 | High authority — evaluative, structural, governance |
| Tier 3 | 0.5 | Medium authority — committed content, documentation |
| Tier 4 | 0.3 | Low authority — operational context, staleness-prone |
| Tier 5 | 0.2 | Minimal authority — design intent only |
| Tier 6 | 0.0 | Excluded — never retrieved |

### Query-type modifiers

Authority weights are modified by query type. Different queries need different authority profiles:

| Query Type | Tier 1 Modifier | Tier 2 Modifier | Tier 3 Modifier | Tier 4 Modifier | Tier 5 Modifier |
|---|---|---|---|---|---|
| Career/claim query | ×1.5 | ×0.5 | ×0.3 | ×0.1 | ×0.0 |
| Status/state query | ×1.2 | ×1.0 | ×0.8 | ×0.6 | ×0.2 |
| Concept/learning query | ×0.8 | ×1.2 | ×1.0 | ×0.5 | ×0.5 |
| Structure/routing query | ×0.5 | ×1.5 | ×1.0 | ×0.3 | ×0.3 |
| Tooling/ops query | ×0.3 | ×0.5 | ×1.5 | ×1.0 | ×0.5 |

**Effective weight** = `base_weight × query_type_modifier × freshness_factor`

Where `freshness_factor`:
- Anchored sources: 1.0 (always)
- Slow decay: 1.0 if < 3 months old, 0.9 if < 6 months, 0.7 if older
- Medium decay: 1.0 if < 2 weeks old, 0.8 if < 1 month, 0.5 if older
- Rapid decay: 1.0 if < 3 days old, 0.7 if < 1 week, 0.4 if < 2 weeks, 0.2 if older

> [!IMPORTANT]
> These weights are initial values. They should be calibrated through the evaluation framework (Chunk 11) using real queries and expected rankings. The numbers are defensible starting points, not final parameters.

---

## 3.9 — Examples of Acceptable and Unacceptable Claim Support

### Example 1: Acceptable — Portfolio Case

**Claim**: "Designed a statistical analysis plan for evaluating AI writing assistance impact on student analytical memo quality."

**Supporting evidence**:
- `artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md` — CLASS 5 (audited project)
- `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md` — Tier 1, PASS
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study_v2.md` — CLASS 6 (portfolio-ready, closed loop)

**Assessment**: ✅ **ACCEPTABLE** — Claim accurately describes the artifact. PASS audit confirms quality. Closed loop confirms completion. Overclaiming risk: LOW.

---

### Example 2: Unacceptable — Inflated Competency

**Claim**: "Expert in causal inference and counterfactual reasoning."

**Available evidence**:
- One draft lesson (`artifacts/lessons/03_causal_inference/lesson_01_fundamental_problem.md`) — CLASS 2
- One combined memo that uses causal inference concepts — CLASS 5

**Assessment**: ✗ **UNACCEPTABLE** — "Expert" implies breadth and depth. One audited memo and one unaudited draft cannot support expertise. The draft is CLASS 2 and has no evidentiary weight for claims. Even the audited memo demonstrates application of causal concepts, not expertise in the field.

**Safer wording**: "Applied causal inference concepts (DAG-based identification, estimand specification) in a formally audited statistical analysis plan."

**What would reduce risk**: Multiple audited artifacts across different causal inference applications, plus a closed capstone project.

---

### Example 3: Unacceptable — Draft as Evidence

**Claim**: "Proficient in data engineering, including data pipeline design and data governance."

**Available evidence**:
- One draft lesson (`artifacts/lessons/07_data_engineering_infrastructure/lesson_01_data_is_produced_not_found.md`) — CLASS 2

**Assessment**: ✗ **UNACCEPTABLE** — The only evidence is a draft lesson. CLASS 2 cannot support any claim above "progress report." "Proficient" is a specific competency level that requires audited evidence.

**RAG response**: REFUSE. "No audited evidence exists for data engineering competency. One draft lesson exists but has no review or audit. Overclaiming risk: HIGH. Recommended action: Complete the lesson, submit for review and audit, then reassess."

---

### Example 4: Acceptable — Scoped Learning Progress

**Claim**: "Currently studying causal inference, with introductory work completed on the fundamental problem of causal inference."

**Available evidence**:
- Draft lesson on fundamental problem of causal inference — CLASS 2
- Module 03 card defining causal inference scope — Tier 2

**Assessment**: ✅ **ACCEPTABLE** — The claim says "studying" (in progress) and "introductory work completed" (a draft exists). It does not claim proficiency, competence, or expertise. The evidence class matches the claim's modesty.

---

### Example 5: Unacceptable — Brainstorm as Foundation

**Claim**: "Experienced in building AI governance systems."

**Available evidence**:
- AOS itself exists as a system — but the claim implies the learner built it as professional experience
- Various brainstorms and design notes — CLASS 1
- No audited AI governance artifact exists

**Assessment**: ✗ **UNACCEPTABLE** — Building AOS is a learning exercise, not professional experience. Brainstorms and design notes are CLASS 1 and cannot support experience claims. No audited artifact specifically demonstrates AI governance competence.

---

### Example 6: Acceptable with Caveats — Competency with Limitation

**Claim**: "Demonstrated ability to design a formal DAG-based statistical analysis plan, including treatment-outcome specification, identification strategy, and threats to validity."

**Available evidence**:
- `artifacts/projects/combined_identification_data_memos/ai_writing_assistant_memo.md` — CLASS 5
- PASS audit confirming quality — Tier 1

**Assessment**: ✅ **ACCEPTABLE with caveat** — The claim accurately describes what the audited artifact demonstrates. The caveat: this is one artifact. "Demonstrated ability" (singular) is honest. "Expertise in DAG-based analysis" (broad) would be overclaiming.

---

### Example 7: Unacceptable — Citing Nonexistent Evidence

**Claim**: "Completed coursework in quantitative finance, including options pricing and directionality analysis."

**Available evidence**:
- `artifacts/lessons/08_quantitative_finance/lesson_01_alpha_options_directionality.md` — CLASS 2 (draft, no audit)

**Assessment**: ✗ **UNACCEPTABLE** — "Completed coursework" implies formal completion. The lesson is a draft with no review or audit. The lesson exists but has not been evaluated. "Completed" is false; "began" is accurate.

**Safer wording**: "Produced a draft lesson on options pricing and directionality as part of a quantitative finance self-study program."

---

### Example 8: Acceptable — Honest System Description

**Claim**: "Building a local AI-assisted evidence-governance system for learning, with formal artifact lifecycle management, rubric-based evaluation, and semantic auditing."

**Available evidence**:
- AOS repo exists with functioning lifecycle — verified
- Proven loop pattern documentation — Tier 2
- At least one fully closed loop — Tier 1
- Rubrics, templates, module definitions — Tier 2
- Semantic audit system — demonstrated

**Assessment**: ✅ **ACCEPTABLE** — The claim describes what AOS is and what it does. The evidence supports all specific claims (lifecycle management, rubric-based evaluation, semantic auditing). "Building" is honest — the system is v0.2.0, not a finished product.

---

## 3.10 — The Authority Override Principle

In every case where relevance and authority disagree, authority wins for claim-bearing queries.

This is not a suggestion. It is a hard rule.

| Scenario | Relevance says | Authority says | Result |
|---|---|---|---|
| Brainstorm matches query perfectly | "Highly relevant!" | "Tier 5, CLASS 1, no claim support" | Authority wins — brainstorm is context only |
| Audit is terse and keyword-poor | "Low relevance" | "Tier 1, CLASS 5, PASS" | Authority wins — audit is surfaced and ranked high |
| Status file is the only match | "Only relevant source" | "Tier 4, HIGH staleness risk" | Authority warns — flag staleness, recommend verification |
| Multiple sources agree | "All relevant" | "Mixed tiers" | Authority ranks — highest tier source is primary citation |

For non-claim queries (concept questions, system description, tooling help), relevance may have a stronger influence. But for any query that implies a claim about competence, completion, or career, authority always wins.

---

## Chunk Completed

**Chunk 3 — Evidence Hierarchy and Source Authority Model** is complete.

---

## What This Chunk Covered

1. **6-tier source authority hierarchy**: Detailed specification of each tier with path patterns, evidence classes, claim support rules, staleness characteristics, and conflict resolution behavior — grounded in actual AOS repo paths
2. **15 source type profiles**: Complete metadata profiles for every indexable source type (pass_audit, portfolio_artifact, audited_project, rubric, module_definition, governance, review, curriculum, draft_artifact, template, documentation, status_file, handoff, prompt, ops_script)
3. **Negative evidence taxonomy**: 4 types (missing audit, missing artifact, REJECT audit, missing review) with handling rules
4. **Claim support matrix**: Hard constraints mapping 5 claim types × 6 evidence classes with specific rules (CS-01 through CS-07)
5. **Source authority vs. relevance**: Formal separation principle with failure examples
6. **Source decay model**: 4 staleness categories (anchored, slow, medium, rapid) with decay rates and handling rules (ST-01 through ST-05)
7. **Conflict resolution protocol**: 7 resolution rules (CR-01 through CR-07) with decision flow
8. **Authority weighting model**: Base weights, query-type modifiers, freshness factors, and effective weight formula
9. **8 worked examples**: Acceptable and unacceptable claim support using real AOS artifacts
10. **Authority override principle**: Hard rule that authority wins over relevance for claim-bearing queries

---

## Running Decision Log

*All decisions from Chunks 0–2 (D1–D30) are preserved. New decisions from Chunk 3:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D30 | *(preserved from Chunks 0–2)* | | |
| D31 | 6-tier authority hierarchy with specific path-to-tier mappings | Each tier has distinct authority characteristics, staleness profiles, and claim support rules. Path-to-tier mappings make the hierarchy implementable. | **Accepted** |
| D32 | 15 source type profiles with complete metadata | Every indexable source type has a defined tier, evidence class, staleness risk, index policy, chunk strategy, retrieval weight, and negative evidence behavior. This feeds directly into the source registry schema (Chunk 4). | **Accepted** |
| D33 | Negative evidence is a first-class concept | Absence of evidence is information. Missing audits, missing artifacts, and REJECT audits all carry meaning that must be surfaced. | **Accepted** |
| D34 | Claim support matrix is a hard constraint, not a guideline | The matrix defines which evidence classes can support which claim types. Violations are system failures, not edge cases. | **Accepted** |
| D35 | Authority and relevance are structurally separated in the retrieval pipeline | Relevance finds candidates. Authority ranks them. Collapsing these causes FM-07 and FM-09. | **Accepted** |
| D36 | 4-category staleness model (anchored, slow, medium, rapid decay) | Different sources age at different rates. Audits are anchored. Status files decay rapidly. The model enables source-appropriate staleness handling. | **Accepted** |
| D37 | Conflict resolution follows tier > freshness > report protocol | Deterministic conflict resolution prevents ambiguous answers. Higher tier always wins. Same-tier defers to freshness. Same-tier-same-freshness reports both. | **Accepted** |
| D38 | Authority weights are query-type-dependent | A career claim query weights Tier 1 at ×1.5 and Tier 5 at ×0.0. A concept query weights Tier 2 at ×1.2. This prevents one-size-fits-all ranking. | **Accepted** |
| D39 | status.md is the most dangerous source and is permanently flagged | Despite its name and prominent location, status.md is Tier 4 with HIGH staleness risk. It must always be flagged and never override audit records. | **Accepted** |
| D40 | Authority override principle: for claim-bearing queries, authority always wins over relevance | This is the single most important retrieval rule. Without it, FM-09 (semantic similarity as proof) is unmitigated. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ2 | Should `source_registry.seed.json` be committed to git or generated? | Affects git hygiene | Chunk 4 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ5 | Are there additional closed loops beyond the 5 listed? | Affects registry completeness | Chunk 4 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ8 | How should RAG handle multi-file artifacts? | Affects chunking | Chunk 6 |
| UQ9 | Should evidence class be computed dynamically or stored? | Affects registry design | Chunk 4 |
| UQ10 | How should RAG handle in-flight artifacts? | Affects evidence class | Chunk 4 |
| UQ11 | Acceptable false-positive rate for privacy exclusion? | Affects FM-04 control | Chunk 5 |
| UQ12 | Should the control register be a trackable repo file? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ14 | Should authority weights be tunable via config file or hardcoded? | Affects retrieval flexibility and complexity | Chunk 7 |
| UQ15 | How should prompts in `prompts/agents/` be tiered when they define governance rules (e.g., the architecture strategy agent prompt defines the 9-agent ecology)? Currently Tier 5 for consistency, but the governance content within them is Tier 2-level. | Affects authority of agent prompt content | Chunk 4 |

---

## Next Chunk to Request

**Chunk 4 — Source Registry Design**

This chunk will translate the evidence hierarchy and source type profiles into a concrete `source_registry.schema.json` and `source_registry.seed.json`, with all required metadata fields, validation rules, and lifecycle management — directly implementing the decisions from Chunk 3.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 4 — Source Registry Design.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–3.

Preserve and update the running decision log from Chunks 0–3 (D1–D40).

Do not repeat Chunks 0–3 content except for brief continuity references.

Chunk 4 must include:
- source_registry.schema.json
- source_registry.seed.json
- required metadata fields
- optional metadata fields
- source IDs
- statuses
- visibility
- evidence tier
- module IDs
- competency IDs
- claim support
- index policies
- private risk
- commit hash / verification
- source lifecycle
- schema examples
- seed examples
- validation rules
- what not to include in v0.1

Stop after completing Chunk 4 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 5
```
