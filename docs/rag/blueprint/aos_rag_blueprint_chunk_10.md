# AOS RAG Blueprint — Chunk 10: Tooling and Repository Structure

---

> **Continuity from Chunks 0–9**: Chunk 0 established system goals. Chunk 1 described the lifecycle. Chunk 2 cataloged failure modes. Chunk 3 mapped authority tiers. Chunk 4 designed the registry. Chunk 5 defined exclusions. Chunk 6 defined the chunk manifest. Chunk 7 specified retrieval ranking. Chunk 8 codified answer contracts. Chunk 9 mapped agent integrations. Chunk 10 now defines the code architecture, scripts, repository structure, and CLI interfaces for RAG.

---

## 10.0 — Tooling Design Philosophy

AOS RAG v0.1 is designed for **local execution** on Windows environments. The system avoids daemon services, persistent servers, or external database runtimes.

Every tool operates as a single-run CLI command that loads necessary state from local JSON files, processes inputs, and outputs citable markdown or log files directly. Speed is preserved by using efficient in-memory list operations and simple dictionary mappings over raw Python lists.

---

## 10.1 — Script-Level Language Preference (Resolves UQ3)

**Decision**: AOS RAG implements a hybrid scripting model:
- **Python (v3.10+)** is the **Core Logic Engine**. All parsing (AST), validation (JSON Schema), mathematical scoring (BM25), and post-processing citation verification are written in Python. Python's rich library ecosystem (`jsonschema`, `math`, `json`, `argparse`) guarantees robust logic execution.
- **PowerShell (Core 7.x or Desktop 5.1)** is the **Universal Orchestrator**. The user interface and automated agent hooks are driven by a single PowerShell runner script (`tools/rag/rag_runner.ps1`). PowerShell handles environment paths, executes Python processes, and links command stdout to agent logs.

---

## 10.2 — File and Repository Structure (Resolves UQ4)

**Decision**: The blueprint itself and all new RAG scripts are placed in dedicated folders under the repository root, ensuring clean separations:

```
analytical-operating-system/
├── docs/
│   └── rag/
│       └── blueprint/                  ← Blueprint docs (resolves UQ4)
│           ├── aos_rag_blueprint_chunk_0.md
│           ├── ...
│           └── aos_rag_blueprint_chunk_14.md
├── governance/
│   └── RAG_CONTROL_REGISTER.md         ← Serialized controls (resolves UQ12)
├── rag/
│   ├── source_registry.schema.json     ← Registry validator schema
│   ├── source_registry.json            ← Active registry seed
│   ├── chunk_manifest.schema.json      ← Chunk validator schema
│   ├── chunk_manifest.json             ← Active chunk manifest (gitignored)
│   └── retrieval_config.json           ← Tunable parameters
└── tools/
    └── rag/
        ├── validate_registry.py        ← Registry validation script
        ├── chunk_builder.py            ← Semantic chunker script
        ├── query_classifier.py         ← Rule-based query classifier
        ├── retriever.py                ← BM25 + Authority scorer
        ├── validate_citations.py       ← Citation integrity post-processor
        └── rag_runner.ps1              ← Unified PowerShell wrapper CLI
```

---

## 10.3 — CLI Design and Parameters

The unified orchestrator `tools/rag/rag_runner.ps1` exposes the following subcommands and parameters:

```powershell
# Unified Runner Syntax:
# ./tools/rag/rag_runner.ps1 -Command <Subcommand> [Parameters]
```

### Subcommands:

#### 1. `validate-registry`
- **Parameters**:
  - `-VerifyClasses` (Switch): Cross-checks stored registry evidence classes against actual filesystem reviews and audits.
- **Python mapping**: Calls `validate_registry.py` with `--verify-classes` switch.

#### 2. `rebuild-manifest`
- **Parameters**: None.
- **Python mapping**: Calls `chunk_builder.py`. Parses all indexable files registered in `source_registry.json` and compiles them into `rag/chunk_manifest.json`.

#### 3. `query`
- **Parameters**:
  - `-Query` (String, Required): The search query.
  - `-AgentId` (String, Optional): Calling agent (enforces access control).
  - `-QueryType` (String, Optional): Explicit override for classification (`CAREER_CLAIM`, `STATUS_STATE`, `CONCEPT_LEARNING`, `OPS_TOOLING`).
  - `-TopK` (Int, Optional): Limits retrieved candidate count.
- **Python mapping**: Calls `retriever.py` passing parsed arguments, returning formatted citable context blocks to stdout.

#### 4. `validate-answer`
- **Parameters**:
  - `-AnswerFile` (String, Required): Path to the markdown file containing the agent's generated answer.
- **Python mapping**: Calls `validate_citations.py` to verify citable chunk hashes and references.

---

## 10.4 — Control Register Serialization (Resolves UQ12)

**Decision**: The 40 architectural controls defined in Chunk 2 are serialized as a tracked Markdown file: `governance/RAG_CONTROL_REGISTER.md`.

This register maintains:
1. **Control ID & Description**: (e.g. C-14: Pre-Indexing Path Filter).
2. **Current Status**: `[PLANNED / IMPLEMENTED / VERIFIED]`.
3. **Execution Script**: Path to the python script executing the validation (e.g. `tools/rag/chunk_builder.py` for path filter validation).
4. **Test Fixture ID**: Target evaluation code verifying the control.

By tracking this file in git, any changes to security boundaries, claim checking levels, or path exclusions must be committed as formal PRs, keeping evidence-governance auditable.

---

## 10.5 — Workflows, Error Handling, and Caching

### Execution Workflows

```
       [Validate Registry] ──► Passes? ──► [Rebuild Manifest] ──► Passes? ──► [Query Retrieval]
               │                                   │                                 │
               ▼ Fail                              ▼ Fail                            ▼ Fail
        Abort Indexing                      Abort Manifest                    Trigger Refusal Block
```

### Log File Paths
All scripts output errors and processing traces to:
- `C:\Users\chefi\.gemini\antigravity\brain\9eda7a62-13e4-4fa3-88fd-240114c9cc86/scratch/rag_logs/run_errors.log` (General execution exceptions)
- `C:\Users\chefi\.gemini\antigravity\brain\9eda7a62-13e4-4fa3-88fd-240114c9cc86/scratch/rag_logs/validation_failures.log` (Registry validation or citation mismatch details)

### Caching Strategy
- **In-Memory Loading**: Since the manifest (`chunk_manifest.json`) is small (estimated ~300-500 chunks for v0.1), the retriever loads the manifest dictionary into RAM in approximately **40ms**. No indexing databases or runtime caches are required.
- **Checksum Verification**: The `chunk_builder.py` script records a SHA-256 hash for every chunk. During validation runs, `validate_citations.py` compares target file hashes to confirm that uncommitted modifications haven't mutated citable text.

---

## 10.6 — What Not to Build in v0.1 Tooling

### Deferred Capabilities:
- **Persistent Daemon Services**: No HTTP APIs or background agents (e.g. FastAPI runners). Command execution is strictly process-based.
- **Dynamic File System Watchers**: No background file watching (`watchdog` scripts) that auto-compile the manifest when a markdown file changes. All index compilation is manually run via `rebuild-manifest`.
- **Database Backends**: No SQLite or vector DB bindings. Static files only.

---

## Chunk Completed

**Chunk 10 — Tooling and Repository Structure** is complete.

---

## What This Chunk Covered

1. **Tooling Design**: Established local-first, process-based terminal execution principles.
2. **Language Allocation (Resolves UQ3)**: Python chosen for core logic, PowerShell for shell-runner orchestration.
3. **Repository Tree**: Documented exact locations for blueprints (resolves UQ4), schemas, scripts, and logs.
4. **Unified Runner CLI**: Configured subcommands and arguments for `rag_runner.ps1`.
5. **Control Register Serialization (Resolves UQ12)**: Committed `governance/RAG_CONTROL_REGISTER.md` to git tracking.
6. **Logging and Cache Invariants**: Configured path limits, caching RAM speeds, and SHA-256 checksum validations.
7. **Scope Reductions**: Excluded API runtimes, watch daemons, and database layers from the v0.1 baseline.

---

## Running Decision Log

*All decisions from Chunks 0–9 (D1–D90) are preserved. New decisions from Chunk 10:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D90 | *(preserved from Chunks 0–9)* | | |
| D101| Python Core Logic Engine + PowerShell Shell-Runner | Combines Python's schema/math processing with PowerShell's native Windows execution. Resolves UQ3. | **Accepted** |
| D102| Blueprint documents reside under `docs/rag/blueprint/` | Keeps project architecture clear. Separates blueprints from code folders. Resolves UQ4. | **Accepted** |
| D103| Control register tracked as markdown file in `governance/` | Ensures all 40 controls are auditable and require PR approval to modify. Resolves UQ12. | **Accepted** |
| D104| CLI orchestration wrapped in `tools/rag/rag_runner.ps1` | Simplifies agent invocation. Provides a single target for PowerShell runners. | **Accepted** |
| D105| `chunk_manifest.json` is gitignored | Generated file containing redundant texts. Prevents repository bloat. | **Accepted** |
| D106| Manifest loaded directly into memory at query time | Eliminates DB configuration overhead. Maximizes run speed for small repos. | **Accepted** |
| D107| Checksum hashes saved for every semantic chunk | Enables validators to detect if uncommitted disk changes invalidate citable links. | **Accepted** |
| D108| Error logs stored in AppData scratch directories | Maintains clean project workspaces and keeps raw exception files separated. | **Accepted** |
| D109| Static manually triggered manifest rebuilding | Ensures developer is conscious of indexing runs, avoiding accidental CPU loops. | **Accepted** |
| D110| Block persistent web-server daemons in v0.1 | Minimizes system resource foot-print and security exposure. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 11 — Evaluation Framework and Test Fixtures**

This chunk will define the testing framework for verifying RAG performance and security, including the exact schema of evaluation datasets (`evaluations/rag/`), test queries for each failure mode (including phantom citation tests - resolving UQ13), evaluation metrics (Relevance Precision, Authority Compliance, Privacy Leakage Rate), and the automated evaluation runner script details.

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 11 — Evaluation Framework and Test Fixtures.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–10.

Preserve and update the running decision log from Chunks 0–10 (D1–D110).

Do not repeat Chunks 0–10 content except for brief continuity references.

Chunk 11 must include:
- evaluation framework design
- schema of evaluation datasets (evaluations/rag/eval_dataset.json)
- test suite queries mapping to the 12 failure modes
- testing rules for phantom citations (resolving UQ13)
- evaluation metrics (Relevance Precision, Authority Compliance, Privacy Leakage Rate)
- design of the eval runner script (eval_runner.py)
- baseline query-answer verification pairs
- what not to include in v0.1 evaluation

Stop after completing Chunk 11 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 12
```
