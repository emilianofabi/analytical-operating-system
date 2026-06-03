# AOS RAG Blueprint — Chunk 12: Implementation Roadmap and Phase Gates

---

> **Continuity from Chunks 0–11**: Chunk 0 established the phased roadmap. Chunk 1 detailed lifecycle stages. Chunk 2 cataloged failure modes. Chunk 3 mapped authority tiers. Chunk 4 designed the registry. Chunk 5 defined folder exclusions. Chunk 6 defined the manifest. Chunk 7 specified ranking. Chunk 8 codified contracts. Chunk 9 mapped agent integrations. Chunk 10 designed the tools. Chunk 11 designed the evaluations. Chunk 12 now details the execution tasks, entry/exit gates, and timeline, resolving UQ1 and UQ6.

---

## 12.0 — Implementation Phase Gates Map (v0.1)

AOS RAG v0.1 is implemented sequentially. A phase is not complete when code is written; it is complete only when it satisfies its **Exit Criteria** and passes its designated **Failure Mode tests** (from Chunk 11).

```
 ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
 │   PHASE 0       │ ───► │   PHASE 1       │ ───► │   PHASE 2       │
 │   Cleanup Gate  │      │   Design Blue   │      │   Registry Sch  │
 └─────────────────┘      └─────────────────┘      └─────────────────┘
                                                            │
 ┌─────────────────┐      ┌─────────────────┐               │
 │   PHASE 5       │ ◄─── │   PHASE 4       │ ◄─────────────┘
 │   Keyword Retr  │      │   Reg Reviewer  │
 └───────┬─────────┘      └─────────────────┘
         │
         ▼
 ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
 │   PHASE 6       │ ───► │   PHASE 7       │ ───► │   PHASE 8       │
 │   Answer Cont   │      │   Claim Checker │      │   Closure Guard │
 └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## 12.1 — Detailed Task Breakdown per Phase

### Phase 0: Cleanup Gate
- **T0.1**: Identify and log all uncommitted and modified files in the workspace.
- **T0.2**: Stage and commit all active work from the AI Writing Assistant case study.
- **T0.3**: Confirm `.gitignore` matches RAG structural exclusions.
- **T0.4**: Run `git status` to verify a clean working tree.

### Phase 1: Design Blueprint (This document)
- **T1.1**: Author and review Chunks 0 through 14 of the RAG Blueprint.
- **T1.2**: Commit the final blueprint folder to `docs/rag/blueprint/`.
- **T1.3**: Resolve all initial questions (UQ1 through UQ18).

### Phase 2: Registry Schema & Validation Code
- **T2.1**: Create `rag/source_registry.schema.json`.
- **T2.2**: Write `tools/rag/validate_registry.py` to run JSON Schema and consistency validations.
- **T2.3**: Expose `validate-registry` subcommand in `tools/rag/rag_runner.ps1`.

### Phase 3: Seed Registry Insertion & Scanner
- **T3.1**: Create `rag/source_registry.json` using the 20 seed entries from Chunk 4.
- **T3.2**: Write `tools/rag/source_scanner.py` to crawl directories and prompt the user to register new files.
- **T3.3**: Validate the seed file against the schema, resolving warnings.

### Phase 4: Registry Reviewer Prompt Integration
- **T4.1**: Create `prompts/rag/registry_reviewer.md`.
- **T4.2**: Configure the reviewer agent to check new registry entries for overclaiming tags.

### Phase 5: Keyword Retrieval Pipeline
- **T5.1**: Create `rag/chunk_manifest.schema.json`.
- **T5.2**: Write `tools/rag/chunk_builder.py` to chunk registered files and output `rag/chunk_manifest.json`.
- **T5.3**: Write `tools/rag/retriever.py` implementing local BM25 scoring and header injections.
- **T5.4**: Integrate retrieval query parameters in the PowerShell runner CLI.

### Phase 6: Answer Context Builder & Contracts
- **T6.1**: Create template contract markdown files in `prompts/rag/answer_contracts/`.
- **T6.2**: Write `tools/rag/validate_answer_format.py` (post-processor checking markdown headers).
- **T6.3**: Write `tools/rag/validate_citations.py` to verify citable chunk IDs.

### Phase 7: Claim Checker & Ranking Multipliers
- **T7.1**: Write `tools/rag/claim_checker.py` to scan for career claims and compare citable evidence classes.
- **T7.2**: Expose claim assessment report outputs (Risk Level, Safer Wording) in the CLI query subcommands.

### Phase 8: Closure Guard Engine
- **T8.1**: Write `tools/rag/closure_guard.py` to check file paths for `closure_status: "closed"`.
- **T8.2**: Block modification suggestions for closed artifacts unless a defect record is generated.

---

## 12.2 — Entry Gates and Exit Criteria

| Phase | Entry Gate | Exit Criteria | Target Mitigations |
|---|---|---|---|
| **Phase 0** | Workspace loaded | `git status` reports clean working tree. | None (hygiene gate) |
| **Phase 1** | Phase 0 complete | Entire blueprint approved and committed. | Architectural alignment |
| **Phase 2** | Phase 1 complete | `validate_registry.py` runs and verifies mock files. | FM-04 (partial) |
| **Phase 3** | Phase 2 complete | `source_registry.json` validated with 0 errors. | FM-01 (partial), FM-04 (structural) |
| **Phase 4** | Phase 3 complete | Registry reviewer prompt committed and tested. | Registry consistency |
| **Phase 5** | Phase 4 complete | Keyword search returns ranked citable outputs. | FM-04 (full), FM-05 (partial), FM-07 (partial) |
| **Phase 6** | Phase 5 complete | Post-processors reject invalid markdown responses. | FM-01 (full), FM-08 (partial), FM-11 (partial) |
| **Phase 7** | Phase 6 complete | Claim checker rejects low-class career claims. | FM-03 (full), FM-05 (full), FM-06, FM-09 (full) |
| **Phase 8** | Phase 7 complete | Closure guard blocks unauthorized modifications. | FM-02 (full) |

---

## 12.3 — Phase 0 Status & Open Gaps (Resolves UQ1 & UQ6)

### UQ1: Phase 0 Completeness Check
**Status**: **INCOMPLETE**. The workspace current working tree contains 5 modified or untracked files representing active state updates:
- `learner-state/current_student_state.json` (modified)
- `artifacts/portfolio/case_studies/ai_writing_assistant_memo_case_study.md` (modified)
- `audits/semantic/ai_writing_assistant_memo_case_study.repair_audit_2026-05-25.md` (untracked)
- `artifacts/generated/state_updates/ai_writing_assistant_memo_portfolio_loop_state_update_2026-05-25.json` (untracked)
- `status.md` (modified)

**Action Required**: Before any RAG validation or schema scripts are written, these files must be staged and committed to git as: `feat: close AI Writing Assistant portfolio loop`.

### UQ6: State of `apps/aos-landing/` Truthfulness Fixes
**Status**: The truthfulness fixes (removing overclaiming words and CLI syntax traces) have been successfully compiled in the portfolio case study. Once the Phase 0 commit is executed, the docs folder will be verified clean, satisfying this gate.

---

## 12.4 — Concrete Calendar Estimation (Developer Weeks)

The total timeline for implementing AOS RAG v0.1 is estimated at **7.0 developer weeks**:

```
W1 (0.5w): Phase 0 Commit Gate & Phase 1 Blueprint finalization
W1-W2 (1.0w): Phase 2 Schemas and validate_registry.py script
W2-W3 (1.0w): Phase 3 source_registry.json Curating and scanner
W3 (0.5w): Phase 4 Registry Reviewer prompt integration
W4-W5 (1.0w): Phase 5 chunk_builder.py, retriever.py logic
W5-W6 (1.0w): Phase 6 markdown validators & validate_citations.py
W6-W7 (1.0w): Phase 7 claim_checker.py tool
W7 (0.5w): Phase 8 closure_guard.py tool & CLI testing
```

---

## 12.5 — Risk Assessment and Contingency Plans

| Risk | Impact | Mitigating Control | Contingency Action |
|---|---|---|---|
| **R1: Token Budget Exhaustion** | High | C-20: Top-K pruning | If context exceeds LLM limit, retriever falls back to metadata-only format. |
| **R2: Dynamic Class Drift** | Medium | C-18: Date checks | Validator warns if a file has uncommitted changes, blocking class upgrades. |
| **R3: BM25 Latency on Windows** | Low | Local file cache | Python reads manifest in memory; if size > 1MB, implement index caching. |

---

## 12.6 — What Not to Do during Implementation

- **Do not write python scripts before completing the Phase 0 commit.**
- **Do not bypass the exit criteria gates** to accelerate search testing.
- **Do not import external vector database frameworks** (ChromaDB, FAISS) during Phase 5. Keep calculations mathematical (BM25) and local.

---

## Chunk Completed

**Chunk 12 — Implementation Roadmap and Phase Gates** is complete.

---

## What This Chunk Covered

1. **Phased Roadmapping**: Detailed sequential execution tasks from Phase 0 to Phase 8.
2. **Task breakdowns**: Outlined concrete coding assignments (builders, validators, wrappers) per phase.
3. **Entry and Exit Gates**: Defined criteria to start and terminate each build phase.
4. **Phase 0 Cleanup Audit (Resolves UQ1 & UQ6)**: Logged active working tree files and mandated a clean git commit.
5. **Timeline Estimates**: Drafted a 7-developer-week calendar plan.
6. **Risk Matrices**: Configured contingencies for token budget overruns and local path latencies.
7. **Implementation Constraints**: Re-enforced rules on DB installations and gate verification orders.

---

## Running Decision Log

*All decisions from Chunks 0–11 (D1–D120) are preserved. New decisions from Chunk 12:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D120 | *(preserved from Chunks 0–11)* | | |
| D121| Programmatic phase gates enforce strict transition orders | Prevents implementation errors from polluting retrieval indexes. | **Accepted** |
| D122| Phase 0 is a hard block; uncommitted files must be committed | Verifies repo stability and ensures RAG indexing starts from a clean baseline. Resolves UQ1. | **Accepted** |
| D123| apps/aos-landing truthfulness checks resolved via Phase 0 commit | Anchors the documentation site code to verified files. Resolves UQ6. | **Accepted** |
| D124| 7-week development schedule maps task allocations | Provides a structured plan for code deliverables and evaluation runs. | **Accepted** |
| D125| Task breakdowns trace directly to controls in Chunk 2 | Assures that every coding task mitigates a designated failure mode. | **Accepted** |
| D126| Top-K pruning limits are dynamic fallback options | Protects prompts against LLM context windows overflow during large runs. | **Accepted** |
| D127| Uncommitted edits freeze evidence class upgrades | Prevents local modifications from overriding audited file records. | **Accepted** |
| D128| Local index optimization deferred unless size > 1MB | Preserves code simplicity during the early stages of implementation. | **Accepted** |
| D129| Direct process execution for Python validation tools | Keeps script execution lightweight and easy to integrate in PowerShell. | **Accepted** |
| D130| Manual PR reviews govern modifications to control register | Prevents accidental modification of security constraints. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 13 — Cross-Repo trade-sim Integration Design**

This chunk will lay out the integration design for indexing the external `trade-sim` repository in Phase 11. It will define which files are eligible for cross-repo indexing, how RAG cross-references evidence across workspaces, the security boundary rules protecting local AOS code, and the design of the memo-builder tool.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 13 — Cross-Repo trade-sim Integration Design.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–12.

Preserve and update the running decision log from Chunks 0–12 (D1–D130).

Do not repeat Chunks 0–12 content except for brief continuity references.

Chunk 13 must include:
- cross-repo indexing scope for trade-sim
- folder tree and indexable files in trade-sim
- security firewalls between AOS and trade-sim
- cross-repo citation conventions
- design of the source-of-truth memo builder tool
- cross-workspace metadata synchronization rules
- how trade-sim evidence supports quantitative career claims
- what not to index in trade-sim (confidential data or settings)

Stop after completing Chunk 13 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 14
```
