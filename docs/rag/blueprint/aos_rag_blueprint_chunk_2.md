# AOS RAG Blueprint — Chunk 2: RAG Requirements and Failure Modes

---

> **Continuity from Chunks 0–1**: Chunk 0 established the thesis (RAG as evidence authority layer), goals, anti-goals, and phased architecture. Chunk 1 detailed the AOS lifecycle, six evidence classes, closure rules, career-claim grounding, and RAG integration points. Chunk 2 now catalogs the specific failure modes RAG must prevent and the controls that prevent them.

---

## 2.0 — Framing: Why Failure Modes First

Most RAG designs start with "what should the system do?" AOS RAG starts with "what must the system never do?"

This is not pessimism. It is engineering discipline. AOS is a governance system. Governance systems are defined by their constraints as much as their capabilities. A RAG layer that retrieves brilliantly but allows unsupported career claims to pass is worse than no RAG at all — because it gives false confidence.

Every failure mode in this chapter maps to a specific control. Every control maps to a specific implementation phase. If a control is missing, the failure mode is unmitigated. If a failure mode is unmitigated, that phase is not complete.

> **AOS RAG does not "solve hallucination." It mitigates specific, named failure modes through specific, named controls.**

---

## 2.1 — Failure Mode Catalog

### FM-01: Repo-State Hallucination

**Description**: The system fabricates or misrepresents the current state of the AOS repository — claiming files exist that don't, reporting incorrect artifact status, inventing completion percentages, or describing directory structures from memory rather than retrieval.

**Why this is dangerous in AOS**: AOS depends on accurate repo-state answers for lifecycle decisions. If an agent believes an artifact has been audited when it hasn't, it may skip the audit stage. If the system reports a clean working tree when uncommitted changes exist, commit discipline breaks.

**Concrete example**:
> Query: "What is the status of the causal inference module artifacts?"
>
> Bad answer: "You have completed 3 artifacts in the causal inference module, including a comprehensive DAG analysis and a counterfactual reasoning exercise."
>
> Reality: Only one artifact (`AOS-L03-001`) exists as a draft lesson. No counterfactual reasoning exercise exists. The DAG analysis plan is in Module 07/combined, not Module 03.

**Severity**: **CRITICAL** — leads to incorrect lifecycle decisions

**Detection**: Compare RAG answers against live `git status`, `git ls-files`, and actual directory listings.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-01: Source registry as ground truth | 3 | Registry catalogs what exists; answers must cite registry entries |
| C-02: Retrieval-backed answers only | 5 | Repo-state answers must cite retrieved sources, not generate from memory |
| C-03: Live verification flag | 5 | Answers about current repo state must include "live verification recommended" when source may be stale |
| C-04: Refusal on missing evidence | 6 | If no source supports the answer, refuse and state what is missing |

---

### FM-02: Closure Violation (Reopening Closed Loops)

**Description**: The system suggests, enables, or performs modifications to closed artifacts — either by recommending revisions, surfacing closed artifacts as candidates for active work, or failing to flag closure status in retrieval results.

**Why this is dangerous in AOS**: Closure is the highest-value state in AOS. It represents a completed evidence chain. Reopening a closed loop without a real defect destroys the evidence value and violates the core discipline: "No closed loop reopened without a real defect."

**Concrete example**:
> Query: "Can you help me improve the AI Writing Assistance DAG analysis plan?"
>
> Bad answer: "Sure! Here are some suggestions for improving the DAG structure and adding additional variables..."
>
> Correct answer: "The AI Writing Assistance DAG / Statistical Analysis Plan is a CLOSED loop (PASS audit, committed). It should not be reopened unless a real defect exists. A defect is a factual error, structural failure against the rubric, missing required section, or governance violation. 'Improvement ideas' are not defects. If you believe a defect exists, describe the specific error."

**Severity**: **CRITICAL** — destroys evidence integrity

**Detection**: Track all queries about closed artifacts. Verify RAG surfaces closure status. Flag any response that suggests modification without defect justification.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-05: Closure status in source registry | 3 | Every source has `closure_status` field |
| C-06: Closure flag in retrieval results | 5 | Retrieved closed sources include `[CLOSED]` tag |
| C-07: Closure guard tool | 8 | Dedicated tool blocks reopening without defect justification |
| C-08: Closure-check answer contract | 6 | Answer contract requires closure status check before suggesting modifications |

---

### FM-03: Unsupported Resume/Career Claims

**Description**: The system supports, generates, or fails to challenge career claims that lack sufficient artifact evidence — allowing drafts, brainstorms, or incomplete work to be presented as competency evidence.

**Why this is dangerous in AOS**: AOS exists partly to prevent overclaiming. If RAG allows a draft to support a resume claim, the entire career-claim calibration system is undermined. The learner loses the ability to distinguish between "I started learning X" and "I have demonstrated competence in X."

**Concrete example**:
> Query: "Can I claim expertise in data engineering on my resume?"
>
> Bad answer: "Based on your work in Module 07, you have developed skills in data engineering including pipeline design and data governance."
>
> Reality: Module 07 has a lesson draft (`AOS-L07-001`) with no review, no audit, no completed project artifact. "Expertise" is unsupported. Even "skills" is overclaiming.
>
> Correct answer: "Evidence assessment for 'data engineering expertise': No PASS audits exist for data engineering artifacts. One draft lesson (AOS-L07-001) exists but has not been reviewed or audited. Overclaiming risk: HIGH. This claim is not currently supported. To support this claim, you would need: (1) at least one audited data engineering project artifact, (2) a PASS audit, (3) a closed loop. Safer wording: 'Completed introductory coursework in data engineering fundamentals.' Even this requires the draft to be audited."

**Severity**: **CRITICAL** — undermines career-claim integrity

**Detection**: Test with claim-bearing queries. Verify RAG checks evidence class. Verify refusal when evidence is insufficient.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-09: Evidence class check for claims | 7 | Claim checker requires CLASS 5+ for resume claims |
| C-10: Overclaiming risk assessment | 7 | Every claim answer includes risk level (LOW/MEDIUM/HIGH) |
| C-11: Missing evidence reporting | 6 | Answer states what evidence would reduce claim risk |
| C-12: Safer wording generation | 7 | When risk > LOW, alternative wording is proposed |
| C-04: Refusal on missing evidence | 6 | If no CLASS 5+ evidence exists, refuse the claim |

---

### FM-04: Private Data Leakage

**Description**: The system indexes, retrieves, or surfaces content from private or excluded sources — including learner-state files, chat logs, local debugger prompts, provider topology, `.hermes/` internal state, `.obsidian/` metadata, quarantine outputs, or `.env*` files.

**Why this is dangerous in AOS**: AOS has a strict public/private boundary. Learner-state is private by design — it contains personal progress data, self-assessments, and learning preferences. Chat logs contain raw conversation artifacts that are not evidence. Provider/debugger files contain API keys, topology, and configuration. None of these should appear in retrieval results or be available to agents.

**Concrete example**:
> Query: "What is my current learning progress?"
>
> Bad answer: "Based on your learner state, you are at the Foundational tier with proficient-level competency in Model Construction and Causal Identification..."
>
> This answer is bad even if factually correct because it implies RAG indexed `learner-state/current_student_state.json`, which is a private file that must never be indexed.
>
> Correct answer: "Learning progress is tracked in learner-state files, which are private and excluded from RAG indexing. For evidence of progress, I can retrieve your audited artifacts and completed modules. Would you like an evidence-based progress summary instead?"

**Severity**: **CRITICAL** — privacy violation, potential secrets exposure

**Detection**: Verify no excluded paths appear in retrieval results. Test with queries designed to elicit private data. Audit the index for excluded content.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-13: Structural exclusion list | 2–3 | Hardcoded exclusion paths in indexing policy — not configurable at query time |
| C-14: Pre-indexing path filter | 5 | Files are checked against exclusion list before indexing, not after |
| C-15: No learner-state in registry | 3 | Source registry explicitly excludes learner-state entries |
| C-16: Privacy boundary test suite | 11 | Evaluation includes privacy leak tests for all excluded directories |
| C-08: Answer contract privacy clause | 6 | Answer contracts include "do not reference private sources" rule |

**Excluded paths (exhaustive for v0.1)**:
```
learner-state/
chat-logs/
.hermes/
.obsidian/
copy-paste/
audits/quarantine/
audits/logs/
artifacts/generated/raw_outputs/
artifacts/generated/scratch/
.env*
*.key
*.pem
secrets/
artifacts/hermes_session_*.txt
```

---

### FM-05: Stale Context Poisoning

**Description**: The system retrieves and presents outdated information as current truth — using old status files, superseded handoffs, or cached representations that no longer reflect the actual repo state.

**Why this is dangerous in AOS**: AOS is a living system. Status changes, artifacts progress through lifecycle stages, and modules evolve. A stale status file claiming an artifact is "in progress" when the audit already passed leads to wasted effort or incorrect lifecycle decisions.

**Concrete example**:
> `status.md` (last updated 2026-05-25) says: "Active work: AI Writing Assistance case study revision"
>
> Reality: The AI Writing case study passed its semantic audit on 2026-05-25 and the loop is now closed.
>
> Bad answer: "You are currently working on revising the AI Writing Assistance case study."
>
> Correct answer: "Status.md (last updated 2026-05-25) indicates active work on the AI Writing Assistance case study. However, the semantic audit record (`audits/semantic/ai_writing_assistant_memo_case_study.semantic_audit.md`) indicates this artifact has passed audit. The audit record (Tier 1) outranks the status file (Tier 4). The loop appears to be closed. Live verification recommended."

**Severity**: **HIGH** — leads to wasted effort and incorrect state understanding

**Detection**: Compare status file claims against audit records and git commit history. Test with queries where status file and audit records conflict.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-17: Staleness risk field | 3 | Source registry includes `staleness_risk` per source |
| C-18: Source date tracking | 3 | Registry tracks `last_verified` or `last_modified` date |
| C-19: Authority-based conflict resolution | 7 | When sources conflict, higher-tier source wins |
| C-20: Staleness warning in retrieval | 5 | Stale sources include warning: `[STALENESS RISK: last verified {date}]` |
| C-03: Live verification flag | 5 | Stale sources trigger "live verification recommended" |

---

### FM-06: Draft Treated as Evidence

**Description**: The system treats draft artifacts — those without reviews or audits — as substantive evidence for competency, progress, or career claims.

**Why this is dangerous in AOS**: "A draft is not proof." This is a core AOS principle. A draft demonstrates intent, not competence. It shows work was started, not completed. If RAG treats drafts as evidence, it collapses the distinction between attempting and achieving.

**Concrete example**:
> Query: "What evidence do I have for causal reasoning competency?"
>
> Bad answer: "You have demonstrated causal reasoning through your lesson on the Fundamental Problem of Causal Inference (AOS-L03-001)."
>
> Reality: AOS-L03-001 is a draft lesson with no review or audit. "Demonstrated" implies competence. A draft demonstrates effort, not competence.
>
> Correct answer: "You have one draft artifact related to causal reasoning: AOS-L03-001 (Fundamental Problem of Causal Inference). Evidence class: DRAFT — no review or audit exists. This draft cannot support a competency claim. To support a causal reasoning competency claim, the artifact needs to be reviewed, revised, and audited with a PASS verdict."

**Severity**: **HIGH** — undermines evidence hierarchy

**Detection**: Test with competency queries where only drafts exist. Verify RAG labels drafts correctly and refuses to use them for claims.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-21: Evidence class labeling | 5 | Every retrieved source includes its evidence class (CLASS 1–6) |
| C-22: Draft penalty in retrieval ranking | 7 | Drafts are ranked lower than audited artifacts for claim queries |
| C-09: Evidence class check for claims | 7 | Claim checker requires CLASS 5+ |
| C-23: Draft disclaimer in answers | 6 | Answers citing drafts must include `[DRAFT — not evidence for claims]` |

---

### FM-07: Retrieval Without Authority (Authority-Blind Retrieval)

**Description**: The system retrieves sources based on relevance alone — keyword match or semantic similarity — without checking or surfacing the source's authority tier, evidence class, or governance status.

**Why this is dangerous in AOS**: Authority-blind retrieval treats a brainstorm the same as a PASS audit. It treats a speculative roadmap the same as a committed artifact. This collapses the evidence hierarchy and makes every retrieved source appear equally trustworthy.

**Concrete example**:
> Query: "What is the AOS approach to data engineering?"
>
> Authority-blind retrieval returns:
> 1. Module 07 card (Tier 2 — module definition)
> 2. A brainstorm note about data pipeline ideas (Tier 5 — speculative)
> 3. Draft lesson AOS-L07-001 (CLASS 2 — draft)
>
> All three are presented without authority context. The user cannot distinguish module definition (structural, authoritative) from brainstorm (speculative, not evidence) from draft (work-in-progress).
>
> Authority-aware retrieval returns:
> 1. Module 07 card — **Module definition (Tier 2)**. Authoritative for module scope and learning objectives.
> 2. Draft lesson AOS-L07-001 — **Draft (CLASS 2)**. Work in progress. No review or audit. Not evidence for claims.
> 3. Brainstorm note — **Speculative (CLASS 1, Tier 5)**. Ideas only. Not evidence.

**Severity**: **HIGH** — destroys evidence signal in retrieval results

**Detection**: Review retrieval results for authority metadata. Test with queries that should return mixed-authority sources. Verify authority labels are present and correct.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-24: Mandatory authority metadata in retrieval | 5 | Every retrieval result includes source tier and evidence class |
| C-25: Authority-weighted ranking | 7 | Higher-tier sources rank above lower-tier for claim and status queries |
| C-19: Authority-based conflict resolution | 7 | When sources conflict, higher-tier wins |
| C-18: Source date tracking | 3 | Authority includes recency context |

---

### FM-08: Phantom Citations (Citations Without Real Support)

**Description**: The system produces citations that appear to reference real sources but either point to nonexistent files, misrepresent the cited content, cite sources that don't actually support the claim being made, or cite sources that exist but say something different from what the answer claims.

**Why this is dangerous in AOS**: AOS requires citations precisely because they are verifiable. If citations are fabricated or misleading, the citation protocol becomes worse than useless — it creates false confidence. A user who sees a citation assumes the source was checked. If it wasn't, the citation is a lie.

**Concrete example**:
> Answer: "Your causal inference skills are well-developed, as evidenced by your PASS audit on the causal DAG analysis [source: audits/semantic/causal_dag_audit.md]."
>
> Reality: No file named `audits/semantic/causal_dag_audit.md` exists. The semantic audit that exists is for the AI writing assistant memo, not a causal DAG. The citation is fabricated.

**Severity**: **CRITICAL** — undermines the entire citation protocol

**Detection**: Verify every cited source path exists. Verify cited content matches the claim. Test with edge cases where similar-sounding sources exist but don't match.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-26: Citation validation | 6 | Citations must reference sources that were actually retrieved in the current query |
| C-27: Source ID anchoring | 5 | Citations use source registry IDs, not invented paths |
| C-28: Retrieved-only citation rule | 6 | Answer contracts prohibit citing sources not in the retrieval set |
| C-29: Citation sufficiency check | 7 | Claim checker verifies cited sources actually support the stated claim |

---

### FM-09: Semantic Similarity Mistaken for Proof

**Description**: The system treats high semantic similarity between a query and a source as evidence that the source proves or supports a claim — when in reality the source may be topically related but evidentially irrelevant.

**Why this is dangerous in AOS**: Semantic similarity finds topically related documents. It does not establish evidentiary support. A brainstorm about causal inference is semantically similar to a causal inference competency query — but the brainstorm is not evidence of competence. A module card about data engineering is semantically similar to "have I completed data engineering?" — but the module card is a definition, not a completion record.

**Concrete example**:
> Query: "Have I demonstrated proficiency in quantitative finance?"
>
> High semantic similarity hits:
> 1. Module 08 card (Quantitative Finance) — similarity: 0.93
> 2. Quant/Options Lesson 1 prompt — similarity: 0.89
> 3. Module 08 rubric reference — similarity: 0.85
>
> None of these prove proficiency. The module card defines the topic. The prompt was used to generate a lesson. The rubric defines evaluation criteria. Only a PASS audit on a quantitative finance artifact would demonstrate proficiency.
>
> Bad answer: "Based on your quantitative finance materials, you have demonstrated proficiency in this area."
>
> Correct answer: "Semantically related sources found: Module 08 card (module definition), Quant/Options Lesson 1 prompt (generation prompt). No PASS audits for quantitative finance artifacts found. Proficiency claim is NOT supported. A completed, audited quantitative finance artifact is required."

**Severity**: **HIGH** — the most common RAG failure mode in production

**Detection**: Test with queries where high-similarity sources exist but do not constitute evidence. Verify RAG distinguishes relevance from proof.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-30: Relevance ≠ authority principle | 5 | Retrieval pipeline separates relevance scoring from authority scoring |
| C-25: Authority-weighted ranking | 7 | Authority tier modulates relevance ranking |
| C-09: Evidence class check for claims | 7 | Claim checker requires evidence class, not just retrieval score |
| C-31: Query classification | 7 | Different query types (status, claim, concept) use different retrieval strategies |

---

### FM-10: Embedding Authority Collapse

**Description**: When vector embeddings are introduced (Phase 9+), they overpower metadata and keyword retrieval — causing the system to prefer semantically similar but low-authority sources over less similar but high-authority sources.

**Why this is dangerous in AOS**: Embeddings are content-similarity tools. They have no concept of authority, evidence class, closure status, or governance rules. If embeddings are given too much weight in hybrid retrieval, they will systematically prefer verbose brainstorms (lots of text, high embedding coverage) over terse audits (short text, precise evaluation). This inverts the evidence hierarchy.

**Concrete example**:
> A brainstorm document contains 2000 words about causal inference ideas, experiments, and applications. Its embedding covers the causal inference topic space broadly.
>
> A PASS audit for a causal inference artifact contains 300 words: rubric criteria met, evidence reviewed, verdict: PASS. Its embedding is narrow.
>
> Pure embedding retrieval ranks the brainstorm higher. But the audit is the authoritative source.

**Severity**: **HIGH** (but deferred — Phase 9+)

**Detection**: After embedding introduction, test authority ranking. Verify audits still outrank brainstorms for claim queries. Measure authority inversion rate.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-32: Embedding weight ceiling | 9 | Embeddings contribute at most X% of final ranking score (tunable, starting ≤ 40%) |
| C-25: Authority-weighted ranking | 7 | Authority tier is a multiplicative factor, not an additive bonus |
| C-33: Authority floor for claim queries | 9 | For claim queries, only CLASS 5+ sources are eligible regardless of embedding score |
| C-34: Embedding-only retrieval prohibited | 9 | Embeddings must always be combined with metadata filtering |

---

### FM-11: Negative Evidence Suppression

**Description**: The system fails to report the absence of evidence — omitting the fact that no audit exists, no review was completed, no artifact was produced, or no evidence supports a claim.

**Why this is dangerous in AOS**: In AOS, what does NOT exist is as important as what does. If no audit exists, that is evidence that the artifact has not been evaluated. If no artifact exists for a module, that is evidence that the module has not been started. Suppressing negative evidence makes the system appear more complete and competent than it actually is.

**Concrete example**:
> Query: "What is my progress across all modules?"
>
> Bad answer: "You have made progress in Module 03 (Causal Inference) and Module 07 (Data Engineering), with completed work in the AI Writing Assistance case study combining both."
>
> This answer is misleading by omission. It doesn't mention that:
> - 22 of 25 modules have no artifacts at all
> - Module 03 has only a draft lesson
> - Module 07 has only a draft lesson
> - Only the combined AI Writing memo has been audited
> - No module has a "completed" status with full artifact coverage
>
> Correct answer: "Evidence-based progress summary: 3 of 25 modules have associated artifacts. Module 03: 1 draft lesson (no audit). Module 07: 1 draft lesson (no audit). Cross-module: AI Writing Assistance memo (PASS audit, closed loop). 22 modules have no artifacts. No module has full artifact coverage. Competency evidence exists only for the audited cross-module work."

**Severity**: **HIGH** — creates false sense of completeness

**Detection**: Test with progress queries. Verify RAG reports what is missing, not just what exists. Count negative evidence statements in answers.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-35: "What is not known" section | 6 | Answer contracts require explicit "what is not known / what is missing" section |
| C-36: Negative evidence retrieval | 7 | Retrieval engine can query for absence: "what modules have no artifacts?" |
| C-37: Completeness assessment | 7 | For progress queries, RAG reports total vs. completed counts |
| C-04: Refusal on missing evidence | 6 | If evidence is missing, say so rather than answering with available-but-insufficient sources |

---

### FM-12: Agent Lane Violation via Retrieval

**Description**: RAG provides an agent with sources or context that enables it to operate outside its defined lane — for example, providing the Artifact Generator with audit verdicts (enabling it to self-audit), or providing the Resume Translator with draft artifacts (enabling it to overclaim).

**Why this is dangerous in AOS**: Agent lane discipline exists to prevent self-evaluation, role collapse, and governance circumvention. If the Reviewer can see its own prior reviews and calibrate to them, review independence is compromised. If the Artifact Generator can see audit criteria in advance, it may game the evaluation rather than genuinely meeting standards.

**Concrete example**:
> The Artifact Generator requests context for producing a new causal inference artifact.
>
> Authority-blind RAG returns: Module 03 card, lesson template, AND the auditor rubric with specific PASS criteria.
>
> The Artifact Generator now knows exactly what the auditor will check. This creates a "teaching to the test" dynamic rather than genuine competence demonstration.

**Severity**: **MEDIUM** — subtle but undermines evaluation integrity

**Detection**: Audit retrieval results per agent. Verify agents only receive source types allowed for their lane. Test with agents that request out-of-lane sources.

**Mitigations**:
| Control | Phase | Mechanism |
|---|---|---|
| C-38: Per-agent retrieval permissions | 9 | Each agent has a defined set of allowed and disallowed source types |
| C-39: Lane-scoped retrieval | 9 | Retrieval engine filters sources by agent lane before returning results |
| C-40: Agent lane audit log | 9 | Log when an agent's retrieval is lane-filtered for governance review |

---

## 2.2 — Failure Mode Severity Summary

| ID | Failure Mode | Severity | Primary Phase | Status |
|---|---|---|---|---|
| FM-01 | Repo-state hallucination | CRITICAL | 3, 5 | Unmitigated until Phase 3 |
| FM-02 | Closure violation | CRITICAL | 3, 8 | Unmitigated until Phase 3 |
| FM-03 | Unsupported career claims | CRITICAL | 6, 7 | Unmitigated until Phase 6 |
| FM-04 | Private data leakage | CRITICAL | 2, 3 | Partially mitigated by `.gitignore` |
| FM-05 | Stale context poisoning | HIGH | 3, 5 | Unmitigated until Phase 3 |
| FM-06 | Draft treated as evidence | HIGH | 5, 7 | Unmitigated until Phase 5 |
| FM-07 | Authority-blind retrieval | HIGH | 5, 7 | Unmitigated until Phase 5 |
| FM-08 | Phantom citations | CRITICAL | 5, 6 | Unmitigated until Phase 5 |
| FM-09 | Semantic similarity as proof | HIGH | 7, 9 | Unmitigated until Phase 7 |
| FM-10 | Embedding authority collapse | HIGH | 9 | Deferred — not relevant until Phase 9 |
| FM-11 | Negative evidence suppression | HIGH | 6, 7 | Unmitigated until Phase 6 |
| FM-12 | Agent lane violation | MEDIUM | 9 | Deferred — not relevant until Phase 9 |

---

## 2.3 — Complete Control Register

All controls defined in this chunk, ordered by ID:

| Control ID | Control Name | Mitigates | Phase | Type |
|---|---|---|---|---|
| C-01 | Source registry as ground truth | FM-01 | 3 | Data |
| C-02 | Retrieval-backed answers only | FM-01 | 5 | Protocol |
| C-03 | Live verification flag | FM-01, FM-05 | 5 | Protocol |
| C-04 | Refusal on missing evidence | FM-01, FM-03, FM-11 | 6 | Protocol |
| C-05 | Closure status in registry | FM-02 | 3 | Data |
| C-06 | Closure flag in retrieval | FM-02 | 5 | Retrieval |
| C-07 | Closure guard tool | FM-02 | 8 | Tool |
| C-08 | Closure-check / privacy answer contract | FM-02, FM-04 | 6 | Protocol |
| C-09 | Evidence class check for claims | FM-03, FM-06, FM-09 | 7 | Tool |
| C-10 | Overclaiming risk assessment | FM-03 | 7 | Protocol |
| C-11 | Missing evidence reporting | FM-03 | 6 | Protocol |
| C-12 | Safer wording generation | FM-03 | 7 | Tool |
| C-13 | Structural exclusion list | FM-04 | 2–3 | Data |
| C-14 | Pre-indexing path filter | FM-04 | 5 | Tool |
| C-15 | No learner-state in registry | FM-04 | 3 | Data |
| C-16 | Privacy boundary test suite | FM-04 | 11 | Evaluation |
| C-17 | Staleness risk field | FM-05 | 3 | Data |
| C-18 | Source date tracking | FM-05, FM-07 | 3 | Data |
| C-19 | Authority-based conflict resolution | FM-05, FM-07 | 7 | Retrieval |
| C-20 | Staleness warning in retrieval | FM-05 | 5 | Retrieval |
| C-21 | Evidence class labeling | FM-06 | 5 | Retrieval |
| C-22 | Draft penalty in ranking | FM-06 | 7 | Retrieval |
| C-23 | Draft disclaimer in answers | FM-06 | 6 | Protocol |
| C-24 | Mandatory authority metadata | FM-07 | 5 | Retrieval |
| C-25 | Authority-weighted ranking | FM-07, FM-09, FM-10 | 7 | Retrieval |
| C-26 | Citation validation | FM-08 | 6 | Tool |
| C-27 | Source ID anchoring | FM-08 | 5 | Data |
| C-28 | Retrieved-only citation rule | FM-08 | 6 | Protocol |
| C-29 | Citation sufficiency check | FM-08 | 7 | Tool |
| C-30 | Relevance ≠ authority principle | FM-09 | 5 | Architecture |
| C-31 | Query classification | FM-09 | 7 | Tool |
| C-32 | Embedding weight ceiling | FM-10 | 9 | Retrieval |
| C-33 | Authority floor for claim queries | FM-10 | 9 | Retrieval |
| C-34 | Embedding-only retrieval prohibited | FM-10 | 9 | Architecture |
| C-35 | "What is not known" section | FM-11 | 6 | Protocol |
| C-36 | Negative evidence retrieval | FM-11 | 7 | Retrieval |
| C-37 | Completeness assessment | FM-11 | 7 | Tool |
| C-38 | Per-agent retrieval permissions | FM-12 | 9 | Architecture |
| C-39 | Lane-scoped retrieval | FM-12 | 9 | Retrieval |
| C-40 | Agent lane audit log | FM-12 | 9 | Audit |

---

## 2.4 — Failure-Mode-to-Control Mapping Matrix

This matrix shows which controls mitigate which failure modes. The system is designed for defense in depth — no failure mode relies on a single control.

```
              FM-01 FM-02 FM-03 FM-04 FM-05 FM-06 FM-07 FM-08 FM-09 FM-10 FM-11 FM-12
              Repo  Close Claim Priv  Stale Draft Auth  Phant Sim   Embed NegEv Lane
C-01 Reg GT    ██
C-02 Ret-only  ██
C-03 LiveVer   ██                      ██
C-04 Refuse    ██          ██                                            ██
C-05 ClosReg         ██
C-06 ClosFlag        ██
C-07 ClosGrd         ██
C-08 ClosCont        ██          ██
C-09 EvClsCk               ██                ██                ██
C-10 OverclRk              ██
C-11 MissEvid              ██
C-12 SafeWord              ██
C-13 ExclList                    ██
C-14 PathFilt                    ██
C-15 NoLState                    ██
C-16 PrivTest                    ██
C-17 StaleRsk                          ██
C-18 SrcDate                           ██          ██
C-19 AuthConf                          ██          ██
C-20 StaleWrn                          ██
C-21 EvClsLbl                                ██
C-22 DraftPen                                ██
C-23 DraftDis                                ██
C-24 AuthMeta                                      ██
C-25 AuthRank                                      ██          ██    ██
C-26 CitValid                                            ██
C-27 SrcIdAnc                                            ██
C-28 RetOnlyC                                            ██
C-29 CitSuff                                             ██
C-30 Rel≠Auth                                                  ██
C-31 QueryCls                                                  ██
C-32 EmbCeil                                                         ██
C-33 AuthFlr                                                         ██
C-34 NoEmbOnly                                                       ██
C-35 NotKnown                                                              ██
C-36 NegEvRet                                                              ██
C-37 Complete                                                              ██
C-38 AgentPrm                                                                   ██
C-39 LaneScop                                                                   ██
C-40 LaneLog                                                                    ██
```

**Defense depth per failure mode**:
| Failure Mode | Number of Controls | Minimum Controls for Mitigation |
|---|---|---|
| FM-01 Repo-state hallucination | 4 | C-01 + C-04 (registry + refusal) |
| FM-02 Closure violation | 4 | C-05 + C-07 (registry status + guard) |
| FM-03 Unsupported claims | 5 | C-09 + C-04 (evidence check + refusal) |
| FM-04 Private data leakage | 5 | C-13 + C-14 (exclusion list + path filter) |
| FM-05 Stale context | 4 | C-17 + C-19 (staleness field + authority resolution) |
| FM-06 Draft as evidence | 4 | C-21 + C-09 (labeling + evidence check) |
| FM-07 Authority-blind retrieval | 4 | C-24 + C-25 (metadata + ranking) |
| FM-08 Phantom citations | 4 | C-26 + C-28 (validation + retrieved-only rule) |
| FM-09 Semantic similarity as proof | 3 | C-30 + C-25 (principle + ranking) |
| FM-10 Embedding authority collapse | 3 | C-32 + C-33 (ceiling + floor) |
| FM-11 Negative evidence suppression | 4 | C-35 + C-36 (not-known section + negative retrieval) |
| FM-12 Agent lane violation | 3 | C-38 + C-39 (permissions + scoping) |

---

## 2.5 — Requirements Traceability: Failure Modes to Phases

Every failure mode must be mitigated by a specific phase. If a phase does not complete, specific failure modes remain unmitigated.

| Phase | Controls Delivered | Failure Modes Mitigated (cumulative) |
|---|---|---|
| **Phase 2** (Schema) | C-13 (partial) | FM-04 (partial — exclusion defined in schema) |
| **Phase 3** (Seed Registry) | C-01, C-05, C-13, C-15, C-17, C-18 | FM-01 (partial), FM-02 (partial), FM-04 (structural), FM-05 (partial) |
| **Phase 5** (Keyword Retrieval) | C-02, C-03, C-06, C-14, C-20, C-21, C-24, C-27, C-30 | FM-01, FM-02 (retrieval-level), FM-04 (full), FM-05 (retrieval-level), FM-06 (partial), FM-07 (partial) |
| **Phase 6** (Answer Context) | C-04, C-08, C-11, C-23, C-26, C-28, C-35 | FM-01 (full), FM-03 (partial), FM-06 (answer-level), FM-08 (partial), FM-11 (partial) |
| **Phase 7** (Claim Checker) | C-09, C-10, C-12, C-19, C-22, C-25, C-29, C-31, C-36, C-37 | FM-03 (full), FM-05 (full), FM-06 (full), FM-07 (full), FM-08 (full), FM-09, FM-11 (full) |
| **Phase 8** (Closure Guard) | C-07 | FM-02 (full) |
| **Phase 9** (Embeddings) | C-32, C-33, C-34, C-38, C-39, C-40 | FM-10 (full), FM-12 (full) |
| **Phase 11** (Evaluation) | C-16 | FM-04 (verified) |

> [!WARNING]
> **Before Phase 5 completes, only structural (data-level) mitigations exist.** The system can define what should be excluded and what authority each source has, but it cannot enforce these rules in retrieval or answers. Phases 5–7 are where enforcement begins. Do not deploy RAG-grounded agent answers before Phase 6 is stable.

---

## 2.6 — What This Failure Analysis Means for Architecture

The failure mode catalog drives three architectural requirements:

### Requirement R-01: Layered defense, not single-point control

No failure mode should depend on a single control. The architecture must provide:
- **Data-level controls** (registry fields, exclusion lists, evidence classes)
- **Retrieval-level controls** (authority ranking, staleness warnings, closure flags)
- **Protocol-level controls** (answer contracts, citation rules, refusal rules)
- **Tool-level controls** (claim checker, closure guard, citation validator)
- **Evaluation-level controls** (test suites, regression tests, privacy audits)

### Requirement R-02: Failure modes are the evaluation specification

The evaluation framework (Chunk 11) must test for each failure mode directly. Every FM-XX maps to at least one test case. If a failure mode has no test, the mitigation is unverified.

### Requirement R-03: Phase gates are failure-mode gates

A phase is not complete until its assigned controls are implemented and its target failure modes have passing tests. This means:
- Phase 3 is not complete until FM-04 (privacy) has structural mitigation
- Phase 5 is not complete until FM-01 (repo-state) has retrieval-level mitigation
- Phase 7 is not complete until FM-03 (claims) has full mitigation
- Phase 8 is not complete until FM-02 (closure) has full mitigation

---

## Chunk Completed

**Chunk 2 — RAG Requirements and Failure Modes** is complete.

---

## What This Chunk Covered

1. **12 specific failure modes** cataloged with descriptions, AOS-grounded examples, severity ratings, detection methods, and mitigations
2. **40 controls** defined (C-01 through C-40) with phase assignments and control types
3. **Failure-mode-to-control mapping matrix** showing defense-in-depth coverage
4. **Defense depth analysis** — minimum controls required per failure mode
5. **Requirements traceability** — failure modes mapped to implementation phases with cumulative mitigation status
6. **Three architectural requirements** derived from the failure analysis (layered defense, failure modes as evaluation spec, phase gates as failure-mode gates)
7. **Severity classification** — 4 CRITICAL, 7 HIGH, 1 MEDIUM
8. **Phase dependency** — clear identification of when each failure mode becomes mitigated

---

## Running Decision Log

*All decisions from Chunks 0–1 (D1–D23) are preserved. New decisions from Chunk 2:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D23 | *(preserved from Chunks 0–1)* | | |
| D24 | 12 named failure modes define RAG requirements | Failure-mode-first design ensures every capability exists to prevent a specific harm, not for feature completeness | **Accepted** |
| D25 | 40 named controls with phase assignments | Each control is traceable to failure modes and implementation phases — no orphan controls, no unmitigated failures | **Accepted** |
| D26 | Defense in depth: no single-point controls | Every CRITICAL failure mode has ≥4 controls across multiple layers (data, retrieval, protocol, tool) | **Accepted** |
| D27 | Phase gates are failure-mode gates | A phase is complete when its target failure modes have passing tests, not when code is written | **Accepted** |
| D28 | FM-10 and FM-12 are deferred to Phase 9 | Embedding authority collapse and agent lane violation are not relevant until embeddings and agent-level retrieval are introduced | **Accepted** |
| D29 | No RAG-grounded agent answers before Phase 6 | Before Phase 6, only structural mitigations exist. Retrieval and protocol enforcement begin at Phase 5–6. Agent-facing answers require Phase 6+ | **Accepted** |
| D30 | Failure modes are the evaluation specification | Every FM-XX maps to at least one test case. If a failure mode has no test, the mitigation is unverified. This directly feeds Chunk 11 (Evaluation Framework) | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ2 | Should `source_registry.seed.json` be committed to git or generated? | Affects git hygiene | Chunk 4 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ5 | Are there additional closed loops beyond the 5 listed? | Affects registry completeness | Chunk 3–4 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ8 | How should RAG handle multi-file artifacts? | Affects chunking | Chunk 6 |
| UQ9 | Should evidence class be computed dynamically or stored? | Affects registry design | Chunk 4 |
| UQ10 | How should RAG handle in-flight artifacts? | Affects evidence class | Chunk 4 |
| UQ11 | What is the acceptable false-positive rate for privacy exclusion? Should the exclusion list err on the side of over-excluding or exact-matching? | Affects FM-04 control strength | Chunk 5 |
| UQ12 | Should the control register (C-01 through C-40) be maintained as a trackable file in the repo? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested — manual verification or automated path checking? | Affects evaluation framework | Chunk 11 |

---

## Next Chunk to Request

**Chunk 3 — Evidence Hierarchy and Source Authority Model**

This chunk will formalize the source authority tiers, evidence classes, claim support rules, source decay/staleness model, source conflict resolution, authority weighting, and examples of acceptable vs. unacceptable claim support — building on the failure modes and controls defined in Chunk 2.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 3 — Evidence Hierarchy and Source Authority Model.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–2.

Preserve and update the running decision log from Chunks 0–2 (D1–D30).

Do not repeat Chunks 0–2 content except for brief continuity references.

Chunk 3 must include:
- source tiers (detailed)
- audited artifacts
- audits
- reviews
- modules
- rubrics
- status files
- handoffs
- prompts
- brainstorms
- private/local exclusions
- negative evidence
- claim support rules
- source authority vs relevance
- source decay/staleness
- source conflict resolution
- authority weighting
- examples of acceptable and unacceptable claim support

Stop after completing Chunk 3 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 4
```
