# AOS RAG Blueprint — Chunk 5: File Indexing and Exclusion Policy

---

> **Continuity from Chunks 0–4**: Chunk 0 established the RAG thesis (evidence authority layer) and system map. Chunk 1 detailed the AOS lifecycle and 6 evidence classes. Chunk 2 cataloged 12 failure modes and 40 controls. Chunk 3 formalized the source authority tiers and conflict resolution logic. Chunk 4 designed the source registry schema and seed catalog. Chunk 5 now specifies the file indexing and exclusion policies that structurally prevent privacy leaks (FM-04) and enforce the public/private boundaries.

---

## 5.0 — Ingestion Philosophy: Authority over Quantity

The primary security failure in standard RAG architectures is the "ingest-everything" pattern. Naive pipelines recursively scan a repository root, vectorize every text file, and surface the raw content to the agent context.

AOS RAG rejects this pattern. Its ingestion philosophy is governed by three strict principles:

1. **Explicit Ingestion Approval**: A file is only indexable if its path matches an indexable pattern and its metadata is explicitly registered in the source registry (`source_registry.seed.json` or subsequent registry updates). Unregistered files in indexable directories are treated as "unreviewed drafts" (CLASS 2) and are restricted or excluded.
2. **Structural Firewalls**: Privacy and security boundaries must be enforced by the file scanner code itself, not just by agent instructions. Path exclusion must be evaluated *before* any file content is read or vectorized.
3. **Git-Aligned Exclusion**: The repository's `.gitignore` and `.git/info/exclude` configurations represent the ground truth for local-only, secret, or environment-specific files. RAG must respect these boundaries dynamically.

---

## 5.1 — Indexable Directories vs. Excluded Directories

The AOS repository is divided into structural zones. RAG maps each zone to a specific indexing policy:

```
analytical-operating-system/
├── .git/                               ← EXCLUDED (Git internals)
├── .hermes/                            ← EXCLUDED (Hermes runtime state)
├── .obsidian/                          ← EXCLUDED (Obsidian local workspace config)
├── apps/
│   └── aos-landing/                    ← METADATA + CONTENT (Public Docs; generated deps excluded)
├── artifacts/
│   ├── projects/                       ← METADATA + CONTENT (Audited & Draft Projects)
│   ├── lessons/                        ← METADATA + CONTENT (Audited & Draft Lessons)
│   ├── portfolio/                      ← METADATA + CONTENT (Portfolio-ready cases)
│   ├── reviews/                        ← METADATA + CONTENT (Reviews - Tier 2)
│   └── generated/
│       ├── raw_outputs/                ← EXCLUDED (Intermediate LLM outputs)
│       └── scratch/                    ← EXCLUDED (Scratch scripts and logs)
├── audits/
│   ├── semantic/                       ← METADATA + CONTENT (PASS audits - Tier 1)
│   ├── reports/                        ← METADATA + CONTENT (Structural audits - Tier 1)
│   ├── logs/                           ← EXCLUDED (Audit run logs)
│   └── quarantine/                     ← EXCLUDED (Failed/rejected outputs quarantine)
├── chat-logs/                          ← EXCLUDED (Ephemeral chat histories)
├── copy-paste/                         ← EXCLUDED (Scratchpad copy buffers)
├── curriculum/                         ← METADATA + CONTENT (Pathway maps - Tier 2)
├── docs/                               ← METADATA + CONTENT (System manuals & plans)
├── evaluations/                        ← METADATA + CONTENT (RAG eval datasets)
├── governance/                         ← METADATA + CONTENT (System operating rules)
├── handoffs/                           ← METADATA ONLY (Session handoffs - stale prone)
├── learner-state/                      ← EXCLUDED (Private student data)
├── modules/                            ← METADATA + CONTENT (Module definitions)
├── ops/                                ← METADATA + CONTENT (Current scripts only)
├── prompts/                            ← METADATA ONLY (Agent prompts - Tier 5)
├── rubrics/                            ← METADATA + CONTENT (Evaluation rubrics)
├── skills/                             ← METADATA + CONTENT (Skill definitions)
└── templates/                          ← METADATA + CONTENT (Artifact templates)
```

### Directory Classification Matrix

| Directory | Classification | RAG Source Type | Authority Tier | Indexing Policy | Rationale |
|---|---|---|---|---|---|
| `artifacts/portfolio/` | Indexable | `portfolio_artifact` | Tier 1 | Content + Metadata | Core evidence of completed, audited learning loops. |
| `audits/semantic/` | Indexable | `pass_audit` | Tier 1 | Content + Metadata | Verification records that anchor competency claims. |
| `audits/reports/` | Indexable | `pass_audit` | Tier 1 | Content + Metadata | Structural verification reports (PASS/REVISE verdicts). |
| `governance/` | Indexable | `governance` | Tier 2 | Content + Metadata | System laws, lane descriptions, status rules. |
| `rubrics/` | Indexable | `rubric` | Tier 2 | Content + Metadata | Evaluation rubrics used to score learning artifacts. |
| `modules/` | Indexable | `module_definition` | Tier 2 | Content + Metadata | Course catalog, competencies, and module mapping. |
| `curriculum/` | Indexable | `curriculum` | Tier 2 | Content + Metadata | Learning pathways and module prerequisites. |
| `artifacts/projects/` | Conditionally Indexable | `audited_project` / `draft_artifact` | Tier 1 (Audited) / Tier 3 (Draft) | Content + Metadata | Audited projects indexed fully. Drafts indexed but restricted. |
| `artifacts/lessons/` | Conditionally Indexable | `draft_artifact` | Tier 3 | Content + Metadata | Lesson files. Labeled as drafts if no audit PASS exists. |
| `artifacts/reviews/` | Indexable | `review` | Tier 2 | Content + Metadata | Evaluative feedback from reviews. Stale-prone. |
| `templates/` | Indexable | `template` | Tier 3 | Content + Metadata | Standard templates for artifacts and memos. |
| `docs/` | Indexable | `documentation` | Tier 3 | Content + Metadata | System documentation and RAG blueprint documents. |
| `skills/` | Indexable | `documentation` | Tier 3 | Content + Metadata | Definitions of specific competency units. |
| `apps/aos-landing/` | Indexable | `documentation` | Tier 3 | Content + Metadata | Public documentation files for the static website. Generated dependency/build outputs are excluded. |
| `apps/**/node_modules/` | **EXCLUDED** | N/A | Tier 6 | Never | Third-party dependencies are generated/vendor content, not AOS evidence. |
| `apps/**/dist/` | **EXCLUDED** | N/A | Tier 6 | Never | Build output is derived from source files and should not be indexed as independent evidence. |
| `handoffs/` | Metadata Only | `handoff` | Tier 4 | Metadata Only | High staleness risk. Do not index content to prevent stale pollution. |
| `prompts/` | Metadata Only | `prompt` | Tier 5 | Metadata Only | Prompt files represent design intent. Prevent prompt leakage. |
| `ops/` | Conditionally Indexable | `ops_script` | Tier 3 (Current) / Tier 6 (Legacy) | Content + Metadata | Index current automation scripts; ignore deprecated ones. |
| `learner-state/` | **EXCLUDED** | N/A | Tier 6 | Never | Private student progress, self-reflection, personal data. |
| `chat-logs/` | **EXCLUDED** | N/A | Tier 6 | Never | Ephemeral logs of chat interactions. High noise, no evidence value. |
| `.hermes/` | **EXCLUDED** | N/A | Tier 6 | Never | Internal execution database and run state of the Hermes agent. |
| `.obsidian/` | **EXCLUDED** | N/A | Tier 6 | Never | Local Obsidian editor state, workspace file layouts, cache. |
| `copy-paste/` | **EXCLUDED** | N/A | Tier 6 | Never | Transient text snippets, clipboard caches, and scratchpads. |
| `audits/quarantine/`| **EXCLUDED** | N/A | Tier 6 | Never | Storage directory for failed review/audit files. Not citable. |
| `audits/logs/` | **EXCLUDED** | N/A | Tier 6 | Never | Command logs and parser outputs from evaluations. |
| `artifacts/generated/`| **EXCLUDED** | N/A | Tier 6 | Never | Excludes all `raw_outputs/` and `scratch/` directories. |

---

## 5.2 — Directory Policies

### 5.2.1 — Private Learner-State Policy

**Directory**: `learner-state/`
- **Rule PL-01**: Under no circumstances may RAG read, index, or summarize files located in the `learner-state/` directory.
- **Rule PL-02**: The registry schema explicitly forbids assigning a source ID or registering any file under `learner-state/` (enforced by schema validator rule VR-20).
- **Rule PL-03**: If a query asks about student progress, grades, or personal details, the retriever must bypass `learner-state/` entirely and answer based on the public-safe registry status of completed artifacts.
- **Rationale**: Learner-state files (e.g., `current_student_state.json`, `current_student_state.local.json`) track personal evaluations and state transitions. Excluding them protects the privacy of the learner and prevents LLM agents from hallucinating progress metrics using outdated local caches.

### 5.2.2 — Chat-Log Policy

**Directory**: `chat-logs/`
- **Rule CL-01**: Ephemeral chat transcript files (typically generated per session in markdown or text format) must never enter the RAG search index.
- **Rule CL-02**: Agents are forbidden from citing chat logs as evidence for career claims or competency assessments. A conversation is not an audited artifact.
- **Rationale**: Chat logs are high-noise, contain raw formatting errors, and represent working-memory conversations rather than finalized evidence. Vectorizing chat logs leads to semantic loops where the system retrieves its own previous conversational outputs as proof of knowledge (FM-08).

### 5.2.3 — Local Configuration and Secrets Policy

**Directories**: Root, `secrets/`, and environment files (`.env*`, `*.key`, `*.pem`)
- **Rule LC-01**: RAG must structurally block file ingestion of any file containing API keys, private keys, environment variables, or tool configuration settings.
- **Rule LC-02**: All files ending in `.key`, `.pem`, `.env`, `.env.local`, `.env.development`, or located inside a `secrets/` directory are hard-blocked at the OS file-scanning layer.
- **Rationale**: Prevents accidental leakage of LLM provider API credentials, local database keys, or development endpoints into prompt contexts.

### 5.2.4 — Prompts Policy

**Directory**: `prompts/`
- **Rule PR-01**: Prompts located in `prompts/` (e.g., `prompts/agents/auditor.md`, `prompts/reviews/readme_orientation_revision.prompt.txt`) are Tier 5 resources and are indexed as **Metadata-Only** in v0.1.
- **Rule PR-02**: RAG indexers will parse the file path, title, and target agent for the source registry, but the raw prompt text (system instructions) will not be vectorized or chunked for text search.
- **Rationale**: Agents reading their own system instructions through retrieval causes prompt pollution and execution loop confusion. If an agent needs to know "how it is supposed to review an artifact," it relies on its system prompt context, not a RAG lookup. RAG indexes prompt metadata solely to identify what agent roles exist.

### 5.2.5 — Artifacts Policy

**Directory**: `artifacts/`
- **Rule AR-01**: Artifacts must be indexed selectively.
- **Rule AR-02**: Subdirectories `projects/`, `lessons/`, and `portfolio/` are indexable.
- **Rule AR-03**: Subdirectory `generated/` is **strictly excluded**.
- **Rule AR-04**: When indexing files in `artifacts/projects/` and `artifacts/lessons/`, RAG must cross-reference their file paths with the source registry to verify their evidence class. If an artifact file exists on disk but is not registered, it is assigned a default class of `CLASS 2 (DRAFT)` and penalized in search rankings.
- **Rationale**: This prevents draft or incomplete lesson exercises from overriding committed portfolio-ready case studies.

### 5.2.6 — Audits Policy

**Directory**: `audits/`
- **Rule AU-01**: Only audits with a `PASS` or `PASS_WITH_MINOR_FIXES` verdict in the registry are citable for competency claims.
- **Rule AU-02**: Audits located in `audits/quarantine/` are quarantined failed outputs and must never be indexed or referenced.
- **Rule AU-03**: Log files in `audits/logs/` are ignored.
- **Rationale**: Restricting retrieval to PASS audits ensures that RAG only surfaces validated evidence.

### 5.2.7 — Frontend & Public Docs Policy

**Directory**: `apps/aos-landing/` (and root public files)
- **Rule FP-01**: Public docs are indexable under `source_type: "documentation"`.
- **Rule FP-02**: When answering queries from public channels (or external deployment ports), RAG must enforce a strict `visibility: "public"` filter, stripping all `internal` or `private` classified files from the candidate pool.
- **Rationale**: Ensures public static sites do not leak internal audit comments, review feedback, or uncommitted project structures.

### 5.2.8 — Cross-Repo Policy (trade-sim)

- **Rule CR-01**: In v0.1, the `trade-sim` repository is a hard boundary. RAG must not traverse paths outside the `analytical-operating-system` workspace directory.
- **Rule CR-02**: Any reference to `trade-sim` in queries must return: `"trade-sim evidence is located in an external repository and is excluded from v0.1 indexing. Reference the local AOS registry instead."`
- **Rationale**: Prevents multi-repo scope creep and permission leakage before local-first governance is established.

---

## 5.3 — Public/Private Boundaries and Security

AOS RAG implements security through **Pre-Indexing Path Filtering (Control C-14)**. Rather than indexing the entire folder and applying metadata filters during query execution, the scanner rejects disallowed files before they are read.

```
       File System Scanner (disk traversal)
                      │
                      ▼
             Is path in EXCLUDED?  ───► YES ───► Skip file (No read)
                      │
                      ▼ NO
             Is file in .gitignore? ──► YES ───► Skip file (No read)
                      │
                      ▼ NO
             Is file registered? ────► NO  ───► Index as CLASS 2 (DRAFT)
                      │
                      ▼ YES
             Index according to
             assigned Tier and Class
```

### Secrets Prevention Rules

To safeguard against accidental secrets indexing (e.g., hardcoded API keys in uncommitted scratch files):
1. **Regex Key Scanners**: Before indexing any conditionally allowed text file, a regex scanner sweeps for key structures:
   - OpenAI keys: `sk-[a-zA-Z0-9]{48}`
   - Anthropic keys: `sk-ant-sid01-[a-zA-Z0-9-_]{86}`
   - Generic hex keys: `[a-fA-F0-9]{32,64}` in config structures.
2. **Immediate Alert and Skip**: If a key pattern matches, the RAG indexer raises a high-severity console warning, logs the file path to `C:\Users\chefi\.gemini\antigravity\brain\9eda7a62-13e4-4fa3-88fd-240114c9cc86/scratch/secrets_alert.log`, and drops the file from the index.

---

## 5.4 — Relationship to Git Hygiene and Excludes

RAG's indexer relies on Git status to evaluate file authority and prevent indexing local junk.

### `.gitignore` and `.git/info/exclude` Alignment
- The RAG scanner tool must load and parse `.gitignore` patterns.
- If a file is matched by `.gitignore` or `.git/info/exclude` rules, it is dropped from the indexing queue.
- This ensures that local developer settings, IDE configurations (`.vscode/`, `.idea/`), and python virtualization folders (`.venv/`) are skipped automatically.

### Local-Only and Uncommitted Files
When a registered file is modified locally but not committed:
- It is still indexable for status queries, but RAG must label it: `[UNCOMMITTED CHANGES - local verification required]`.
- Its evidence class cannot be elevated to `CLASS 6 (CLOSED)` until its current state matches a git commit hash. Uncommitted files cannot close loops.

### Root-Level Scratch File Handling (Resolves UQ17)

**Discrepancy**: The root contains a file `2026-05-29.md` and several `.canvas` exploration files (`Untitled.canvas`, `Untitled 1.canvas`, etc.).
- **Rule SH-01**: Root-level markdown files that are not explicitly documented in the source registry (like `2026-05-29.md`) must be treated as `CLASS 1 (SPECULATIVE)` scratch notes.
- **Rule SH-02**: All `.canvas` files are structural board views with high formatting overhead and no structured evidence value. They are excluded from indexing entirely (Tier 6).
- **Rule SH-03**: Root-level scratch markdown files must not be citable for competency or career claims.

---

## 5.5 — Public-Safe Sample Files

To support testing RAG systems externally (or presenting demonstrations to users without exposing internal review feedback):
- A `tools/rag/generate_sanitized_fixture.py` script will be created.
- This tool reads the active `source_registry.seed.json`, copies all files marked `visibility: "public"`, and generates a zip containing only public-safe markdown files.
- Internal comments matching markdown comment wrappers `<!-- internal: ... -->` are stripped from files during sanitization.

---

## 5.6 — Indexing Permissions by Source Class

Access controls dictate which parts of a file are read based on their assigned evidence class:

```
                      Ingestion Permission levels
 ┌──────────────────────────────────────────────────────────────────┐
 │ CLASS 6 (CLOSED)       ──► Full Text Vectorization & Citations   │
 ├──────────────────────────────────────────────────────────────────┤
 │ CLASS 5 (AUDITED-PASS) ──► Full Text Vectorization & Citations   │
 ├──────────────────────────────────────────────────────────────────┤
 │ CLASS 4 (REVIEWED)     ──► Full Text, Citable only for status    │
 ├──────────────────────────────────────────────────────────────────┤
 │ CLASS 3 (REVISED)      ──► Full Text, Citable only for status    │
 ├──────────────────────────────────────────────────────────────────┤
 │ CLASS 2 (DRAFT)        ──► Header/Metadata index only (No text)  │
 ├──────────────────────────────────────────────────────────────────┤
 │ CLASS 1 (SPECULATIVE)  ──► Metadata only (Title + Path + Tier)   │
 └──────────────────────────────────────────────────────────────────┘
```

- **Metadata-Only Indexing**: For CLASS 1 and 2, RAG stores the file path, title, and evidence class. The retriever can verify the file exists and report its status, but the LLM cannot read the body content during semantic retrieval. This completely eliminates the risk of an agent hallucinating skills from raw text inside a draft lesson.

---

## 5.7 — Resolving Unresolved Questions

### UQ11: Privacy Exclusion False-Positive Rate
- **Decision**: AOS RAG adopts a **strict zero-leak policy** over precision. We err on the side of over-exclusion.
- **Rule**: If a directory path matches any substring of an exclusion pattern, the scanner skips it immediately. False-positive exclusion (skipping a file that might have been useful) is acceptable; leaks of private learner-state or keys are catastrophic system failures.

### UQ18: Apps and Landing Page Decomposition
- **Decision**: `apps/aos-landing/` is registered under a single aggregate source ID (`AOS-SRC-DOC-002`) representing the static site source. Its source files are citable for system documentation queries but not for individual career claims. Generated `node_modules/` and `dist/` content is excluded.
- **Rule**: The indexer treats `apps/` files as Tier 3 `documentation` sources. It does not decompose them into multiple component entries in the seed registry, avoiding registry bloat.

---

## Chunk Completed

**Chunk 5 — File Indexing and Exclusion Policy** is complete.

---

## What This Chunk Covered

1. **Ingestion Philosophy**: Transitioned from "ingest-everything" to "ingest-by-authorization", prioritizing authority over volume.
2. **Directory Classification Matrix**: Categorized all 28 project directories into Indexable, Conditionally Indexable, Metadata-Only, and Never Indexable (Excluded) tiers.
3. **Specific Directory Policies**: Codified exact rules for `learner-state/`, `chat-logs/`, config secrets, prompts, artifacts, and audits.
4. **Pre-Indexing Path Filtering**: Designed the pipeline logic (Control C-14) that skips excluded directories before reading content.
5. **Secrets Prevention Regex**: Integrated keys scanning for LLM keys and hex patterns with alert logs.
6. **Git/Exclude Alignment**: Configured RAG to dynamically read `.gitignore` and `.git/info/exclude`.
7. **Root-Level Scratch Resolution (Resolves UQ17)**: Categorized `2026-05-29.md` as CLASS 1 (Speculative) and excluded `.canvas` files.
8. **Sanitization Fixtures**: Outlined the process to bundle public-safe sample files for testing.
9. **Indexing Permissions**: Mapped the 6 Evidence Classes to metadata-only vs. full-text parsing configurations.
10. **Resolved Questions**: Formulated policies for UQ11 (Zero-leak exclusion tolerance) and UQ18 (Single documentation entry for `apps/aos-landing/`).

---

## Running Decision Log

*All decisions from Chunks 0–4 (D1–D50) are preserved. New decisions from Chunk 5:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D50 | *(preserved from Chunks 0–4)* | | |
| D51 | Strict Ingestion Approval over open scanning | Standardizes RAG candidate pool. Prevents unregistered files from inflating retrieval scores. | **Accepted** |
| D52 | Entire `learner-state/` folder is Tier 6 Excluded | Protects learner's private state, reflections, and variables. Bypasses parser completely. | **Accepted** |
| D53 | Chat logs are excluded from semantic vectors | Prevents RAG from retrieving prior conversation snippets as factual evidence. | **Accepted** |
| D54 | Structural Pre-Indexing Path Filtering | Excludes files during directory traversal, not query filtering, eliminating leaky edge cases. | **Accepted** |
| D55 | Prompts are Metadata-Only indexed in v0.1 | Prevents agents from referencing their own instruction sets during retrieval, avoiding loop confusion. | **Accepted** |
| D56 | Dynamic `.gitignore` parsing in RAG scanner | Aligns local developer hygiene with RAG indexing boundaries automatically. | **Accepted** |
| D57 | Root `.canvas` files are Tier 6 Excluded | High formatting noise, no structured evidence value. | **Accepted** |
| D58 | Unregistered root markdown notes are CLASS 1 | Prevents accidental indexing of random workspace files as formal learning evidence. | **Accepted** |
| D59 | CLASS 1 & 2 sources restricted to Metadata-Only indexing | Indexer stores path and title but skips content vectorization. Prevents drafting text from supporting claims. | **Accepted** |
| D60 | Zero-leak policy for privacy exclusions | Errs on the side of over-exclusion rather than risk key or student data exposure. Resolves UQ11. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ8 | How should RAG handle multi-file artifacts? | Affects chunking | Chunk 6 |
| UQ12 | Should the control register be a trackable repo file? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ14 | Should authority weights be tunable via config or hardcoded? | Affects retrieval flexibility | Chunk 7 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 6 — Chunking Strategy and Chunk Manifest Schema**

This chunk will define how indexable sources are parsed, segmented, and stored in the chunk manifest. It will establish chunking rules per source type (criterion-based for rubrics, section-based for artifacts, full-document for audits), the `chunk_manifest.schema.json` format, how heading context and document relationships are preserved, and how multi-file artifacts are handled (resolving UQ8).

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 6 — Chunking Strategy and Chunk Manifest Schema.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–5.

Preserve and update the running decision log from Chunks 0–5 (D1–D60).

Do not repeat Chunks 0–5 content except for brief continuity references.

Chunk 6 must include:
- chunking rules per source type (15 profiles)
- chunk_manifest.schema.json
- heading context preservation rules
- multi-file artifact handling (resolving UQ8)
- document relationship tracking in chunks
- chunk IDs and formatting conventions
- chunk metadata requirements
- parsing strategies for markdown, JSON, and code files
- chunk size constraints (min/max characters/tokens)
- chunk overlap rules
- what not to include in v0.1 chunking

Stop after completing Chunk 6 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 7
```
