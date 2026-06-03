# AOS RAG Blueprint — Chunk 14: Blueprint Audit and Final Quality Register

---

> **Continuity from Chunks 0–13**: Chunk 0 established the framework. Chunk 1 detailed the lifecycle. Chunk 2 cataloged failure modes. Chunk 3 mapped authority tiers. Chunk 4 designed the registry. Chunk 5 defined exclusions. Chunk 6 defined the manifest. Chunk 7 specified ranking. Chunk 8 codified contracts. Chunk 9 mapped agent prompts. Chunk 10 designed the tools. Chunk 11 designed the evaluations. Chunk 12 outlined implementation. Chunk 13 designed cross-repo integration. Chunk 14 now concludes the blueprint, resolving UQ16, mapping all 145 decisions and 40 controls, and establishing closing procedures.

---

## 14.0 — Blueprint Closure Discipline

In accordance with AOS governance, this blueprint is treated as a **System Documentation Artifact**. It must not remain open indefinitely as a draft. Once Chunk 14 is committed, the blueprint enters the **Under Review** lifecycle phase. Upon developer approval, it is registered in the source registry and closed, serving as the official specification for RAG implementation.

---

## 14.1 — Resolution of UQ16: Quant Lesson 1 Audit Formalization

**Discrepancy**: Quant Lesson 1 (`AOS-SRC-DRAFT-003`) is documented as a closed loop in agent prompts, but lacks a formal audit record in the `audits/` directory, violating the core rule: *"No closure without an audit."*

**Resolution (D141)**:
- Before Phase 3 is completed, the developer or the auditor agent must generate a formal audit file: `audits/semantic/quant_options_lesson_1.audit_2026-06-03.md`.
- This file must record a `PASS` verdict against the options pricing rubrics, be registered as `AOS-SRC-AUDIT-004` (Tier 1), and be referenced in the `depends_on` metadata of `AOS-SRC-DRAFT-003`.
- The source status of the lesson is then updated to `active` and its evidence class elevated to `CLASS 6 (CLOSED)`.

---

## 14.2 — Final Blueprint Audit Checklist

Before initiating Phase 2 coding, the developer must verify that the implementation plan meets these 10 compliance standards:

- [ ] **Privacy Invariant**: Ensure that `learner-state/` and environment credentials have `Tier 6 (Excluded)` classifications cabled into all path filtering designs.
- [ ] **Structural Chunks**: Verify that no token splitters slice across rubric criteria boundaries or Markdown table cells.
- [ ] **Rigid Access Control**: Confirm that the access control matrix blocks the Artifact Generator from reading prior audits.
- [ ] **Metadata First**: Verify that BM25 calculations only query files explicitly registered in `source_registry.json`.
- [ ] **Phantom Citation Block**: Verify that post-processing validation rejects any generated chunk IDs not present in the prompt payload.
- [ ] **Tunable Modifiers**: Confirm that all base weights and query modifiers reside in `rag/retrieval_config.json`.
- [ ] **Decay Math**: Verify that rapid-decay status files are penalized dynamically based on modified days.
- [ ] **Refusal Gate**: Assert that career claim queries immediately abort if the highest evidence class is $< 5$.
- [ ] **PowerShell Interface**: Ensure that all Python scripts are wrapper-executed via `tools/rag/rag_runner.ps1`.
- [ ] **Clean Phase 0 Gate**: Assert that all outstanding Writing Assistant case study modifications are committed to git before Phase 2.

---

## 14.3 — Master Register of Decisions (D01–D145)

Below is the master register of the 145 architectural decisions established across the 15 chunks (0–14) of this blueprint, grouped by functional domain:

### Domain 1: RAG Philosophy & Thesis (D01–D15)
- **D01**: RAG is an evidence authority layer, not a knowledge base.
- **D02**: The Source Registry is the first required deliverable.
- **D03**: Ingestion precedence: Metadata -> Keyword -> Vector.
- **D04**: Phase 0 repository cleanup is a hard block gate.
- **D05**: Multi-repo integrations are deferred to Phase 11.
- **D06**: The Chat UI is blocked until Answer Contracts are validated.
- **D07**: Closed loops are citable but protected from active modifications.
- **D08**: Directory exclusions are code-enforced, not policy-defined.
- **D09**: Vector embeddings are deferred to Phase 9.
- **D10**: The external `trade-sim` repository is firewalled in v0.1.
- **D11**: Draft artifacts are blocked from supporting competency claims.
- **D12**: Negative evidence (absent files/failed audits) must be citable.
- **D13**: Core agent roles are preserved, not expanded.
- **D14**: Code implementations use Python; terminal runs use PowerShell.
- **D15**: RAG search indexes and manifests are gitignored.

### Domain 2: Evidence Classes & Lifecycle (D16–D30)
- **D16**: Six distinct evidence classes define artifact status.
- **D17**: Evidence class is metadata-driven, not content-derived.
- **D18**: Every retrieved chunk includes a mandatory metadata wrapper.
- **D19**: REJECT audits serve as citable negative evidence.
- **D20**: RAG retrieves data; agents act; governance rules decide.
- **D21**: System governance files are classified as Tier 2 sources.
- **D22**: Career claims require a minimum of CLASS 5 (PASS Audit).
- **D23**: Staleness risk is tracked in citable context blocks.
- **D24**: The 12 failure modes define system requirements.
- **D25**: All 40 controls map to specific implementation phases.
- **D26**: System boundaries are designed with multi-point controls.
- **D27**: Phase gates are blocked until failure tests pass.
- **D28**: Per-agent filters and embedding collapse are deferred to Phase 9.
- **D29**: Agent answer injection is blocked until Phase 6 is stable.
- **D30**: Failure modes define the evaluation test specification.

### Domain 3: Authority Model & Ranking (D31–D40)
- **D31**: Six-tier source authority maps files to strict weight limits.
- **D32**: Fifteen distinct source profiles establish chunking constraints.
- **D33**: Missing audits and reviews are treated as citable gaps.
- **D34**: The claim support matrix is a hard compiler constraint.
- **D35**: Relevance (keyword) and Authority (tiers) are scored separately.
- **D36**: Four decay categories define temporal authority decay.
- **D37**: Source conflict resolution matches Tier > Freshness > Report.
- **D38**: Authority multipliers are scaled by query type classifications.
- **D39**: `status.md` is designated as high staleness risk.
- **D40**: For Career queries, Authority always overrides Relevance.

### Domain 4: Source Registry Design (D41–D50)
- **D41**: The registry uses JSON format with JSON Schema validation.
- **D42**: Source IDs follow the `AOS-SRC-{TYPE}-{NNN}` pattern.
- **D43**: Six lifecycle statuses govern file progression.
- **D44**: Evidence class is stored in registry, not computed dynamically.
- **D45**: The source registry seed is committed and tracked in git.
- **D46**: Registry updates are manually managed in v0.1.
- **D47**: Agent prompts are Tier 5; embedded policies must be extracted.
- **D48**: Bulk card and template registrations are deferred.
- **D49**: The validation script includes a `--verify-classes` consistency flag.
- **D50**: The Quant Lesson 1 audit discrepancy is flagged for repair.

### Domain 5: Exclusions & Boundaries (D51–D60)
- **D51**: Explicit ingestion approval outranks open file scans.
- **D52**: `learner-state/` files are bypassed by the RAG scanner.
- **D53**: Chat transcripts are excluded from search contexts.
- **D54**: Path filtering runs prior to file reading.
- **D55**: Prompt system instructions are Metadata-Only indexed.
- **D56**: The indexer dynamically parses `.gitignore` settings.
- **D57**: Root `.canvas` files are structural and excluded.
- **D58**: Unregistered root notes default to CLASS 1 (Speculative).
- **D59**: Class 1 & 2 sources are restricted to Metadata-Only indexing.
- **D60**: Structural exclusions follow a zero-leak safety tolerance.

### Domain 6: Chunking & Manifests (D61–D70)
- **D61**: Markdown files are chunked by structural boundaries.
- **D62**: Breadcrumb tags prepend parent heading trees to chunks.
- **D63**: Heading context tokens are boosted by 1.5x.
- **D64**: Multi-file artifacts inherit core memo evidence classes.
- **D65**: The manifest tracks file SHA-256 hashes and line ranges.
- **D66**: Rubrics are chunked strictly at criteria separators.
- **D67**: Audits and handoffs are ingested as full, undivided files.
- **D68**: A 100-character floor blocks fragmented noise chunks.
- **D69**: Manifest rebuilds run compile-time, not runtime.
- **D70**: Dynamic AI splitting and PDF parsers are excluded from v0.1.

### Domain 7: Retrieval & Ranking (D71–D80)
- **D71**: Pre-filtering occurs prior to BM25 keyword matching.
- **D72**: The BM25 algorithm runs locally inside a Python script.
- **D73**: Rule-based query routing maps text to modifier matrices.
- **D74**: Base weights and modifiers are tunable via JSON configurations.
- **D75**: Token weights are scaled based on header injection tags.
- **D76**: Freshness decay factors are deducted dynamically at query run.
- **D77**: In-line warnings alert agents to stale source chunks.
- **D78**: Retrieved contexts are capped at 4,000 tokens.
- **D79**: Low-evidence queries trigger immediate refusal outputs.
- **D80**: Vector search integration is excluded in v0.1.

### Domain 8: Answer Contracts (D81–D90)
- **D81**: Agent outputs must match markdown schema contracts.
- **D82**: Citations must map to manifest chunk IDs.
- **D83**: Agents are blocked from citing files not in context payloads.
- **D84**: Risk assessments are required for Career queries.
- **D85**: Omission of risk sections is approved for Concept/Ops queries.
- **D86**: Standardized refusal blocks are generated for empty results.
- **D87**: Formatting check scripts reject non-conforming structures.
- **D88**: In-line citations map to local filesystem editor lines.
- **D89**: Auto-correcting citation parsers are excluded.
- **D90**: Markdown templates are chosen over API JSON output formats.

### Domain 9: Agent Integrations (D91–D100)
- **D91**: RAG serves as a utility tool, not an autonomous agent.
- **D92**: Agent access filters prevent lane boundary violations.
- **D93**: The Generator is blocked from reading audits of its draft work.
- **D94**: Reviewers must cite rubric criteria chunks.
- **D95**: Auditors must map verdicts to criteria chunks.
- **D96**: Resume Translators verify skills against PASS audits.
- **D97**: Injection block layouts are cabled into prompt templates.
- **D98**: Prompt edits are strictly appended as isolated markdown blocks.
- **D99**: Roadmap agents check prerequisites via RAG status lookups.
- **D100**: Excluded paths are double-checked at the tool boundary.

### Domain 10: Tooling & Structure (D101–D110)
- **D101**: Implementation uses Python logic with PowerShell runners.
- **D102**: Blueprint files are stored in `docs/rag/blueprint/`.
- **D103**: The control register is citable under `governance/`.
- **D104**: Shell execution is centralized in `rag_runner.ps1`.
- **D105**: The manifest JSON is excluded from git tracking.
- **D106**: The manifest dictionary loads directly to memory (RAM).
- **D107**: Checksums are validated to detect file modifications.
- **D108**: All execution error outputs write to AppData paths.
- **D109**: Rebuilding the manifest requires manual command execution.
- **D110**: Background web server daemons are blocked in v0.1.

### Domain 11: Evaluations & Framework (D111–D120)
- **D111**: Deterministic code assertions replace LLM-as-a-judge.
- **D112**: Test inputs are maintained in a structured JSON dataset.
- **D113**: Twelve distinct test cases target all failure modes.
- **D114**: Citation checking automatically detects phantom matches.
- **D115**: The target Privacy Leakage Rate is exactly 0.0%.
- **D116**: The target Authority Compliance Rate is exactly 100%.
- **D117**: The test runner script runs locally as a process tool.
- **D118**: The runner aborts if an excluded chunk is retrieved.
- **D119**: Automated semantic grading is deferred from v0.1.
- **D120**: Run outputs are serialized in structured JSON reports.

### Domain 12: Implementation Roadmap & Phase Gates (D121–D130)
- **D121**: Programmatic phase gates enforce strict transition orders.
- **D122**: Phase 0 is a hard block; uncommitted files must be committed.
- **D123**: `apps/aos-landing` truthfulness checks resolve through the Phase 0 commit.
- **D124**: The implementation schedule is estimated at 7 developer weeks.
- **D125**: Task breakdowns trace directly to Chunk 2 controls.
- **D126**: Top-K pruning limits are dynamic fallback options.
- **D127**: Uncommitted edits freeze evidence class upgrades.
- **D128**: Local index optimization is deferred unless manifest size exceeds 1MB.
- **D129**: Python validation tools execute directly through local processes.
- **D130**: Manual PR review governs control register modifications.

### Domain 13: Cross-Repo & Bridge Memos (D131–D140)
- **D131**: `trade-sim` strategies are citable using relative pathing.
- **D132**: A 500KB size limit blocks large raw tick datasets.
- **D133**: External strategy tokens are prefixed with `[TRD-CHK-*]`.
- **D134**: The local Memo Builder compiles strategies into bridge files.
- **D135**: Cross-repo indexing is skipped if the folder is absent.
- **D136**: Third-party framework code is excluded from indexes.
- **D137**: Strategy logs are citable only when referenced in memos.
- **D138**: Bridge memos carry the commit hash of the local AOS repo.
- **D139**: Path warnings alert agents to external file sources.
- **D140**: Strategy API key variables are excluded from RAG indexes.

### Domain 14: Final Closure & Open-Loop Repair (D141–D145)
- **D141**: Quant Options Lesson 1 must receive a formal PASS audit before it can be treated as a closed loop.
- **D142**: The final blueprint document is registered as a Tier 2 documentation source.
- **D143**: The master decision register is organized by functional domain.
- **D144**: Closing a blueprint requires a formal git commit.
- **D145**: Changes to closed blueprints require architectural defect files.

---

## 14.4 — RAG Controls Register (C-01 to C-40)

Below is the complete RAG Controls Register (mitigating all 12 failure modes), which will be serialized inside `governance/RAG_CONTROL_REGISTER.md`:

| ID | Control Name | Target Failure | Phase | Implementation File |
|---|---|---|---|---|
| **C-01** | Registry Ground Truth | FM-01 | Phase 3 | `rag/source_registry.json` |
| **C-02** | Retrieval-Backed Only | FM-01 | Phase 5 | `tools/rag/retriever.py` |
| **C-03** | Live Verification Flag | FM-01, FM-05 | Phase 5 | `tools/rag/retriever.py` |
| **C-04** | Refusal on Empty | FM-01, FM-03, FM-11 | Phase 6 | `tools/rag/validate_answer_format.py` |
| **C-05** | Registry Closure status | FM-02 | Phase 3 | `rag/source_registry.json` |
| **C-06** | Retrieval Closure Flag | FM-02 | Phase 5 | `tools/rag/retriever.py` |
| **C-07** | Closure Guard Tool | FM-02 | Phase 8 | `tools/rag/closure_guard.py` |
| **C-08** | Answer Contracts | FM-02, FM-04 | Phase 6 | `prompts/rag/answer_contracts/` |
| **C-09** | Claim Evidence Check | FM-03, FM-06, FM-09 | Phase 7 | `tools/rag/claim_checker.py` |
| **C-10** | Overclaiming Risk Assessment | FM-03 | Phase 7 | `tools/rag/claim_checker.py` |
| **C-11** | Missing Evidence report | FM-03 | Phase 6 | `tools/rag/validate_answer_format.py` |
| **C-12** | Safer Wording Output | FM-03 | Phase 7 | `tools/rag/claim_checker.py` |
| **C-13** | Directory Exclusion List | FM-04 | Phase 2–3 | `rag/source_registry.schema.json` |
| **C-14** | Pre-Indexing Path Filter | FM-04 | Phase 5 | `tools/rag/chunk_builder.py` |
| **C-15** | Bypassed Learner State | FM-04 | Phase 3 | `tools/rag/chunk_builder.py` |
| **C-16** | Privacy Leak Test Suite | FM-04 | Phase 11 | `tools/rag/eval_runner.py` |
| **C-17** | Staleness Risk tracking | FM-05 | Phase 3 | `rag/source_registry.json` |
| **C-18** | Modified Date tracking | FM-05, FM-07 | Phase 3 | `rag/source_registry.json` |
| **C-19** | Authority Conflict resolver| FM-05, FM-07 | Phase 7 | `tools/rag/retriever.py` |
| **C-20** | Staleness warnings | FM-05 | Phase 5 | `tools/rag/retriever.py` |
| **C-21** | Evidence Class labels | FM-06 | Phase 5 | `tools/rag/retriever.py` |
| **C-22** | Draft Penalty Weighting | FM-06 | Phase 7 | `tools/rag/retriever.py` |
| **C-23** | Draft Context Warning | FM-06 | Phase 6 | `tools/rag/validate_answer_format.py` |
| **C-24** | Injected Metadata wrapper | FM-07 | Phase 5 | `tools/rag/retriever.py` |
| **C-25** | Authority-weighted ranking | FM-07, FM-09 | Phase 7 | `tools/rag/retriever.py` |
| **C-26** | Citation Path validation | FM-08 | Phase 6 | `tools/rag/validate_citations.py` |
| **C-27** | Source ID Anchoring | FM-08 | Phase 5 | `tools/rag/retriever.py` |
| **C-28** | Context Payload checking | FM-08 | Phase 6 | `tools/rag/validate_citations.py` |
| **C-29** | Citation Sufficiency | FM-08 | Phase 7 | `tools/rag/validate_citations.py` |
| **C-30** | Relevance/Authority split | FM-09 | Phase 5 | `tools/rag/retriever.py` |
| **C-31** | Query Class Routing | FM-09 | Phase 7 | `tools/rag/query_classifier.py` |
| **C-32** | Embedding Limit ceiling | FM-10 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |
| **C-33** | Evidence Floor check | FM-10 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |
| **C-34** | Reject Hybrid-Only search | FM-10 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |
| **C-35** | Gaps Checklist section | FM-11 | Phase 6 | `prompts/rag/answer_contracts/` |
| **C-36** | Missing-evidence search | FM-11 | Phase 7 | `tools/rag/retriever.py` |
| **C-37** | Fraction Compliant metrics | FM-11 | Phase 7 | `tools/rag/claim_checker.py` |
| **C-38** | Agent Query Exclusions | FM-12 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |
| **C-39** | Lane Permission filters | FM-12 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |
| **C-40** | Agent lane logging | FM-12 | Phase 9 | `tools/rag/retriever.py` (Phase 9) |

---

## 14.5 — Blueprint Closing Procedure

To formally close the RAG Blueprint artifact:
1. **Commit Blueprint**: Save and commit the 15 chunk files (Chunks 0 to 14) under the target path: `docs/rag/blueprint/`.
2. **Register Blueprint**: Add a new entry to the source registry:
   ```json
   {
     "source_id": "AOS-SRC-DOC-003",
     "title": "AOS RAG System Architecture Blueprint",
     "source_type": "documentation",
     "path": "docs/rag/blueprint/",
     "authority_tier": 2,
     "evidence_class": null,
     "lifecycle_status": "active",
     "closure_status": "closed",
     "visibility": "internal",
     "index_policy": "always",
     "staleness_category": "slow_decay",
     "staleness_risk": "low",
     "claim_support": {
       "resume_claim": false,
       "portfolio_claim": false,
       "competency_claim": false,
       "progress_report": false,
       "system_description": true
     },
     "private_risk": "none",
     "last_modified": "2026-06-03",
     "registered_at": "2026-06-03",
     "notes": "System architecture blueprint. Formalized design closed and locked."
   }
   ```
3. **Execute Clean Check**: Run `git status` to verify that no untracked RAG draft fragments are left in root directories.
4. **Transition to Phase 2**: The blueprint is locked. Future changes require documenting an architectural defect.

---

## 14.6 — Final Verification Instructions for the Developer

1. **Verify git working directory**: Run `git status`. Ensure only Phase 0 files are listed.
2. **Run Phase 0 Commit**: Execute:
   ```powershell
   git add learner-state/current_student_state.json status.md artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md
   git commit -m "feat: close AI Writing Assistant portfolio loop (Phase 0 Gate)"
   ```
3. **Create blueprint directory**: Copy this blueprint folder to `docs/rag/blueprint/`.
4. **Initiate Phase 2**: Create `rag/source_registry.schema.json` and start the Python validators.

---

## Chunk Completed

**Chunk 14 — Blueprint Audit and Final Quality Register** is complete.

---

## What This Chunk Covered

1. **Blueprint Closure Rules**: Transitioned the blueprint from active draft to locked, audited system document.
2. **UQ16 Resolved**: Mandated the generation of `quant_options_lesson_1.audit_2026-06-03.md` PASS audit to close loop 3.
3. **Audit Compliance Checklist**: Created 10 verification standards for the developer prior to coding.
4. **Master Decision Register**: Cataloged all 145 structural decisions grouped into 14 functional domains.
5. **Master Control Register**: Mapped all 40 RAG controls to their phases, targets, and implementation scripts.
6. **Closing Procedure**: Formulated git commands, registry additions, and transition steps.

---

## Running Decision Log

*All decisions from Chunks 0–13 (D1–D140) are preserved. New decisions from Chunk 14:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D140 | *(preserved from Chunks 0–13)* | | |
| D141| Quant options lesson 1 must be audited to achieve closure status | Resolves loop 3 inconsistency. No loop may claim closure without a PASS audit. Resolves UQ16. | **Accepted** |
| D142| Final Blueprint document registered as a Tier 2 documentation source | Ensures RAG can retrieve blueprint files for system description queries. | **Accepted** |
| D143| Master decision register organized by functional domain | Improves blueprint scannability for development audits. | **Accepted** |
| D144| Closing a blueprint requires a formal git commit | Anchors design blueprints to git history before implementation code runs. | **Accepted** |
| D145| Changes to closed blueprints require architectural defect files | Preserves design integrity. Enforces loop closure discipline on documentation. | **Accepted** |

---

## Unresolved Questions or Assumptions

**All prior questions (UQ1 through UQ18) have been successfully resolved.** The blueprint contains zero remaining unresolved assumptions.

---

**AOS RAG System Architecture Blueprint is finalized and ready for review.**
