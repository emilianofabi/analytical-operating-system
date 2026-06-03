# AOS RAG Blueprint — Chunk 6: Chunking Strategy and Chunk Manifest Schema

---

> **Continuity from Chunks 0–5**: Chunk 0 established the blueprint framework. Chunk 1 described the 6 evidence classes. Chunk 2 cataloged failure modes and controls. Chunk 3 formalized the authority model. Chunk 4 designed the source registry schema. Chunk 5 established the file indexing and exclusion policies, ensuring that only approved files are parsed. Chunk 6 now details how these indexable files are split into citable chunks and stored in the chunk manifest.

---

## 6.0 — The Case for Semantic Chunking

In standard RAG pipelines, files are segmented using a **fixed-size sliding window** (e.g., 500 characters with 100-character overlap). This approach is toxic to evidence governance. It splits tables in half, separates rubric criteria from their scoring descriptions, divorces audit verdicts from the files they evaluate, and generates text segments that lack context.

AOS RAG mandates **Semantic and Structural Chunking**. A chunk is not an arbitrary slice of bytes; it is a logically complete unit of information. For example:
- A single rubric criterion with all its level descriptions.
- A single section of an audit memo.
- A single logical function in an operational script.

By enforcing structural boundaries during parsing, we ensure that every retrieved segment is fully citable and self-contained, completely mitigating **FM-07 (Authority-Blind Retrieval)** and **FM-09 (Semantic Similarity Mistaken for Proof)**.

---

## 6.1 — Chunking Rules per Source Type (15 Profiles)

The 15 source types defined in Chunk 3 require distinct chunking strategies. The table below specifies the parsing behavior for each type:

| # | Source Type | Ingestion Level | Parsing Strategy | Chunk Size Constraints | Overlap Rule |
|---|---|---|---|---|---|
| 1 | `pass_audit` | Full Text | **Full Document**: Audits are short (~300 words). Do not split. Store as a single chunk. | Max 3,000 chars | None |
| 2 | `portfolio_artifact` | Full Text | **Header-Based (H2/H3)**: Split at major markdown headings. Prepend parent heading breadcrumbs. | Min 200, Max 2,500 chars | None |
| 3 | `audited_project` | Full Text | **Header-Based (H2/H3)**: Split at markdown headings. Keep code blocks intact in their respective sections. | Min 200, Max 2,500 chars | None |
| 4 | `rubric` | Full Text | **Criterion-Based**: Parse markdown to isolate each rubric criterion. A chunk must contain the criterion title and its complete rating text. | Min 100, Max 1,500 chars | None |
| 5 | `module_definition` | Full Text | **Section-Based**: Parse into structural sections: Competencies, Prerequisites, Deliverables. | Min 100, Max 2,000 chars | None |
| 6 | `governance` | Full Text | **Rule-Based**: Split by heading or numbered rule block. Do not split rules across chunks. | Min 100, Max 2,000 chars | None |
| 7 | `review` | Full Text | **Section-Based**: Split into Strengths, Weaknesses, Required Revisions, and Final Verdict chunks. | Min 100, Max 2,000 chars | None |
| 8 | `curriculum` | Full Text | **Section-Based**: Split at pathways or module dependencies. | Min 100, Max 2,000 chars | None |
| 9 | `draft_artifact` | Metadata Only | **Header-Only**: Parse only the frontmatter, H1 title, file path, and registry ID. Do not index the body content. | Max 500 chars | None |
| 10 | `template` | Full Text | **Structural Sections**: Parse by template fields. | Min 100, Max 2,500 chars | None |
| 11 | `documentation` | Full Text | **Paragraph-Based**: Slide a window *only* at paragraph boundaries. Do not slice in the middle of sentences. | Min 200, Max 1,500 chars | 100 chars |
| 12 | `status_file` | Full Text | **Section-Based**: Parse by project or module. | Min 100, Max 1,500 chars | None |
| 13 | `handoff` | Full Text | **Full Document**: Index the handoff file as a single block to preserve temporal state. | Max 4,000 chars | None |
| 14 | `prompt` | Metadata Only | **Metadata-Only**: Parse only the prompt title, purpose, and agent destination. Ignore system instructions text. | Max 500 chars | None |
| 15 | `ops_script` | Full Text | **Function-Based**: Parse PowerShell or Python files to extract function blocks. Each function is a chunk. | Min 100, Max 3,000 chars | None |

---

## 6.2 — Heading Context Preservation Rules

To prevent retrieved chunks from losing their semantic positioning (e.g., retrieving a paragraph discussing "validity threats" without knowing it is part of the "AI Writing Memo" analysis), RAG requires **Heading Context Injecting (Control C-10)**.

During markdown parsing, the parser maintains a stack of active headers. For every generated chunk, a header context block is formatted and prepended to the text content before indexing.

### Formatting Convention

```markdown
[SOURCE_ID: AOS-SRC-PROJ-001 | TIER: 1 | CLASS: 5]
[LOCATION: artifacts/projects/ai_writing_assistant_memo.md]
[BREADCRUMBS: AI Writing Assistant > 3. Statistical Analysis Plan > 3.2 Threats to Validity]
---
[Raw chunk text content starts here...]
```

When vectorizing or calculating keyword match, the token weight of the header context block is boosted by **1.5x** relative to the body tokens. This ensures queries matching parent heading keywords retrieve the child nodes correctly.

---

## 6.3 — Multi-File Artifact Handling (Resolves UQ8)

**Scenario**: An AOS project artifact is often distributed. It may consist of:
1. `ai_writing_assistant_memo.md` (Core Markdown Analysis Plan)
2. `dag_simulation.py` (Python script defining variables and DGP simulation)
3. `schema.sql` (Database schemas representing the input variables)

**Decision**: AOS RAG groups multi-file artifacts using a shared `artifact_id` and implements **Inherited Authority Chains**.

```
    ┌─────────────────────────┐
    │  PASS Audit Record      │
    │  (AOS-SRC-AUDIT-001)    │
    └───────────┬─────────────┘
                │
                ▼ validates
    ┌─────────────────────────┐
    │  Core Markdown Memo     │  ◄── [Source ID: AOS-SRC-PROJ-001]
    │  (AOS-PORT-001 / Class 6)│      [Artifact ID: AOS-COMB-001]
    └───────────┬─────────────┘
                ├──────────────────────────────┐
                ▼ references                   ▼ references
    ┌─────────────────────────┐    ┌─────────────────────────┐
    │  Simulation Script      │    │  Database Schema        │
    │  (dag_simulation.py)    │    │  (schema.sql)           │
    │  [Source: AOS-SRC-OPS-2]│    │  [Source: AOS-SRC-OPS-3]│
    └─────────────────────────┘    └─────────────────────────┘
```

### Multi-File Grouping Rules:
1. **Registry Mapping**: In the registry seed, `dag_simulation.py` and `schema.sql` are registered as distinct sources but assigned the same `artifact_id: "AOS-COMB-001"` and listed in the `depends_on` array of the core memo.
2. **Authority Inheritance**: During indexing, chunks derived from the python or sql code inherit the `evidence_class` (CLASS 6) and `authority_tier` (Tier 1) of the audited parent markdown memo, but *only* if the PASS audit explicitly lists them as verified files.
3. **Reference Injection**: The chunk metadata for the code files automatically injects a reference link pointing back to the parent memo: `[PARENT EVIDENCE: AOS-SRC-PROJ-001]`.

---

## 6.4 — Chunk Manifest Schema

### File: `rag/chunk_manifest.schema.json`

The chunk manifest is a generated JSON file (`rag/chunk_manifest.json`) that catalogs all active chunks. It is the target read surface for the retriever.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://aos.local/schemas/chunk_manifest.schema.json",
  "title": "AOS Chunk Manifest",
  "description": "Schema for the generated chunk repository used by the AOS keyword and vector retriever.",
  "type": "object",
  "required": ["manifest_version", "generated_at", "total_chunks", "chunks"],
  "properties": {
    "manifest_version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "generated_at": {
      "type": "string",
      "format": "date-time"
    },
    "total_chunks": {
      "type": "integer"
    },
    "chunks": {
      "type": "array",
      "items": { "$ref": "#/definitions/chunk_entry" }
    }
  },
  "definitions": {
    "chunk_entry": {
      "type": "object",
      "required": [
        "chunk_id",
        "source_id",
        "artifact_id",
        "evidence_class",
        "authority_tier",
        "file_path",
        "heading_breadcrumbs",
        "content",
        "token_count",
        "line_range"
      ],
      "properties": {
        "chunk_id": {
          "type": "string",
          "pattern": "^AOS-CHK-[A-Z]{2,6}-\\d{3,}-\\d{3}$"
        },
        "source_id": {
          "type": "string",
          "pattern": "^AOS-SRC-[A-Z]{2,6}-\\d{3,}$"
        },
        "artifact_id": {
          "type": ["string", "null"]
        },
        "evidence_class": {
          "type": ["integer", "null"],
          "minimum": 1,
          "maximum": 6
        },
        "authority_tier": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6
        },
        "file_path": {
          "type": "string"
        },
        "heading_breadcrumbs": {
          "type": "array",
          "items": { "type": "string" }
        },
        "content": {
          "type": "string",
          "description": "Formatted text body containing header context block and raw text."
        },
        "token_count": {
          "type": "integer",
          "description": "Estimated Llama/Claude token count of the chunk."
        },
        "line_range": {
          "type": "object",
          "required": ["start", "end"],
          "properties": {
            "start": { "type": "integer", "minimum": 1 },
            "end": { "type": "integer", "minimum": 1 }
          }
        },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        },
        "checksum": {
          "type": "string",
          "description": "SHA-256 hash of the chunk content to detect local modifications."
        }
      }
    }
  }
}
```

---

## 6.5 — Chunk ID and Formatting Conventions

### Unique Chunk ID Format: `AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}`
- **TYPE**: Maps to the source code types (e.g. `AUDIT`, `PORT`, `RUB`).
- **SOURCE_NUM**: The 3-digit padded number matching the parent `source_id`.
- **CHUNK_NUM**: The 3-digit padded sequence number of the chunk within the document.
- **Example**: `AOS-CHK-AUDIT-001-002` (Second chunk of the AI Writing Memo Repair Audit).

---

## 6.6 — Chunk Constraints and Overlaps

### Sizing Invariants:
1. **Hard Floor**: A semantic chunk must contain at least **100 characters** (excluding the injected header wrapper). Any parsed segment below this threshold is merged with the preceding chunk, preventing fragmented, citation-poor segments.
2. **Hard Ceiling**: A chunk must not exceed **2,500 characters** (approx. 500-600 tokens). If a markdown section exceeds this limit (e.g., a massive statistical explanation), the parser splits it at paragraph boundaries, injecting the same heading context into both segments.
3. **No Overlap for Structured Sources**: Rubrics, audits, rules, and module cards are parsed strictly on semantic delimiters. No token overlap is allowed. Overlapping rubrics creates duplicate criteria flags in semantic retrieval.
4. **Paragraph Overlap for Documentation**: Standard documentation files (README, system manuals) allow a **100-character overlap** at paragraph boundaries to ensure terms split at transitions remain searchable in adjacent windows.

---

## 6.7 — What Not to Include in v0.1 Chunking

### Out of Scope:
- **Binary / PDF Parsers**: AOS RAG v0.1 parses markdown (`.md`), plain text (`.txt`, `.base`), and code files (`.py`, `.sql`, `.ps1`). PDF parsing (`.pdf`), spreadsheet ingestion (`.xlsx`), and image extraction are strictly deferred.
- **Dynamic AI Chunking**: No agentic or dynamic semantic splitters (e.g. prompt-based LLM segmentation). The parser relies on deterministic AST (Abstract Syntax Tree) parsing for markdown and regex parsing for scripting functions.
- **Dynamic Chunk Resizing**: v0.1 uses static, compile-time chunk manifests. If a file changes on disk, the manifest must be regenerated using the chunk builder script.

---

## Chunk Completed

**Chunk 6 — Chunking Strategy and Chunk Manifest Schema** is complete.

---

## What This Chunk Covered

1. **Semantic vs. Fixed-Window Ingestion**: Formulated the case against sliding windows in evidence-governed systems.
2. **Chunking Strategies (15 Profiles)**: Established parsing rules, token constraints, and boundaries for all 15 indexable types.
3. **Heading Context Preservation**: Implemented rules (C-10) to prepend breadcrumbs and boost heading weights by 1.5x.
4. **Multi-File Artifact Inheritance (Resolves UQ8)**: Created the `depends_on` authority mapping for multi-file code/markdown artifacts.
5. **Manifest Schema**: Provided the JSON Schema for `rag/chunk_manifest.schema.json`.
6. **Chunk ID Convention**: Designed the double-padded ID system: `AOS-CHK-{TYPE}-{SOURCE_NUM}-{CHUNK_NUM}`.
7. **Sizing Invariants**: Defined the 100-character floor, 2,500-character ceiling, and zero-overlap rules for structural documents.
8. **Scope Exclusion**: Explicitly excluded PDF engines, dynamic AI chunking, and runtime file parsing in v0.1.

---

## Running Decision Log

*All decisions from Chunks 0–5 (D1–D60) are preserved. New decisions from Chunk 6:*

| # | Decision | Rationale | Status |
|---|---|---|---|
| D1–D60 | *(preserved from Chunks 0–5)* | | |
| D61 | Mandatory Structural/Semantic chunking over Fixed-Window | Fixed-window parser breaks structural tables and rubrics, resulting in unusable evidence contexts. | **Accepted** |
| D62 | Prepending Injected Header breadcrumbs to all chunks | Prevents token isolation. Retains system-wide context within deep markdown trees. | **Accepted** |
| D63 | Heading tokens weighted 1.5x in semantic calculations | Improves retrieval precision for topics located inside structured nested subsections. | **Accepted** |
| D64 | Multi-file artifacts inherit core memo's evidence class | Allows SQL schemas and Python simulations to be referenced as CLASS 5/6 evidence under the parent PASS audit. Resolves UQ8. | **Accepted** |
| D65 | Manifest schema catalogs line ranges and file hashes | Enables exact trace logging back to disk source lines and verifies if file contents match registry states. | **Accepted** |
| D66 | Rubrics chunked by discrete criteria boundaries | Prevents adjacent criteria descriptions from polluting specific semantic queries. | **Accepted** |
| D67 | Audits and handoffs ingested as full, undivided documents | Short files lose complete contextual coherence if sliced into sub-chunks. | **Accepted** |
| D68 | Hard floor of 100 characters per chunk | Eliminates noise chunks (e.g. single markdown lines, footer tags). | **Accepted** |
| D69 | Static compile-time chunk manifest generation | Ensures index stability. Reduces retrieval-time file system reading overhead. | **Accepted** |
| D70 | PDF/Excel and dynamic agentic chunking deferred from v0.1 | Reduces dependencies. Maximizes speed and reliability of local text-only parsers. | **Accepted** |

---

## Unresolved Questions or Assumptions

| # | Question / Assumption | Impact | Resolution Target |
|---|---|---|---|
| UQ1 | Is Phase 0 cleanup currently complete? | Blocks all RAG implementation | Before Chunk 12 |
| UQ3 | Python vs PowerShell for primary tooling? | Affects all tools | Chunk 10 |
| UQ4 | Should the blueprint itself be committed to `docs/rag/blueprint/`? | Affects document location | Chunk 10 |
| UQ6 | What is the current state of `apps/aos-landing/` truthfulness fixes? | Part of Phase 0 gate | Chunk 12 |
| UQ12 | Should the control register be a trackable repo file? | Affects governance traceability | Chunk 10 |
| UQ13 | How should FM-08 (phantom citations) be tested? | Affects evaluation framework | Chunk 11 |
| UQ14 | Should authority weights be tunable via config or hardcoded? | Affects retrieval flexibility | Chunk 7 |
| UQ16 | Should the Quant Lesson 1 closure be formalized with an audit record, or documented as an informal closure? | Affects evidence chain completeness | Before Phase 3 seed finalization |

---

## Next Chunk to Request

**Chunk 7 — Retrieval Architecture and Ranking Engine**

This chunk will define the two-stage retrieval pipeline (Metadata Filtering → Keyword Search/BM25 → Authority Weighting), the mathematical ranking algorithm used to combine similarity and authority scores, the query classification model (Career, Status, Concept, Ops), and how authority weights are configured and applied (resolving UQ14).

---

## Copy/Paste Continuation Prompt

```
Continue the AOS RAG Blueprint with Chunk 7 — Retrieval Architecture and Ranking Engine.

Continue the same blueprint started in Chunk 0, continued through Chunks 1–6.

Preserve and update the running decision log from Chunks 0–6 (D1–D70).

Do not repeat Chunks 0–6 content except for brief continuity references.

Chunk 7 must include:
- two-stage retrieval pipeline (filtering then ranking)
- metadata filtering rules
- BM25/keyword search algorithm
- mathematical ranking formula (combining similarity and authority)
- query classification logic (Career, Status, Concept, Ops)
- authority weighting configuration (resolving UQ14)
- rank list pruning constraints (top-K chunks, token budgets)
- handling query-time source staleness penalties
- hybrid score calculation rules
- what not to build in v0.1 retrieval

Stop after completing Chunk 7 and provide all required chunk-ending sections:
- Chunk completed
- What this chunk covered
- Running decision log (updated)
- Unresolved questions or assumptions
- Next chunk to request
- Copy/paste continuation prompt for Chunk 8
```
